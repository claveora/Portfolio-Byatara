// ===========================
// Loading Screen
// ===========================
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => (loadingScreen.style.display = "none"), 500);
  }, 500);
});

// ===========================
// Reveal on Scroll
// ===========================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) el.classList.add("visible");
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===========================
// Hamburger Menu
// ===========================
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mainNav.classList.toggle("active");
  document.body.classList.toggle("nav-open");
});

document.querySelectorAll(".main-nav a").forEach(link =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mainNav.classList.remove("active");
    document.body.classList.remove("nav-open");
  })
);

// ===========================
// Scroll To Top
// ===========================
const scrollBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================
// Typing Effect
// ===========================
const typingElement = document.querySelector(".typing-effect");
const typingWords = ["In Progress", "and Designer", "and Programmer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = typingWords[wordIndex];
  const currentText = currentWord.substring(0, charIndex);

  typingElement.textContent = currentText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 70);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      setTimeout(typeEffect, 300);
    }
  }
}
window.addEventListener("load", typeEffect);

// ===========================
// Modal Project
// ===========================
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalClose = document.querySelector(".close-modal");
const modalBtn = document.querySelector(".modal-header .btn-jln");
let currentProjectLink = "#";

document.querySelectorAll(".project-card").forEach(card => {
  // Klik card → buka modal
  card.addEventListener("click", e => {
    if (e.target.classList.contains("btn-jln")) return; // kalau tombol jalankan diklik, jangan buka modal

    modal.style.display = "block";
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;
    modalImg.src = card.dataset.image;
    currentProjectLink = card.dataset.link;
  });

  // Klik tombol "Jalankan" → langsung buka link proyek
  const runBtn = card.querySelector(".btn-jln");
  if (runBtn) {
    runBtn.addEventListener("click", e => {
      e.stopPropagation(); // biar nggak ikut buka modal
      const link = card.dataset.link;
      if (link) window.open(link, "_blank");
    });
  }
});

// Tombol Jalankan dalam modal
modalBtn.addEventListener("click", () => {
  if (currentProjectLink) window.open(currentProjectLink, "_blank");
});

// Tutup modal
modalClose.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// ===========================
// Dark Mode Toggle
// ===========================
const darkToggle = document.getElementById("dark-mode-toggle");
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkToggle.checked = true;
}
darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});

// ===========================
// Navigation Scrollspy
// ===========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

function scrollSpy() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", scrollSpy);
