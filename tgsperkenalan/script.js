// NAVBAR ACTIVE ON CLICK
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// SCROLL ANIMATION
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight - 150) {
            section.classList.add('show');
        }
    });
});

// HERO AUTO SHOW
window.addEventListener('load', () => {
    document.querySelector('.section').classList.add('show');
});