/* Toggler Styles Switcher */
// @ts-ignore
const toggler = document.querySelector(".style-switcher-toggler");
toggler.addEventListener("click", () => {
  // @ts-ignore
  const switcher = document.querySelector(".style-switcher");
  switcher.classList.toggle("open");
  // hide style swicher on Timeout
  if (switcher.classList.contains("open")) {
    setTimeout(() => {
      switcher.classList.remove("open");
    }, 3000);
  }
});
/* TThemes colors */
// @ts-ignore
const alternateStyles = document.querySelectorAll(".alternate-style");
// @ts-ignore
function setActiveStyle(color) {
  // @ts-ignore
  alternateStyles.forEach((style) => {
    if (style.getAttribute("title") === color) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}
/* TThemes light or night mode */
// @ts-ignore
const lightMode = document.querySelector(".light-mode");
// @ts-ignore
lightMode.addEventListener("click", () => {
  // @ts-ignore
  lightMode.querySelector("i").classList.toggle("fa-sun");
  lightMode.querySelector("i").classList.toggle("fa-moon");
  // @ts-ignore
  document.body.classList.toggle("dark");
});
window.addEventListener("load", () => {
  // @ts-ignore
  if (document.body.classList.contains("dark")) {
    lightMode.querySelector("i").classList.add("fa-moon");
  } else {
    lightMode.querySelector("i").classList.add("fa-sun");
  }
});
