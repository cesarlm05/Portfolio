var typed = new Typed(".typing", {
  strings: ["", "Group Arch.", "Web www.grouparch.com.ar"],
  typeSpeed: 80,
  backSpeed: 80,
  loop: true,
});

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSections = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", () => {
    navigateTo(a);
    if (window.innerWidth < 1200) {
      asideSectionBtnToggler();
    }
  });
}

const navigateTo = (anchor) => {
  removeBackSection();
  for (let j = 0; j < totalNavList; j++) {
    const link = navList[j].querySelector("a");
    if (link.classList.contains("active")) {
      addBackSection(j);
    }
    link.classList.remove("active");
  }
  anchor.classList.add("active");
  showSection(anchor);
};

const showSection = (anchor) => {
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.remove("active");
  }
  const target = anchor.getAttribute("href").split("#")[1];
  const el = document.querySelector("#" + target);
  if (el) el.classList.add("active");
};

function removeBackSection() {
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSection(num) {
  const back = allSection[num];
  if (back) back.classList.add("back-section");
}

function updateNavActive(hash) {
  for (let i = 0; i < totalNavList; i++) {
    const link = navList[i].querySelector("a");
    link.classList.remove("active");
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    }
  }
}

const loadSectionFromHash = () => {
  const hash = window.location.hash || "#home";
  updateNavActive(hash);
  const target = hash.replace("#", "");
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.remove("active", "back-section");
  }
  const el = document.querySelector("#" + target);
  if (el) {
    el.classList.add("active");
  } else {
    const home = document.querySelector("#home");
    if (home) home.classList.add("active");
    updateNavActive("#home");
  }
};

window.addEventListener("hashchange", loadSectionFromHash);
window.addEventListener("load", loadSectionFromHash);

const hireMe = document.querySelector(".hire-me");
hireMe.addEventListener("click", () => {
  const contactAnchor = document.querySelector('.nav a[href="#contact"]');
  if (contactAnchor) navigateTo(contactAnchor);
});

const btnToggler = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");

btnToggler.addEventListener("click", () => {
  asideSectionBtnToggler();
});

function asideSectionBtnToggler() {
  aside.classList.toggle("open");
  btnToggler.classList.toggle("open");
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.toggle("open");
  }
}
