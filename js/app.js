const cards = document.getElementById("cards"),
  templateCard = document.getElementById("template-card").content,
  cartBadge = document.getElementById("cart-badge"),
  cartPanel = document.getElementById("cart-panel"),
  cartItems = document.getElementById("cart-items"),
  cartTotal = document.getElementById("cart-total"),
  cartCount = document.getElementById("cart-count"),
  fragment = document.createDocumentFragment();

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    renderCart();
  }
});

const fetchData = async () => {
  try {
    cards.innerHTML = '<div class="loading-products"><div class="spinner"></div><p>Cargando productos...</p></div>';
    const res = await fetch("api/api.json");
    if (!res.ok) throw new Error("Error al cargar productos");
    const data = await res.json();
    cards.innerHTML = "";
    printCards(data);
  } catch (error) {
    cards.innerHTML = '<p class="error-msg">No se pudieron cargar los productos. Intentá de nuevo.</p>';
    console.error(error);
  }
};

const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);

const printCards = (data) => {
  data.forEach((product) => {
    const clone = templateCard.cloneNode(true);
    clone.querySelector(".product-title").textContent = product.title;
    clone.querySelector(".product-price").textContent = formatPrice(product.price);
    clone.querySelector(".product-description").textContent = product.description || "";
    const img = clone.querySelector(".card-img-top");
    img.setAttribute("src", product.thumbnailUrl);
    img.setAttribute("alt", product.title);
    clone.querySelector(".btn-buy").dataset.id = product.id;
    clone.querySelector(".btn-buy").dataset.title = product.title;
    clone.querySelector(".btn-buy").dataset.price = product.price;
    clone.querySelector(".btn-buy").dataset.img = product.thumbnailUrl;
    clone.querySelector(".btn-cart").dataset.id = product.id;
    clone.querySelector(".btn-cart").dataset.title = product.title;
    clone.querySelector(".btn-cart").dataset.price = product.price;
    clone.querySelector(".btn-cart").dataset.img = product.thumbnailUrl;
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

cards.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-buy");
  const cartBtn = e.target.closest(".btn-cart");
  if (btn) showBuyModal(btn.dataset);
  if (cartBtn) addToCart(cartBtn.dataset);
});

const showBuyModal = (data) => {
  if (typeof Swal === "undefined") {
    window.open("https://walink.co/4ee048", "_blank", "noopener,noreferrer");
    return;
  }
  Swal.fire({
    title: "ANTES DE COMPRAR",
    html: `
      <div class="swal-content">
        <p>DEBIDO A LAS CONSTANTES VARIACIONES EN NUESTRO STOCK,
        PARA COMPRAR DESDE LA COMODIDAD DE TU CASA TENÉS QUE COMUNICARTE CON NOSOTROS POR WHATSAPP.</p>
        <br>
        <a href="https://walink.co/4ee048" target="_blank" rel="noopener noreferrer" class="swal-wa-btn">
          <img src="assets/img/ico-whatsapp.png" alt="WhatsApp"> +54 11 2252-4460
        </a>
        <br><br>
        <p class="swal-disclaimer">Los precios son contado efectivo, transferencia bancaria y/o débito.
        Pueden variar sin previo aviso. Consultá stock antes de comprar.</p>
      </div>`,
    icon: "info",
    background: "var(--bg-black-100)",
    color: "var(--text-black-900)",
    timer: 25000,
    allowOutsideClick: false,
    allowEscapeKey: true,
    stopKeydownPropagation: false,
    confirmButtonText: "Ir a WhatsApp",
    confirmButtonColor: "#25D366",
    showCancelButton: true,
    cancelButtonText: "Cerrar",
  }).then((result) => {
    if (result.isConfirmed) {
      window.open("https://walink.co/4ee048", "_blank", "noopener,noreferrer");
    }
  });
};

const addToCart = (data) => {
  const { id, title, price, img } = data;
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { id, title, price: Number(price), img, qty: 1 };
  }
  saveCart();
  renderCart();
  openCartPanel();
};

const removeFromCart = (id) => {
  delete cart[id];
  saveCart();
  renderCart();
};

const updateQty = (id, delta) => {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) {
    delete cart[id];
  }
  saveCart();
  renderCart();
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const renderCart = () => {
  const items = Object.values(cart);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? "flex" : "none";
  if (cartCount) cartCount.textContent = totalItems > 0 ? `(${totalItems})` : "";

  if (cartItems) {
    if (items.length === 0) {
      cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
    } else {
      cartItems.innerHTML = items
        .map(
          (item) => `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
              <p class="cart-item-title">${item.title}</p>
              <p class="cart-item-price">${formatPrice(item.price)}</p>
              <div class="cart-item-controls">
                <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                <button class="remove-btn" data-id="${item.id}">🗑</button>
              </div>
            </div>
          </div>`
        )
        .join("");
    }
    if (cartTotal) cartTotal.textContent = formatPrice(totalPrice);
  }
};

const openCartPanel = () => {
  if (cartPanel) cartPanel.classList.add("open");
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("qty-btn")) {
    const { id, delta } = e.target.dataset;
    updateQty(id, parseInt(delta));
  }
  if (e.target.classList.contains("remove-btn")) {
    removeFromCart(e.target.dataset.id);
  }
  if (e.target.id === "cart-overlay" || e.target.id === "close-cart") {
    cartPanel.classList.remove("open");
  }
  if (e.target.id === "cart-wa-btn") {
    const items = Object.values(cart);
    if (items.length === 0) return;
    const msg = encodeURIComponent(
      "Hola! Me interesan los siguientes productos:\n" +
        items.map((i) => `- ${i.title} x${i.qty} (${formatPrice(i.price * i.qty)})`).join("\n") +
        `\n\nTotal: ${formatPrice(items.reduce((s, i) => s + i.price * i.qty, 0))}`
    );
    window.open(`https://wa.me/5491122524460?text=${msg}`, "_blank", "noopener,noreferrer");
  }
});

document.getElementById("cart-icon-btn").addEventListener("click", () => {
  if (cartPanel) cartPanel.classList.toggle("open");
});
