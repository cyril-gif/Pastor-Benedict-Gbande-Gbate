document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) Footer Year
  // =========================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================
  // 2) Mobile Navigation Toggle
  // =========================
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      navLinks.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("open");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close menu when clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    // Close menu when clicking outside nav
    document.addEventListener("click", (e) => {
      const clickedInsideNav = e.target.closest(".nav");
      if (!clickedInsideNav && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // =========================
  // 3) Active Link Highlight (auto)
  // =========================
  // If you already set class="active" in HTML, this won't harm.
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    // Only match real pages (ignore # sections)
    if (href === currentPage) {
      document.querySelectorAll(".nav-links a").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    }
  });

  // =========================
  // 4) Newsletter Demo Submission
  // =========================
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']")?.value?.trim();
      if (!email) {
        alert("Please enter your email.");
        return;
      }
      alert(`Thanks for subscribing: ${email}`);
      form.reset();
    });
  });

  // =========================
  // 5) Contact Form Demo Submission
  // =========================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#name")?.value?.trim();
      const email = contactForm.querySelector("#email")?.value?.trim();
      const subject = contactForm.querySelector("#subject")?.value?.trim();
      const message = contactForm.querySelector("#message")?.value?.trim();

      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      alert("Message sent successfully! (Demo form)");
      contactForm.reset();
    });
  }

  // =========================
  // 6) Prayer Request Form Demo Submission
  // =========================
  const prayerForm = document.getElementById("prayerForm");
  if (prayerForm) {
    prayerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const pname = prayerForm.querySelector("#pname")?.value?.trim();
      const pemail = prayerForm.querySelector("#pemail")?.value?.trim();
      const preq = prayerForm.querySelector("#preq")?.value?.trim();

      if (!pname || !pemail || !preq) {
        alert("Please complete all fields before submitting.");
        return;
      }

      alert("Prayer request submitted successfully! (Demo form)");
      prayerForm.reset();
    });
  }
});
