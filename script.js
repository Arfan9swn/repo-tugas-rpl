'use strict';

/* =========================================================
   SCRIPT.JS — Portofolio Kelas XI-RPL SMKN 2 Balikpapan
   Dipakai bersama oleh index.html, Rahmad.html, & Reza.html

   Isi:
   1. Tahun otomatis di footer          (<span id="year">)
   2. Tema langit: awan, burung, pesawat yang bergerak
   3. Tombol scroll-to-top              (memakai #scrollTopBtn)
   4. Efek percikan (spark) saat menekan/klik apa saja
   5. Animasi progress bar skill saat mulai terlihat di layar
   6. Efek fade-in kartu saat di-scroll
========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  setYear();
  injectSkyStyles();

  if (!reduceMotion) {
    createSkyLayer();
  }

  setupScrollTopButton();

  if (!reduceMotion) {
    setupClickSpark();
  }

  animateSkillBars();
  revealCardsOnScroll();
});

/* ---------------------------------------------------------
   1. Tahun otomatis di footer
--------------------------------------------------------- */
function setYear() {
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------
   2. Suntik CSS animasi tambahan (langit, percikan, dsb)
      supaya style.css / style2.css tidak perlu diubah
--------------------------------------------------------- */
function injectSkyStyles() {
  if (document.getElementById('sky-theme-styles')) return;

  var css = `
    /* Header jadi "panggung langit": awan/burung/pesawat dikurung di sini saja,
       jadi tidak ikut ke-scroll bersama pengunjung */
    .header{position:relative;overflow:hidden;}
    .header h1,.header h4{position:relative;z-index:2;}

    .sky-layer{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;pointer-events:none;z-index:0;}

    /* Awan: 1 kotak + 2 gelembung bulat (teknik CSS klasik) */
    .cloud{position:absolute;left:-25%;background:#ffffff;border-radius:50px;opacity:.85;
      filter:drop-shadow(0 6px 6px rgba(0,0,0,.12));
      animation-name:driftCloud;animation-timing-function:linear;animation-iteration-count:infinite;}
    .cloud::before,.cloud::after{content:"";position:absolute;background:#ffffff;border-radius:50%;}
    .cloud::before{width:60%;height:100%;top:-45%;left:8%;}
    .cloud::after{width:45%;height:85%;top:-35%;right:8%;}
    @keyframes driftCloud{from{transform:translateX(0);}to{transform:translateX(145vw);}}

    /* Burung: pembungkus mengurus arah terbang, elemen dalam mengurus kepakan sayap */
    .bird-wrap{position:absolute;left:-8%;animation-name:flyBird;animation-timing-function:linear;
      animation-iteration-count:infinite;}
    .bird-flap{display:inline-block;animation:flapWing .5s ease-in-out infinite;}
    @keyframes flyBird{
      0%{transform:translate(0,0);}
      50%{transform:translate(60vw,-14px);}
      100%{transform:translate(130vw,6px);}
    }
    @keyframes flapWing{0%,100%{transform:scaleY(1);}50%{transform:scaleY(.55);}}

    /* Pesawat: menyeberang layar sambil sedikit menanjak */
    .plane{position:absolute;left:-10%;font-size:26px;animation-name:flyPlane;
      animation-timing-function:linear;animation-iteration-count:infinite;}
    @keyframes flyPlane{
      from{transform:translate(0,0) rotate(4deg);}
      to{transform:translate(135vw,-28px) rotate(4deg);}
    }

    /* Efek percikan: cincin melebar */
    .spark-ripple{position:fixed;transform:translate(-50%,-50%);border-radius:50%;
      background:radial-gradient(circle,rgba(255,255,255,.85),rgba(142,203,255,.35) 60%,transparent 70%);
      pointer-events:none;z-index:9998;animation:sparkRipple .6s ease-out forwards;}
    @keyframes sparkRipple{from{width:0;height:0;opacity:.9;}to{width:90px;height:90px;opacity:0;}}

    /* Efek percikan: titik-titik memercik keluar */
    .spark-dot{position:fixed;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;
      background:radial-gradient(circle,#ffffff,#8ecbff);
      box-shadow:0 0 6px 2px rgba(142,203,255,.9);
      pointer-events:none;z-index:9999;animation:sparkFly .55s ease-out forwards;}
    @keyframes sparkFly{
      from{transform:translate(0,0) scale(1);opacity:1;}
      to{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0;}
    }

    /* Kartu muncul perlahan saat discroll ke area layar */
    .card-hidden{opacity:0;transform:translateY(40px);
      transition:opacity .7s ease,transform .7s ease;}
    .card-visible{opacity:1;transform:translateY(0);}

    /* Sedikit terangkat saat kartu disentuh kursor */
    .card{transition:transform .3s ease, box-shadow .3s ease;}
    .card:hover{transform:translateY(-6px);}
  `;

  var style = document.createElement('style');
  style.id = 'sky-theme-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

/* ---------------------------------------------------------
   3. Bangun lapisan langit + isi dengan awan, burung, pesawat
--------------------------------------------------------- */
function createSkyLayer() {
  var sky = document.createElement('div');
  sky.className = 'sky-layer';
  sky.setAttribute('aria-hidden', 'true');

  var clouds = [
    { top: '8%',  width: 110, height: 40, duration: 34, delay: 0 },
    { top: '55%', width: 80,  height: 30, duration: 26, delay: 6 },
    { top: '25%', width: 95,  height: 34, duration: 30, delay: 12 },
    { top: '65%', width: 65,  height: 24, duration: 22, delay: 3 },
    { top: '40%', width: 125, height: 46, duration: 40, delay: 16 }
  ];
  clouds.forEach(function (c) {
    var el = document.createElement('div');
    el.className = 'cloud';
    el.style.top = c.top;
    el.style.width = c.width + 'px';
    el.style.height = c.height + 'px';
    el.style.animationDuration = c.duration + 's';
    el.style.animationDelay = c.delay + 's';
    sky.appendChild(el);
  });

  var birds = [
    { top: '20%', duration: 16, delay: 1,  size: 18 },
    { top: '50%', duration: 22, delay: 9,  size: 15 },
    { top: '35%', duration: 19, delay: 14, size: 16 }
  ];
  birds.forEach(function (b) {
    var wrap = document.createElement('div');
    wrap.className = 'bird-wrap';
    wrap.style.top = b.top;
    wrap.style.animationDuration = b.duration + 's';
    wrap.style.animationDelay = b.delay + 's';

    var flap = document.createElement('span');
    flap.className = 'bird-flap';
    flap.style.fontSize = b.size + 'px';
    flap.textContent = '🐦';
    wrap.appendChild(flap);
    sky.appendChild(wrap);
  });

  var plane = document.createElement('div');
  plane.className = 'plane';
  plane.textContent = '✈️';
  plane.style.top = '30%';
  plane.style.animationDuration = '30s';
  plane.style.animationDelay = '6s';
  sky.appendChild(plane);

  var header = document.querySelector('.header');
  if (!header) return;
  header.insertBefore(sky, header.firstChild);
}

/* ---------------------------------------------------------
   4. Tombol scroll-to-top
      (memakai gaya #scrollTopBtn yang sudah ada di CSS,
      di sini elemennya dibuat & diberi perilaku)
--------------------------------------------------------- */
function setupScrollTopButton() {
  var btn = document.getElementById('scrollTopBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Kembali ke atas');
    btn.textContent = '↑';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   5. Efek percikan saat klik/menekan di mana saja
      (tombol scroll, nav, ikon sosial, dsb)
--------------------------------------------------------- */
function setupClickSpark() {
  document.addEventListener('click', function (e) {
    spawnRipple(e.clientX, e.clientY);
    spawnSparkDots(e.clientX, e.clientY);
  });
}

function spawnRipple(x, y) {
  var ripple = document.createElement('span');
  ripple.className = 'spark-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  ripple.addEventListener('animationend', function () {
    ripple.remove();
  });
}

function spawnSparkDots(x, y) {
  var total = 7;
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('span');
    dot.className = 'spark-dot';
    var angle = (Math.PI * 2 * i) / total + Math.random() * 0.4;
    var distance = 28 + Math.random() * 26;
    var dx = Math.cos(angle) * distance;
    var dy = Math.sin(angle) * distance;
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.setProperty('--dx', dx + 'px');
    dot.style.setProperty('--dy', dy + 'px');
    document.body.appendChild(dot);
    dot.addEventListener('animationend', function () {
      this.remove();
    });
  }
}

/* ---------------------------------------------------------
   6. Animasi progress bar skill saat mulai terlihat
      (memakai transition width yang sudah ada di CSS)
--------------------------------------------------------- */
function animateSkillBars() {
  var bars = document.querySelectorAll('.progress');
  if (!bars.length) return;

  bars.forEach(function (bar) {
    bar.dataset.target = getComputedStyle(bar).width;
    bar.style.width = '0px';
  });

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        requestAnimationFrame(function () {
          bar.style.width = bar.dataset.target;
        });
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(function (bar) {
    observer.observe(bar);
  });
}

/* ---------------------------------------------------------
   7. Kartu muncul perlahan (fade-in) saat di-scroll
--------------------------------------------------------- */
function revealCardsOnScroll() {
  var cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(function (card) {
    card.classList.add('card-hidden');
    observer.observe(card);
  });
}