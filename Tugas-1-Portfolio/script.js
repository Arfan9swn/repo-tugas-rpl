// Tombol menuju bagian About
document.getElementById("btnAbout").addEventListener("click", function () {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  });
});

// Efek muncul saat scroll
const cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", function () {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (position < screen - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Set awal
cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "0.6s";
});