document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const statusElement = document.getElementById('status');
  const now = new Date();
  const hour = now.getHours();

  if (statusElement) {
    const greeting = hour < 12 ? 'Selamat pagi' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
    statusElement.textContent = `${greeting}, saya siap membuat website impian Anda.`;
  }
});
