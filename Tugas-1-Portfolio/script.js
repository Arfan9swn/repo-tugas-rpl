// Efek interaktif sederhana saat scroll
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling untuk tautan navigasi
    const navLinks = document.querySelectorAll('nav a, .cta-buttons a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Menambahkan bayangan (shadow) pada Header saat di-scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});