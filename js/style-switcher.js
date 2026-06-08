const toggler = document.querySelector(".style-switcher-toggler");
toggler.addEventListener("click", () => {
  const switcher = document.querySelector(".style-switcher");
  switcher.classList.toggle("open");
  if (switcher.classList.contains("open")) {
    setTimeout(() => {
      switcher.classList.remove("open");
    }, 5000);
  }
});

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (style.getAttribute("title") === color) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
  localStorage.setItem("theme", color);
}

const lightMode = document.querySelector(".light-mode");

lightMode.addEventListener("click", () => {
  const icon = lightMode.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "1" : "0");
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setActiveStyle(savedTheme);
  }

  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "1") {
    document.body.classList.add("dark");
  }

  const icon = lightMode.querySelector("i");
  if (document.body.classList.contains("dark")) {
    icon.classList.add("fa-moon");
  } else {
    icon.classList.add("fa-sun");
  }
});
