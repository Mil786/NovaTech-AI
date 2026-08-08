/* ========================================
   NOVATECH AI
   JAVASCRIPT
======================================== */

/* ========================================
   DOM ELEMENTS
======================================== */

const header = document.querySelector(".header");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-menu a");

const contactForm = document.querySelector("#contact-form");

const formMessage = document.querySelector("#form-message");

const currentYear = document.querySelector("#current-year");

/* ========================================
   MOBILE MENU
======================================== */

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* ========================================
   CLOSE MOBILE MENU
   WHEN CLICKING A LINK
======================================== */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navMenu || !menuToggle) {
      return;
    }

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
======================================== */

document.addEventListener("click", (event) => {
  if (!navMenu || !menuToggle) {
    return;
  }

  const clickedInsideMenu = navMenu.contains(event.target);

  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
  }
});

/* ========================================
   HEADER ON SCROLL
======================================== */

function updateHeader() {
  if (!header) {
    return;
  }

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();

/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements = document.querySelectorAll(
  ".service-card, " +
    ".stat-card, " +
    ".testimonial-card, " +
    ".about-content, " +
    ".about-visual, " +
    ".faq-item, " +
    ".contact-container",
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ========================================
   SMOOTH SCROLL
======================================== */

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* ========================================
   CONTACT FORM
======================================== */

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const name = formData.get("name");

    const email = formData.get("email");

    const message = formData.get("message");

    if (!name || !email || !message) {
      showFormMessage("Preencha todos os campos obrigatórios.", "error");

      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage("Digite um e-mail válido.", "error");

      return;
    }

    showFormMessage(
      `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`,
      "success",
    );

    contactForm.reset();
  });
}

/* ========================================
   FORM MESSAGE
======================================== */

function showFormMessage(message, type) {
  if (!formMessage) {
    return;
  }

  formMessage.textContent = message;

  formMessage.classList.remove("success", "error");

  formMessage.classList.add(type);

  setTimeout(() => {
    formMessage.textContent = "";

    formMessage.classList.remove("success", "error");
  }, 5000);
}

/* ========================================
   EMAIL VALIDATION
======================================== */

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

/* ========================================
   CURRENT YEAR
======================================== */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ========================================
   FAQ
   CLOSE OTHER QUESTIONS
======================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.open) {
        otherItem.open = false;
      }
    });
  });
});

/* ========================================
   CONSOLE MESSAGE
======================================== */

console.log("%cNovaTech AI", "font-size: 24px; font-weight: bold;");

console.log("Landing page carregada com sucesso.");
