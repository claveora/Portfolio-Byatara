document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LOADING SCREEN ---
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });

    // --- 2. DARK MODE ---
    const themeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- 3. TYPING EFFECT ---
    const typingElement = document.querySelector('.typing-effect');
    const words = ["in Progress", "and Designer", "and Programmer"];
    let wordIndex = 0;
    let charIndex = 0;
    function type() {
        if (charIndex < words[wordIndex].length) {
            typingElement.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        }
    }
    type();

    // --- 4. SMOOTH SCROLL ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 5. SCROLL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // --- 6. PARALLAX HERO ---
    const heroBg = document.querySelector('.hero-bg-parallax');
    window.addEventListener('scroll', () => {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    });

    // --- 7. PROJECT MODAL ---
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            modalImg.src = card.dataset.image;
            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            modal.style.display = 'block';
        });
    });
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // --- 8. CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.querySelector('.form-message');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Semua kolom harus diisi.';
            formMessage.style.color = 'var(--secondary-color)';
        } else {
            formMessage.textContent = 'Pesan terkirim (simulasi).';
            formMessage.style.color = 'var(--primary-color)';
            contactForm.reset();
            setTimeout(() => formMessage.textContent = '', 3000);
        }
    });

    // --- 9. SCROLL TO TOP BUTTON ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
