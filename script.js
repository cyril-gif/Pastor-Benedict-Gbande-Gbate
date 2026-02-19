document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside navbar
    document.addEventListener("click", (e) => {
      const insideNav = e.target.closest(".navbar");
      if (!insideNav && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }
});
