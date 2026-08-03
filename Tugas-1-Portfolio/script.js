// Toggle light / dark mode
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  themeLabel.textContent = isLight ? "Light Mode" : "Dark Mode";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light");

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  applyTheme(isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Efek mengetik di hero
const roles = ["Web Developer", "Sigma Boy", "Pelajar SMKN 2"];
const typingEl = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

// Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();