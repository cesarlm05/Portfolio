/* typing animation */
// @ts-ignore
var typed = new Typed(".typing", {
  strings: ["", "Web developer.", "Web designer.", "Web enthusiast."],
  typeSpeed: 80,
  backSpeed: 80,
  loop: true,
});
/* Aside */
// @ts-ignore
const nav = document.querySelector(".nav"),
  // @ts-ignore
  navList = nav.querySelectorAll("li"),
  // @ts-ignore
  totalNavList = navList.length,
  // @ts-ignore
  allSection = document.querySelectorAll(".section"),
  // @ts-ignore
  totalSections = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", () => {
    // @ts-ignore
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      let pointer = navList[j].querySelector("a").classList.contains("active");
      if (pointer) {
        addBackSection(j);
        //console.log("back-section"+navList[j].querySelector("a"));
        //allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    //console.log(a);
    a.classList.add("active");
    showSection(a);
    // @ts-ignore
    if (window.innerWidth < 1200) {
      asideSectionBtnToggler();
    }
  });
}
// @ts-ignore
const showSection = (section) => {
  // @ts-ignore
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.remove("active");
  }
  const target = section.getAttribute("href").split("#")[1];
  //console.log(target);
  // @ts-ignore
  document.querySelector("#" + target).classList.add("active");
};
/* Fuciones */
function removeBackSection() {
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.remove("back-section");
  }
}
// @ts-ignore
function addBackSection(num) {
  const back = allSection[num];
  back.classList.add("back-section");
}
// @ts-ignore
function updateNav(section) {
  // @ts-ignore
  //console.log(section.getAttribute("href").split("#")[1]);
  for (let i = 0; i < totalNavList; i++) {
    // @ts-ignore
    navList[i].querySelector("a").classList.remove("active");
    const target = section.getAttribute("href").split("#")[1];
    // @ts-ignore
    const position = navList[i]
      .querySelector("a")
      .getAttribute("href")
      .split("#")[1];
    // @ts-ignore
    if (target === position) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
/* Contact .hire-me Event Click */
// @ts-ignore
const hireMe = document.querySelector(".hire-me");
// @ts-ignore
hireMe.addEventListener("click", () => {
  const sectionIndex = hireMe.getAttribute("data-section-index");
  console.log(sectionIndex);
  // @ts-ignore
  //console.log(hireMe);
  showSection(hireMe);
  updateNav(hireMe);
  removeBackSection();
  addBackSection(sectionIndex);
});
/* Nav Toggler List */
// @ts-ignore
const btnToggler = document.querySelector(".nav-toggler"),
  // @ts-ignore
  aside = document.querySelector(".aside");
// @ts-ignore
btnToggler.addEventListener("click", () => {
  asideSectionBtnToggler();
});
// @ts-ignore
function asideSectionBtnToggler() {
  aside.classList.toggle("open");
  btnToggler.classList.toggle("open");
  for (let i = 0; i < totalSections; i++) {
    allSection[i].classList.toggle("open");
  }
}
