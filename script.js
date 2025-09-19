document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // Loading Screen & Opening Animation
  // ===========================
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      // PENAMBAHAN: Menambahkan class 'loaded' untuk memicu animasi pembuka
      document.body.classList.add('loaded'); 
      setTimeout(() => (loadingScreen.style.display = "none"), 500);
    }, 500);
  }

  // ===========================
  // Responsive Navigation (Hamburger)
  // ===========================
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("main-nav");
  if (hamburger && mainNav) {
    const navLinks = mainNav.querySelectorAll("a");
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.classList.remove("nav-open");
      });
    });
  }

  // ===========================
  // Typing Effect
  // ===========================
  const typingElement = document.querySelector(".typing-effect");
  if (typingElement) {
    const typingWords = ["In Progress", "and a Designer", "and a Programmer"];
    let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;

    function typeEffect() {
      const currentWord = typingWords[wordIndex];
      let displayText = currentWord.substring(0, charIndex);
      typingElement.textContent = displayText;

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 120);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 80);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % typingWords.length;
        }
        setTimeout(typeEffect, isDeleting ? 1200 : 500);
      }
    }
    typeEffect();
  }

  // ===========================
  // Hero Parallax Effect
  // ===========================
  const heroBg = document.querySelector('.hero-bg-parallax');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollValue = window.scrollY;
      heroBg.style.transform = `translateY(${scrollValue * 0.4}px)`;
    });
  }

  // ===========================
  // Project Card 3D Tilt Effect
  // ===========================
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10; // -10 to 10 degrees
      const rotateY = (x / rect.width) * 10;   // -10 to 10 degrees

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ===========================
  // Reveal on Scroll
  // ===========================
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
      function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
          const elementTop = el.getBoundingClientRect().top;
          if (elementTop < windowHeight - 70) {
            el.classList.add("visible");
          }
        });
      }
      window.addEventListener("scroll", revealOnScroll);
      revealOnScroll(); // Initial check
  }

  // ===========================
  // Scroll To Top Button
  // ===========================
  const scrollBtn = document.getElementById("scroll-to-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===========================
  // Project Modal
  // ===========================
  const modal = document.getElementById("project-modal");
  if (modal) {
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalLink = document.getElementById("modal-link");
    const modalClose = document.querySelector(".close-modal");

    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", e => {
        // Cek jika yang diklik adalah tombol di dalam card
        if (e.target.closest(".btn-jln")) {
            const link = card.dataset.link;
            if (link) window.open(link, "_blank");
            return; // Hentikan eksekusi agar modal tidak muncul
        }

        modal.style.display = "block";
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.description;
        modalImg.src = card.dataset.image;
        modalLink.href = card.dataset.link;
        
        document.body.classList.add("modal-open");
      });
    });

    const closeModal = () => {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    };
    
    modalClose.addEventListener("click", closeModal);
    window.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ===========================
  // Dark Mode Toggle
  // ===========================
  const darkToggle = document.getElementById("dark-mode-toggle");
  if (darkToggle) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const setDarkMode = (isDark) => {
      document.body.classList.toggle("dark-mode", isDark);
      darkToggle.checked = isDark;
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    };

    const currentMode = localStorage.getItem("darkMode");
    if (currentMode) {
      setDarkMode(currentMode === "enabled");
    } else {
      setDarkMode(prefersDark.matches);
    }

    darkToggle.addEventListener("change", () => {
      setDarkMode(darkToggle.checked);
    });

    prefersDark.addEventListener("change", (e) => {
      if (!localStorage.getItem("darkMode")) {
        setDarkMode(e.matches);
      }
    });
  }

  // ===========================
  // Navigation Active on Scroll (Scrollspy)
  // ===========================
  const sections = document.querySelectorAll("section[id]");
  if (sections.length > 0 && document.querySelector(".main-nav")) {
      function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 80; // Header height offset
          let sectionId = current.getAttribute("id");
          const link = document.querySelector(".main-nav a[href*=" + sectionId + "]");

          if (link) { 
              if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
          }
        });
      }
      window.addEventListener("scroll", scrollSpy);
      scrollSpy(); // Initial check on load
  }
});
