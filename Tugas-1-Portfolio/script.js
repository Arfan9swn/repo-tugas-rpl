const btnAbout = document.getElementById("btnAbout");

if (btnAbout) {
    btnAbout.addEventListener("click", function () {
        document.getElementById("about").scrollIntoView({
            behavior: "smooth"
        });
    });
}

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

const projectCards = document.querySelectorAll(".project-card");

const showCards = () => {
    projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};

projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.6s ease";
});

window.addEventListener("scroll", showCards);
window.addEventListener("load", showCards);

const profileImg = document.querySelector(".hero-image img");

if (profileImg) {
    profileImg.addEventListener("mouseenter", () => {
        profileImg.style.transform = "scale(1.05)";
        profileImg.style.transition = "0.3s";
    });

    profileImg.addEventListener("mouseleave", () => {
        profileImg.style.transform = "scale(1)";
    });
}