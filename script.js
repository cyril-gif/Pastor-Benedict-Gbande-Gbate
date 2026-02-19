document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile Navigation Toggle =====
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside navbar
    document.addEventListener("click", (event) => {
      const clickedInsideNavbar = event.target.closest(".navbar");
      if (!clickedInsideNavbar && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  // ===== Smooth scrolling for anchor links (#section) =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // ===== Newsletter Form Submission =====
  const subscribeForm = document.querySelector(".subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";

      if (email) {
        alert(`Thank you for subscribing with: ${email}`);
        subscribeForm.reset();
      }
    });
  }

  // ===== Prayer Request Form =====
  const prayerForm = document.getElementById("prayerForm");
  if (prayerForm) {
    prayerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = prayerForm.querySelector("#name")?.value.trim() || "";
      const email = prayerForm.querySelector("#email")?.value.trim() || "";
      const request = prayerForm.querySelector("#request")?.value.trim() || "";
      const privacy = prayerForm.querySelector("#privacy")?.checked || false;

      if (!privacy) {
        alert("Please agree to the privacy policy");
        return;
      }

      // In a real app, send to a server
      console.log("Prayer Request:", { name, email, request, privacy });

      alert("Thank you for your prayer request. We will pray for you!");
      prayerForm.reset();
    });
  }

  // ===== Event Countdown Timer =====
  function updateCountdown() {
    const countdownElement = document.querySelector(".countdown");
    if (!countdownElement) return;

    // Change this date to your real event date
    const eventDate = new Date("2026-12-25T10:00:00").getTime();
    const now = Date.now();
    const timeLeft = eventDate - now;

    if (timeLeft <= 0) {
      countdownElement.textContent = "Event has started!";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="time-unit">
        <span class="number">${days}</span>
        <span class="label">Days</span>
      </div>
      <div class="time-unit">
        <span class="number">${hours}</span>
        <span class="label">Hours</span>
      </div>
      <div class="time-unit">
        <span class="number">${minutes}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="time-unit">
        <span class="number">${seconds}</span>
        <span class="label">Seconds</span>
      </div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== Add active class to current page in navigation =====
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // ===== Image lazy loading =====
  const images = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window && images.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // fallback: load all
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
});

// ===== Form validation for contact forms (optional) =====
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;

  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "red";
      isValid = false;
    } else {
      input.style.borderColor = "";
    }

    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.style.borderColor = "red";
        isValid = false;
      }
    }
  });

  return isValid;
}
