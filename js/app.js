/*!
 * Start Bootstrap - Business Casual v7.0.8 (https://startbootstrap.com/theme/business-casual)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
 */

// NavBar Toggle.

let menuToggle = document.querySelector(".menuToggle");

// César L. Medina

const cards = document.getElementById("cards"),
  items = document.getElementById("items"),
  footer = document.getElementById("footer"),
  templateCard = document.getElementById("template-card").content,
  fragment = document.createDocumentFragment();

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
});

const fetchData = async () => {
  try {
    const res = await fetch("../api/api.json");
    const data = await res.json();
    printCards(data);
  } catch (error) {
    console.log(error);
  }
};

const printCards = (data) => {
  //console.log(data);
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.title;
    templateCard.querySelector("p").textContent = " $ " + product.price;
    templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl);
    templateCard.querySelector(".btn-dark").dataset.id = product.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

// sweetalet

cards.addEventListener("click", (e) => {
  buying(e);
});

const buying = (e) => {
  //console.log(e.target);
  //console.log(e.target.classList.contains("btn-dark"));
  if (e.target.classList.contains("btn-dark")) {
    message();
  }
  e.stopPropagation();
};

function message() {
  Swal.fire({
    title: `ANTES DE COMPRAR`,
    html: `<p>
          <div">
            DEBIDO A LAS CONSTANTES VARIACIONES EN NUESTRO STOCK.
            <br>
            PARA COMPRAR DESDE LA COMODIDAD DE TU CASA TENES QUE COMUNICARTE CON NOSOTROS
            POR WHATSAPP
            <br>
            <img src="../assets/img/ico-whatsapp.png"> <a href="https://walink.co/4ee048" target="_blank"> +54 11 2252-4460</a>
            <br>
            <br>
            AHÍ TE RESPONDEREMOS LO ANTES POSIBLE.
            <br>
            <br>
            Los precios que figuran en página son contado efectivo, transferencia bancaria y/o tarjeta de débito.
            Los precios de página pueden variar sin previo aviso, antes de comprar consulte stock, las fotos son a modo ilustrativo, la descripción de los productos puede variar sin previo aviso.
          </div>
        </p>`,
    icon: `info`,
    background: `#fff`,
    timer: `25000`,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: false,
  });
}
