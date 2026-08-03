// Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Form kontak sederhana (belum terhubung ke server)
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.textContent = "Mohon isi semua kolom dulu ya.";
    status.style.color = "red";
    return;
  }

  status.textContent = "Pesan terkirim! Terima kasih, " + name + ".";
  status.style.color = "green";
  form.reset();
});
