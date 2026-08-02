document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function resetActiveLinks() {
        navLinksLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            resetActiveLinks();
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    function setActiveOnScroll() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                resetActiveLinks();

                const activeLink = document.querySelector('.nav-link[href="#${sectionId}"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(setActiveOnScroll, 50);
    });

    resetActiveLinks();
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});