window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.add('animate-in'));
    
    document.getElementById('welcomePanel').classList.add('animate-in');
    document.getElementById('footerGuide').classList.add('animate-in');
  }, 1300);
});

function openSection(sectionId) {
  document.getElementById('menuLayout').classList.add('shifted');
  
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => sec.classList.remove('show'));
  
  document.getElementById(sectionId).classList.add('show');
  document.getElementById('contentDrawer').classList.add('active');
  
  document.getElementById('selectBtn').style.display = 'none';
  document.getElementById('backBtn').classList.add('show');
}

function closeSection() {
  document.getElementById('menuLayout').classList.remove('shifted');
  document.getElementById('contentDrawer').classList.remove('active');
  
  document.getElementById('selectBtn').style.display = 'flex';
  document.getElementById('backBtn').classList.remove('show');
}


const levelVolume = 30;


function nyalakanSuaraOtomatis() {
  const iframe = document.getElementById('ytBgm');
  
  if (iframe && iframe.contentWindow) {
  
    iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    iframe.contentWindow.postMessage(JSON.stringify({
      event: "command",
      func: "setVolume",
      args: [levelVolume]
    }), '*');
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    

    document.removeEventListener('mousemove', nyalakanSuaraOtomatis);
    document.removeEventListener('touchstart', nyalakanSuaraOtomatis);
    document.removeEventListener('click', nyalakanSuaraOtomatis);
  }
}


document.addEventListener('mousemove', nyalakanSuaraOtomatis); 
document.addEventListener('touchstart', nyalakanSuaraOtomatis);
document.addEventListener('click', nyalakanSuaraOtomatis);      