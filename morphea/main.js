/* ============================
   MORPHÉA PORTFOLIO — MAIN JS
   ============================ */

/* ---- STARS CANVAS ---- */
(function() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.2,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.005,
        speed: Math.random() * 0.15 + 0.03
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      s.y -= s.speed;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 176, 232, ${s.a * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', function() { resize(); initStars(); });
  resize();
  initStars();
  drawStars();
})();

/* ---- CUSTOM CURSOR ---- */
(function() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
  function followRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(followRing);
  }
  followRing();
  document.querySelectorAll('a, button, .pkg-card, .product-card, .logo-card, .mood-card, .color-swatch-wrap, .pswatch, .filter-btn, .ty-card-front, .ty-card-back').forEach(function(el) {
    el.addEventListener('mouseenter', function() { ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', function() { ring.classList.remove('hovered'); });
  });
})();

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- MOBILE MENU ---- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', function() {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(function(link) {
  link.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
});

/* ---- REVEAL ON SCROLL ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(e.target);
      setTimeout(function() {
        e.target.classList.add('in');
      }, idx * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(function(r) { revealObserver.observe(r); });

/* ---- ORBIT LIPS MODAL (FIXED) ---- */
(function() {
  const shades = [
    { name: 'Violet Nebula',  desc: 'soft cosmic purple',    color: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
    { name: 'Crimson Nova',   desc: 'bold, explosive red',    color: 'linear-gradient(135deg,#ef4444,#b91c1c)' },
    { name: 'Solar Flare',    desc: 'warm radiant gold',      color: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { name: 'Cosmic Rouge',   desc: 'classic universal red',  color: 'linear-gradient(135deg,#dc2626,#991b1b)' },
    { name: 'Stardust Rose',  desc: 'dreamy pink glow',       color: 'linear-gradient(135deg,#ec4899,#db2777)' },
  ];

  /* Inject all styles into <head> so they are never stripped */
  const style = document.createElement('style');
  style.textContent = `
    #orbitLipsModal {
      display: none;
      position: fixed; inset: 0; z-index: 9000;
      align-items: center; justify-content: center;
    }
    #orbitLipsModal.open { display: flex; }
    .olm-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.78);
      backdrop-filter: blur(12px);
    }
    .olm-panel {
      position: relative; z-index: 1;
      background: linear-gradient(145deg, #1e0a42, #0d0518);
      border: 1px solid rgba(168,85,224,0.4);
      border-radius: 20px;
      padding: 40px; max-width: 480px; width: 90%;
      box-shadow: 0 32px 80px rgba(107,40,200,0.55);
      animation: olmIn .35s cubic-bezier(.25,.46,.45,.94) both;
    }
    @keyframes olmIn {
      from { opacity: 0; transform: translateY(28px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .olm-close {
      position: absolute; top: 16px; right: 16px;
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(168,85,224,0.15);
      border: 1px solid rgba(168,85,224,0.3);
      color: rgba(200,176,232,0.8); font-size: 0.85rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s, color .2s;
    }
    .olm-close:hover { background: rgba(196,79,208,0.35); color: #fff; }
    .olm-eyebrow {
      font-family: 'Cinzel', serif; font-size: 0.55rem;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: rgba(196,79,208,0.9); margin-bottom: 10px;
    }
    .olm-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.45rem; font-weight: 300; font-style: italic;
      color: #e0c8f8; line-height: 1.3; margin-bottom: 20px;
    }
    .olm-sub {
      font-family: 'Cinzel', serif; font-size: 0.6rem;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: rgba(200,176,232,0.6); margin-bottom: 16px;
    }
    .olm-shades { display: flex; flex-direction: column; gap: 12px; }
    .olm-shade {
      display: flex; align-items: center; gap: 14px;
      padding: 10px 14px; border-radius: 10px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(168,85,224,0.15);
      transition: background .2s, border-color .2s;
    }
    .olm-shade:hover { background: rgba(168,85,224,0.1); border-color: rgba(168,85,224,0.38); }
    .olm-shade-swatch {
      width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    .olm-shade-info { display: flex; flex-direction: column; gap: 2px; }
    .olm-shade-name { font-family: 'Cinzel', serif; font-size: 0.7rem; letter-spacing: 0.08em; color: #e0c8f8; }
    .olm-shade-desc { font-size: 0.75rem; color: rgba(200,176,232,0.65); }

    /* pkg-card orbit lips */
    .pkg-card.orbit-lips-card { cursor: pointer; }
    .pkg-card.orbit-lips-card .pkg-caption {
      font-style: italic; font-size: 0.72rem;
      color: rgba(196,79,208,0.85); margin-top: 4px;
    }

    /* Cosmic Base Slideshow */
    .cbs-wrap { position: relative; width: 100%; height: 100%; overflow: hidden; }
    .cbs-img {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover; object-position: center;
      opacity: 0; transition: opacity 0.85s ease;
    }
    .cbs-img.active { opacity: 1; }
    .cbs-label {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 10px 12px 8px;
      background: linear-gradient(to top, rgba(13,5,24,0.88), transparent);
      font-family: 'Cinzel', serif; font-size: 0.52rem; letter-spacing: 0.18em;
      text-transform: uppercase; color: rgba(200,176,232,0.85);
      text-align: center; z-index: 2; pointer-events: none;
    }
    .cbs-dots { position: absolute; top: 8px; right: 8px; display: flex; gap: 4px; z-index: 3; }
    .cbs-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: rgba(200,176,232,0.25);
      transition: background .3s, transform .3s;
    }
    .cbs-dot.active { background: rgba(196,79,208,0.9); transform: scale(1.3); }

    /* Shopping Bag Slideshow */
    .pkg-slideshow { position: relative; width: 100%; height: 100%; overflow: hidden; }
    .pkg-slideshow-img {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover; object-position: center;
      opacity: 0; transition: opacity 0.8s ease;
    }
    .pkg-slideshow-img.active { opacity: 1; }

    /* Orbit Liptint slideshow */
    .olt-wrap { position: relative; width: 100%; height: 100%; overflow: hidden; }
    .olt-img {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover; object-position: center;
      opacity: 0; transition: opacity 0.85s ease;
    }
    .olt-img.active { opacity: 1; }
    .olt-dots { position: absolute; top: 8px; right: 8px; display: flex; gap: 4px; z-index: 3; }
    .olt-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: rgba(200,176,232,0.25);
      transition: background .3s, transform .3s;
    }
    .olt-dot.active { background: rgba(196,79,208,0.9); transform: scale(1.3); }
  `;
  document.head.appendChild(style);

  /* Build modal markup */
  const modal = document.createElement('div');
  modal.id = 'orbitLipsModal';
  modal.innerHTML =
    '<div class="olm-backdrop"></div>' +
    '<div class="olm-panel">' +
      '<button class="olm-close" aria-label="Close">\u2715</button>' +
      '<p class="olm-eyebrow">Orbit Lips \u2014 Comet Kiss Tint</p>' +
      '<h2 class="olm-title">Colors that pull attention like gravity.</h2>' +
      '<p class="olm-sub">Shades</p>' +
      '<div class="olm-shades">' +
        shades.map(function(s) {
          return '<div class="olm-shade">' +
            '<div class="olm-shade-swatch" style="background:' + s.color + '"></div>' +
            '<div class="olm-shade-info">' +
              '<span class="olm-shade-name">' + s.name + '</span>' +
              '<span class="olm-shade-desc">' + s.desc + '</span>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  window._openOrbitLipsModal = function() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modal.querySelector('.olm-close').addEventListener('click', closeModal);
  modal.querySelector('.olm-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* ---- COSMIC BASE SLIDESHOW builder ---- */
function buildCosmicBaseCarousel(wrap) {
  var slides = [
    { src: '../assets/Stardust Flush.png',  name: 'Stardust Flush'  },
    { src: '../assets/Nebula Green.jpg',    name: 'Nebula Green'    },
    { src: '../assets/Lunar.png',           name: 'Lunar'           },
    { src: '../assets/Crimson Nova.png',    name: 'Crimson Nova'    },
    { src: '../assets/Cosmic Tide.png',     name: 'Cosmic Tide'     },
    { src: '../assets/Astral Violet.png',   name: 'Astral Violet'   },
  ];
  var cur = 0;

  wrap.innerHTML = '<div class="cbs-wrap"></div>';
  var ss = wrap.querySelector('.cbs-wrap');

  slides.forEach(function(s, i) {
    var img = document.createElement('img');
    img.src = s.src;
    img.alt = s.name;
    img.className = 'cbs-img' + (i === 0 ? ' active' : '');
    img.loading = 'lazy';
    img.onerror = function() {
      if (!this.dataset.tried) {
        this.dataset.tried = '1';
        var alt = this.src.endsWith('.png')
          ? this.src.replace('.png', '.jpg')
          : this.src.replace('.jpg', '.png');
        this.src = alt;
      }
    };
    ss.appendChild(img);
  });

  var label = document.createElement('div');
  label.className = 'cbs-label';
  label.textContent = slides[0].name;
  ss.appendChild(label);

  var dotsEl = document.createElement('div');
  dotsEl.className = 'cbs-dots';
  slides.forEach(function(s, i) {
    var dot = document.createElement('div');
    dot.className = 'cbs-dot' + (i === 0 ? ' active' : '');
    dotsEl.appendChild(dot);
  });
  ss.appendChild(dotsEl);

  function go(idx) {
    var imgs = ss.querySelectorAll('.cbs-img');
    var dots = dotsEl.querySelectorAll('.cbs-dot');
    imgs[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (idx + slides.length) % slides.length;
    imgs[cur].classList.add('active');
    dots[cur].classList.add('active');
    label.textContent = slides[cur].name;
  }

  setInterval(function() { go(cur + 1); }, 2600);
}

/* ---- SHOPPING BAG SLIDESHOW builder ---- */
function buildShoppingBagSlideshow(wrap) {
  var imgs = [
    '../assets/PaperBag2.jpg',
    '../assets/PaperBag1.jpg',
  ];
  wrap.innerHTML = '<div class="pkg-slideshow"></div>';
  var ss = wrap.querySelector('.pkg-slideshow');
  imgs.forEach(function(src, i) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = 'Shopping Bag';
    img.className = 'pkg-slideshow-img' + (i === 0 ? ' active' : '');
    img.loading = 'lazy';
    ss.appendChild(img);
  });
  var cur = 0;
  setInterval(function() {
    var all = ss.querySelectorAll('.pkg-slideshow-img');
    all[cur].classList.remove('active');
    cur = (cur + 1) % all.length;
    all[cur].classList.add('active');
  }, 2600);
}

/* ---- ORBIT LIPTINT SLIDESHOW builder ---- */
function buildOrbitLiptintSlideshow(wrap) {
  var imgs = [
    '../assets/Liptint1.jpg'
  ];
  wrap.innerHTML = '<div class="olt-wrap"></div>';
  var ss = wrap.querySelector('.olt-wrap');
  var cur = 0;

  imgs.forEach(function(src, i) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = 'Orbit Liptint';
    img.className = 'olt-img' + (i === 0 ? ' active' : '');
    img.loading = 'lazy';
    img.onerror = function() { this.style.display = 'none'; };
    ss.appendChild(img);
  });

  var dotsEl = document.createElement('div');
  dotsEl.className = 'olt-dots';
  imgs.forEach(function(_, i) {
    var dot = document.createElement('div');
    dot.className = 'olt-dot' + (i === 0 ? ' active' : '');
    dotsEl.appendChild(dot);
  });
  ss.appendChild(dotsEl);

  setInterval(function() {
    var allImgs = ss.querySelectorAll('.olt-img');
    var allDots = dotsEl.querySelectorAll('.olt-dot');
    allImgs[cur].classList.remove('active');
    allDots[cur].classList.remove('active');
    cur = (cur + 1) % imgs.length;
    allImgs[cur].classList.add('active');
    allDots[cur].classList.add('active');
  }, 2600);
}

/* ---- PACKAGING DATA & GRID ---- */
var packagingItems = [
  {
    title: 'Shopping Bag Design',
    desc: 'Created a luxury retail shopping bag featuring the brand\'s signature celestial-inspired visuals, transforming product purchases into a memorable unboxing experience.',
    tag: 'Shopping Bag',
    img: null,
    isShoppingBag: true,
    bg: 'linear-gradient(135deg, #1e0a42, #3d1278)',
    icon: '🛍️'
  },
  {
    title: 'Cosmic Base Collection (All Shades)',
    desc: 'A versatile, blendable base designed for creative expression—offering smooth application and buildable coverage for both everyday looks and bold transformations.',
    tag: 'Skincare',
    img: null,
    isCosmicBase: true,
    bg: 'linear-gradient(135deg, #1e0a42, #4a1a8a)',
    icon: '✨'
  },
  {
    title: 'Starfall Effects Collection',
    desc: 'A range of shimmer and glitter products designed to enhance any look with dimension, shine, and eye-catching detail.',
    tag: 'Skincare',
    img: '../assets/Bottles1.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #2a0a58)',
    icon: '🧴'
  },
  {
    title: 'Orbit Lips (Comet Kiss Tint)',
    desc: 'Colors that pull attention like gravity.',
    tag: 'Makeup',
    img: '../assets/LipstickAll.jpg',
    bg: 'linear-gradient(135deg, #2a0a58, #6b28c8)',
    icon: '🪩',
    isOrbitLips: true,
  },
  
  {
    title: 'Morphéa Stencil Collection',
    desc: 'Easy-to-use stencils that help create precise and intricate designs, perfect for both beginners and advanced users.',
    tag: 'Tools',
    img: '../assets/FoxLogo1.jpg',
    bg: 'linear-gradient(135deg, #0a1a3a, #1a3a6a)',
    icon: '🦊'
  },
  {
    title: 'Mini Morph Kit',
    desc: 'A compact set of essential products for quick and convenient makeup application anywhere.',
    tag: 'Collection',
    img: '../assets/Makeups1.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #1e0a42)',
    icon: '🎨'
  },

  {
    title: 'Thank You Card',
    desc: 'Brand collateral card with the calligraphic heart mark and cosmic tagline. Included with every purchase.',
    tag: 'Collateral',
    img: '../assets/Card.jpg',
    bg: 'linear-gradient(135deg, #1a0a2e, #2a0a58)',
    icon: '✦'
  },
  {
    title: 'Gift Card Design',
    desc: 'Designed a premium gift card that extends the Morphéa brand experience through elegant typography, luminous gradients, and a refined luxury aesthetic.',
    tag: 'Collateral',
    img: '../assets/CatalogCard1.jpg',
    bg: 'linear-gradient(135deg, #1e0a42, #3d1278)',
    icon: '📋'
  },
  {
    title: 'Catalog — Open View 2',
    desc: 'Second catalog spread showcasing the packaging lineup and cosmic visual language in editorial layout.',
    tag: 'Collateral',
    img: '../assets/CatalogOpen2.jpg',
    bg: 'linear-gradient(135deg, #1a0a2e, #3d1278)',
    icon: '📖'
  },
  {
    title: 'Bundle Box Packaging',
    desc: 'Developed a rigid two-piece packaging box that combines functionality with sophistication, enhancing product presentation through minimalist branding and premium finishes.',
    tag: 'Packaging',
    img: '../assets/BundleBoxPackaging.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #3d1278)',
    icon: '📦'
  },
  {
    title: 'Packaging Collection',
    desc: 'Created a cohesive luxury packaging collection for Morphéa, unifying gift cards, retail bags, presentation materials, and product boxes through a celestial-inspired visual language centered on beauty, self-discovery, and transformation.',
    tag: 'Shopping Bag',
    img: '../assets/Bags2.jpg',
    bg: 'linear-gradient(135deg, #1e0a42, #3d1278)',
    icon: '🛍️'
  },
];

var packagingGrid = document.getElementById('packagingGrid');
var lightboxIndex = 0;

packagingItems.forEach(function(item, i) {
  var card = document.createElement('div');
  card.className = 'pkg-card reveal' + (item.isOrbitLips ? ' orbit-lips-card' : '');

  var captionHTML = item.isOrbitLips
    ? '<div class="pkg-desc">' + item.desc + '</div><span class="pkg-tag">' + item.tag + '</span><div class="pkg-caption" style="font-style:italic;font-size:0.72rem;color:rgba(196,79,208,0.85);margin-top:6px;">\u2756 Tap to explore shades</div>'
    : '<div class="pkg-desc">' + item.desc + '</div><span class="pkg-tag">' + item.tag + '</span>';

  if (item.isCosmicBase) {
    card.innerHTML =
      '<div class="pkg-img-wrap" style="position:relative;overflow:hidden;">' +
        '<div id="cosmicBaseWrap_' + i + '" style="width:100%;height:100%;"></div>' +
        '<div class="pkg-overlay"><span class="pkg-overlay-text">View Details \u2192</span></div>' +
      '</div>' +
      '<div class="pkg-info"><div class="pkg-title">' + item.title + '</div>' + captionHTML + '</div>';
  } else if (item.isShoppingBag) {
    card.innerHTML =
      '<div class="pkg-img-wrap" style="position:relative;overflow:hidden;">' +
        '<div id="shoppingBagWrap_' + i + '" style="width:100%;height:100%;"></div>' +
        '<div class="pkg-overlay"><span class="pkg-overlay-text">View Details \u2192</span></div>' +
      '</div>' +
      '<div class="pkg-info"><div class="pkg-title">' + item.title + '</div>' + captionHTML + '</div>';
  } else if (item.isOrbitLiptint) {
    card.innerHTML =
      '<div class="pkg-img-wrap" style="position:relative;overflow:hidden;">' +
        '<div id="orbitLiptintWrap_' + i + '" style="width:100%;height:100%;"></div>' +
        '<div class="pkg-overlay"><span class="pkg-overlay-text">View Details \u2192</span></div>' +
      '</div>' +
      '<div class="pkg-info"><div class="pkg-title">' + item.title + '</div>' + captionHTML + '</div>';
  } else if (item.img) {
    card.innerHTML =
      '<div class="pkg-img-wrap">' +
        '<img src="' + item.img + '" alt="' + item.title + '" class="pkg-real-img" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" />' +
        '<div class="pkg-img-placeholder" style="background:' + item.bg + ';display:none"><div class="pkg-icon">' + item.icon + '</div></div>' +
        '<div class="pkg-overlay"><span class="pkg-overlay-text">View Details \u2192</span></div>' +
      '</div>' +
      '<div class="pkg-info"><div class="pkg-title">' + item.title + '</div>' + captionHTML + '</div>';
  } else {
    card.innerHTML =
      '<div class="pkg-img-wrap">' +
        '<div class="pkg-img-placeholder" style="background:' + item.bg + '"><div class="pkg-icon">' + item.icon + '</div></div>' +
        '<div class="pkg-overlay"><span class="pkg-overlay-text">View Details \u2192</span></div>' +
      '</div>' +
      '<div class="pkg-info"><div class="pkg-title">' + item.title + '</div>' + captionHTML + '</div>';
  }

  if (item.isOrbitLips) {
    card.addEventListener('click', function() { window._openOrbitLipsModal(); });
  } else {
    card.addEventListener('click', function() { openLightbox(i); });
  }

  packagingGrid.appendChild(card);

  if (item.isCosmicBase) {
    var w = document.getElementById('cosmicBaseWrap_' + i);
    if (w) buildCosmicBaseCarousel(w);
  }
  if (item.isShoppingBag) {
    var w = document.getElementById('shoppingBagWrap_' + i);
    if (w) buildShoppingBagSlideshow(w);
  }
  if (item.isOrbitLiptint) {
    var w = document.getElementById('orbitLiptintWrap_' + i);
    if (w) buildOrbitLiptintSlideshow(w);
  }
});

document.querySelectorAll('#packagingGrid .reveal').forEach(function(r) { revealObserver.observe(r); });

/* ---- LIGHTBOX ---- */
var lightbox = document.getElementById('lightbox');
var lightboxClose = document.getElementById('lightboxClose');
var lightboxPrev = document.getElementById('lightboxPrev');
var lightboxNext = document.getElementById('lightboxNext');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxTitle = document.getElementById('lightboxTitle');
var lightboxDesc = document.getElementById('lightboxDesc');

function getLightboxImgSrc(item) {
  if (item.isShoppingBag) return '../assets/PaperBag2.jpg';
  if (item.isCosmicBase) return '../assets/MiniBottle2.jpg';
  if (item.isOrbitLiptint) return '../assets/Liptint1.jpg';
  return item.img || null;
}

function openLightbox(idx) {
  lightboxIndex = idx;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function updateLightbox() {
  var item = packagingItems[lightboxIndex];
  var src = getLightboxImgSrc(item);
  if (src) {
    lightboxImg.src = src;
  } else {
    var svg = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#1e0a42"/><text x="300" y="185" text-anchor="middle" font-size="80" fill="white">' + item.icon + '</text><text x="300" y="250" text-anchor="middle" font-family="Georgia" font-size="22" fill="rgba(200,176,232,0.9)">' + item.title + '</text></svg>');
    lightboxImg.src = svg;
  }
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.desc;
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', function() {
  var idx = (lightboxIndex - 1 + packagingItems.length) % packagingItems.length;
  while (packagingItems[idx].isOrbitLips) idx = (idx - 1 + packagingItems.length) % packagingItems.length;
  lightboxIndex = idx;
  updateLightbox();
});
lightboxNext.addEventListener('click', function() {
  var idx = (lightboxIndex + 1) % packagingItems.length;
  while (packagingItems[idx].isOrbitLips) idx = (idx + 1) % packagingItems.length;
  lightboxIndex = idx;
  updateLightbox();
});
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    var idx = (lightboxIndex - 1 + packagingItems.length) % packagingItems.length;
    while (packagingItems[idx].isOrbitLips) idx = (idx - 1 + packagingItems.length) % packagingItems.length;
    lightboxIndex = idx; updateLightbox();
  }
  if (e.key === 'ArrowRight') {
    var idx = (lightboxIndex + 1) % packagingItems.length;
    while (packagingItems[idx].isOrbitLips) idx = (idx + 1) % packagingItems.length;
    lightboxIndex = idx; updateLightbox();
  }
});

/* ---- PRODUCTS DATA & GRID ---- */
var BASE = '../assets/';

var productsData = [
  { name: 'Celestial Skin Collection', line: 'Skincare', cat: 'skincare', desc: 'A skincare line designed to hydrate, nourish, and enhance your natural glow—creating a smooth, radiant base for any look.', img: BASE + 'CelestialSkin.jpg', glow: 'rgba(107, 40, 200, 0.4)' },
  { name: 'Supernova Lip Gloss', line: 'Makeup', cat: 'makeup', desc: 'High-shine lip tint in five cosmic shades: Petal Pink, Stellar Red, Solar Gold, Crimson Nova, Galaxy Fuchsia.', img: BASE + 'Liptint1.jpg', glow: 'rgba(196, 79, 208, 0.4)' },
  { name: 'Nine-Tails Fox Liner', line: 'Makeup', cat: 'makeup', desc: 'Ultra-precise gel eyeliner with fan-shaped stencil guide for perfect cat eyes every time.', img: BASE + 'Fox1.jpg', glow: 'rgba(107, 40, 200, 0.35)' },
  { name: 'Star Dust Body Glitter', line: 'Makeup', cat: 'makeup', desc: 'Vials of body-safe loose glitter — blue, fuchsia, purple, hearts, and pearl — for the full supernova effect.', img: BASE + 'Bottles1.jpg', glow: 'rgba(168, 85, 224, 0.4)' },
  { name: 'Nine-Tails Stencil Set', line: 'Tools', cat: 'tools', desc: 'Fan-shaped guide set with 9 petal templates: Fish Tail, Double Up, Cat Eyeline, Drama, Smoky, and more.', img: BASE + 'FoxLogo1.jpg', glow: 'rgba(61, 18, 120, 0.4)' },
  { name: 'Morphéa Cosmetic Pouch', line: 'Tools', cat: 'tools', desc: 'Crystal-clear holographic makeup pouch with calligraphic zipper pull. Fits the full Morphéa product range.', img: BASE + 'mini morph kit.png', glow: 'rgba(107, 40, 200, 0.3)' },
  { name: 'Complimentary Soap Gift', line: 'Body', cat: 'body', desc: "A handcrafted soap designed as a free gift with every purchase, featuring Morphéa's signature cosmic-inspired aesthetic to enhance the customer experience and strengthen brand engagement.", img: BASE + 'Product Soap 1.jpg', glow: 'rgba(40, 80, 180, 0.4)' },
  { name: 'Galaxy Body Mist', line: 'Body', cat: 'body', desc: 'Light shimmer-infused body spray in the Morphéa signature cosmic accord — neroli, ambrette, and star anise.', img: BASE + 'MiniBottle2.jpg', glow: 'rgba(107, 40, 200, 0.3)' },
];

var productsGrid = document.getElementById('productsGrid');
var filterBtns = document.querySelectorAll('.filter-btn');

function renderProducts(filter) {
  productsGrid.innerHTML = '';
  var filtered = filter === 'all' ? productsData : productsData.filter(function(p) { return p.cat === filter; });
  filtered.forEach(function(p, i) {
    var card = document.createElement('div');
    card.className = 'product-card reveal';
    card.dataset.cat = p.cat;
    var imgContent = p.img
      ? '<img src="' + p.img + '" alt="' + p.name + '" style="width:100%;height:100%;object-fit:cover;object-position:center;" loading="lazy" onerror="this.style.display=\'none\'" />'
      : '<div class="prod-glow" style="background: radial-gradient(circle at center, ' + p.glow + ', transparent 70%);"></div><span class="prod-emoji">' + (p.emoji || '✦') + '</span>';
    card.innerHTML =
      '<div class="prod-img-area" style="background: linear-gradient(135deg, #1e0a42, #0d0518); position:relative; overflow:hidden;">' +
        imgContent +
      '</div>' +
      '<div class="prod-info">' +
        '<div class="prod-name">' + p.name + '</div>' +
        '<div class="prod-line">' + p.line + '</div>' +
        '<div class="prod-desc">' + p.desc + '</div>' +
      '</div>';
    productsGrid.appendChild(card);
    setTimeout(function() { revealObserver.observe(card); }, i * 40);
  });
}

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

renderProducts('all');

/* ---- CONTENT CREATION SECTION ---- */
(function() {
  var contentItems = [
    { src: '../assets/ContentCreation1.jpg', label: 'Poster 01' },
    { src: '../assets/ContentCreation2.jpg', label: 'Poster 02' },
    { src: '../assets/ContentCreation3.jpg', label: 'IG Story 01' },
    { src: '../assets/ContentCreation4.jpg', label: 'IG Story 02' },
    { src: '../assets/ContentCreation5.jpg', label: 'IG Story 03' },
  ];

  var grid = document.getElementById('contentCreationGrid');
  if (!grid) return;

  contentItems.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'cc-card reveal';
    card.innerHTML =
      '<img src="' + item.src + '" alt="' + item.label + '" loading="lazy" ' +
        'onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1e0a42,#3d1278)\';this.style.display=\'none\'" />' +
      '<div class="cc-card-overlay">' +
        '<span class="cc-card-label">' + item.label + ' \u00b7 Click to expand \u2197</span>' +
      '</div>';

    card.addEventListener('click', function() {
      var img = card.querySelector('img');
      if (!img || img.style.display === 'none') return;

      var overlay = document.createElement('div');
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.94);' +
        'display:flex;align-items:center;justify-content:center;cursor:zoom-out;' +
        'animation:ccFadeIn 0.25s ease both;';

      var pic = document.createElement('img');
      pic.src = img.src;
      pic.style.cssText =
        'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:10px;' +
        'box-shadow:0 20px 80px rgba(107,40,200,0.55);';

      var lbl = document.createElement('div');
      lbl.style.cssText =
        'position:absolute;bottom:28px;left:50%;transform:translateX(-50%);' +
        'font-family:Cinzel,serif;font-size:0.6rem;letter-spacing:0.2em;' +
        'text-transform:uppercase;color:rgba(200,176,232,0.7);white-space:nowrap;';
      lbl.textContent = item.label;

      overlay.appendChild(pic);
      overlay.appendChild(lbl);

      overlay.addEventListener('click', function() { overlay.remove(); });
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          overlay.remove();
          document.removeEventListener('keydown', escHandler);
        }
      });

      document.body.appendChild(overlay);
    });

    grid.appendChild(card);
    revealObserver.observe(card);
  });

  /* Inject cc-card styles */
  var style = document.createElement('style');
  style.textContent = `
    @keyframes ccFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .content-creation-section {
      background: linear-gradient(to bottom, var(--void), var(--abyss));
    }
    .content-creation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .cc-card {
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      cursor: zoom-in;
      transition: border-color 0.3s, transform 0.4s;
      background: rgba(30, 10, 66, 0.3);
      aspect-ratio: 4/3;
      position: relative;
    }
    .cc-card:hover {
      border-color: var(--border-bright);
      transform: translateY(-6px);
    }
    .cc-card img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: center;
      display: block;
      transition: transform 0.5s ease;
    }
    .cc-card:hover img { transform: scale(1.05); }
    .cc-card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(13,5,24,0.88) 0%, transparent 55%);
      opacity: 0;
      transition: opacity 0.3s;
      display: flex; align-items: flex-end; padding: 18px;
    }
    .cc-card:hover .cc-card-overlay { opacity: 1; }
    .cc-card-label {
      font-family: var(--ff-label);
      font-size: 0.6rem; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--moonbeam);
    }
  `;
  document.head.appendChild(style);
})();

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');
var sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      navLinks.forEach(function(a) {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--white)' : '';
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(function(s) { sectionObserver.observe(s); });
