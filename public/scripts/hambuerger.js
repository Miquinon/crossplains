// Select the hamburger button and navigation menu
const hamburgerButton = document.querySelector(".hamburger-button");
const navMenu = document.querySelector(".nav-menu");

// Toggle menu on click
hamburgerButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburgerButton.classList.toggle("active");
});
