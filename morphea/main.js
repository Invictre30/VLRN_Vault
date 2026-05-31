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

  window.addEventListener('resize', () => { resize(); initStars(); });
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
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
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
  document.querySelectorAll('a, button, .pkg-card, .product-card, .logo-card, .mood-card, .color-swatch-wrap, .pswatch, .filter-btn, .ty-card-front, .ty-card-back').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- MOBILE MENU ---- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- REVEAL ON SCROLL ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // Stagger siblings
      const siblings = [...e.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => {
        e.target.classList.add('in');
      }, idx * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

/* ---- PACKAGING DATA & GRID ---- */
const packagingItems = [
  {
    title: 'Boutique Shopping Bag',
    desc: 'Large format deep-purple paper bag with dark ribbon handles and embossed ghost logo pattern. Dual background variants: studio white and cosmic starfield.',
    tag: 'Shopping Bag',
    img: '../assets/Bags1.jpg',
    bg: 'linear-gradient(135deg, #2a0a58, #4a1a8a)',
    icon: '🛍️'
  },
  {
    title: 'Shopping Bag — Studio White',
    desc: 'Alternate studio white background version of the boutique shopping bag, showing the deep purple bag against a clean light backdrop.',
    tag: 'Shopping Bag',
    img: '../assets/Bags2.jpg',
    bg: 'linear-gradient(135deg, #1e0a42, #3d1278)',
    icon: '🛍️'
  },
  {
    title: 'Paper Bag — Cosmic',
    desc: 'Glossy paper bag design with starfield backdrop. The Morphéa wordmark in gold foil against the cosmic night palette.',
    tag: 'Shopping Bag',
    img: '../assets/PaperBag1.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #2a0a58)',
    icon: '🛍️'
  },
  {
    title: 'Paper Bag — Purple',
    desc: 'Deep violet paper bag variant with embossed calligraphic heart icon and ribbon handles in matching dark tone.',
    tag: 'Shopping Bag',
    img: '../assets/PaperBag2.jpg',
    bg: 'linear-gradient(135deg, #2a0a58, #6b28c8)',
    icon: '🛍️'
  },
  {
    title: 'Skincare Serum Bottles',
    desc: 'Deep violet glass bottles with matte-finish pump and dropper caps. Calligraphic heart mark rendered in ghost-tone on the glass panel.',
    tag: 'Skincare',
    img: '../assets/Bottles1.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #2a0a58)',
    icon: '🧴'
  },
  {
    title: 'Mini Bottle',
    desc: 'Miniature violet serum dropper bottle. Travel-size packaging maintaining the full brand language at a reduced scale.',
    tag: 'Skincare',
    img: '../assets/MiniBottle2.jpg',
    bg: 'linear-gradient(135deg, #1e0a42, #4a1a8a)',
    icon: '✨'
  },
  {
    title: 'Bundle Box',
    desc: 'A curated gift set of Morphéa signature fragrances, housed in deep-violet glass bottles with metallic atomizer caps and presented in a luxe keepsake box—perfect for gifting or display.',
    tag: 'Fragrance',
    img: '../assets/box wshine.png',
    bg: 'linear-gradient(135deg, #1a0a3a, #3d1278)',
    icon: '🌸'
  },
  {
    title: 'Supernova Lip Gloss — Pink',
    desc: 'Sleek violet tube with clear applicator. The Morphéa wordmark wraps diagonally on the barrel. Petal Pink shade.',
    tag: 'Makeup',
    img: '../assets/PinkLipstick.jpg',
    bg: 'linear-gradient(135deg, #4a1a8a, #7b2fe0)',
    icon: '💋'
  },
  {
    title: 'Supernova Lip Gloss — Green',
    desc: 'Limited edition Aurora Green lip gloss. Cosmic accent shade in the Morphéa lineup with holographic shimmer finish.',
    tag: 'Makeup',
    img: '../assets/GreenLipstick.jpg',
    bg: 'linear-gradient(135deg, #0a2a1a, #1a4a2a)',
    icon: '💋'
  },
  {
    title: 'Full Lip Collection',
    desc: 'The complete Morphéa lip range — glosses, tints, and liners laid out across all five cosmic shades.',
    tag: 'Makeup',
    img: '../assets/LipstickAll.jpg',
    bg: 'linear-gradient(135deg, #2a0a58, #6b28c8)',
    icon: '🪩'
  },
  {
    title: 'Lip Tint',
    desc: 'Sheer buildable lip tint in the Morphéa signature violet-rose formula. Lightweight packaging with embossed heart mark on the cap.',
    tag: 'Makeup',
    img: '../assets/Liptint1.jpg',
    bg: 'linear-gradient(135deg, #5a1a6a, #8a2a90)',
    icon: '💄'
  },
  {
    title: 'Nine-Tails Fox Stencil Set',
    desc: 'Fan-shaped eyeliner and eyeshadow stencil set featuring 9 distinct petal-shaped guides named after eye styles.',
    tag: 'Tools',
    img: '../assets/Fox1.jpg',
    bg: 'linear-gradient(135deg, #1a0a3a, #3d1278)',
    icon: '🦊'
  },
  {
    title: 'Fox Logo Stencil',
    desc: 'Alternate packaging for the Nine-Tails Fox stencil set showing the fox logo branding variant in electric blue.',
    tag: 'Tools',
    img: '../assets/FoxLogo1.jpg',
    bg: 'linear-gradient(135deg, #0a1a3a, #1a3a6a)',
    icon: '🦊'
  },
  {
    title: 'Makeup Collection — Set 1',
    desc: 'Full product family flatlay featuring the Morphéa skincare and makeup range in coordinated cosmic packaging.',
    tag: 'Collection',
    img: '../assets/Makeups1.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #1e0a42)',
    icon: '🎨'
  },
  {
    title: 'Makeup Collection — Set 2',
    desc: 'Second flatlay variant of the full product lineup, arranged for editorial and marketing photography.',
    tag: 'Collection',
    img: '../assets/Makeups2.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #2a0a58)',
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
    title: 'Catalog Card — Front',
    desc: 'Product catalog card front face showing the Morphéa full wordmark and brand palette in cosmic layout.',
    tag: 'Collateral',
    img: '../assets/CatalogCard1.jpg',
    bg: 'linear-gradient(135deg, #1e0a42, #3d1278)',
    icon: '📋'
  },
  {
    title: 'Catalog Card — Back',
    desc: 'Product catalog card reverse side with product listing, brand tagline, and social media handles.',
    tag: 'Collateral',
    img: '../assets/CatalogCard2.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #1e0a42)',
    icon: '📋'
  },
  {
    title: 'Catalog — Open View 1',
    desc: 'Full-spread catalog open view showing the brand story, color system, and product introductions.',
    tag: 'Collateral',
    img: '../assets/CatalogOpen1.jpg',
    bg: 'linear-gradient(135deg, #0d0518, #2a0a58)',
    icon: '📖'
  },
  {
    title: 'Catalog — Open View 2',
    desc: 'Second catalog spread showcasing the packaging lineup and cosmic visual language in editorial layout.',
    tag: 'Collateral',
    img: '../assets/CatalogOpen2.jpg',
    bg: 'linear-gradient(135deg, #1a0a2e, #3d1278)',
    icon: '📖'
  }
];

const packagingGrid = document.getElementById('packagingGrid');
let lightboxIndex = 0;

packagingItems.forEach((item, i) => {
  const card = document.createElement('div');
  card.className = 'pkg-card reveal';
  const imgContent = item.img
    ? `<img src="${item.img}" alt="${item.title}" class="pkg-real-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div class="pkg-img-placeholder" style="background:${item.bg};display:none"><div class="pkg-icon">${item.icon}</div></div>`
    : `<div class="pkg-img-placeholder" style="background:${item.bg}"><div class="pkg-icon">${item.icon}</div></div>`;
  card.innerHTML = `
    <div class="pkg-img-wrap">
      ${imgContent}
      <div class="pkg-overlay">
        <span class="pkg-overlay-text">View Details →</span>
      </div>
    </div>
    <div class="pkg-info">
      <div class="pkg-title">${item.title}</div>
      <div class="pkg-desc">${item.desc}</div>
      <span class="pkg-tag">${item.tag}</span>
    </div>
  `;
  card.addEventListener('click', () => openLightbox(i));
  packagingGrid.appendChild(card);
});

// Re-observe new cards
document.querySelectorAll('#packagingGrid .reveal').forEach(r => revealObserver.observe(r));

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');

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
  const item = packagingItems[lightboxIndex];
  if (item.img) {
    lightboxImg.src = item.img;
  } else {
    const svg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#1e0a42"/><text x="300" y="185" text-anchor="middle" font-size="80" fill="white">${item.icon}</text><text x="300" y="250" text-anchor="middle" font-family="Georgia" font-size="22" fill="rgba(200,176,232,0.9)">${item.title}</text></svg>`)}`;
    lightboxImg.src = svg;
  }
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.desc;
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + packagingItems.length) % packagingItems.length;
  updateLightbox();
});
lightboxNext.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % packagingItems.length;
  updateLightbox();
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + packagingItems.length) % packagingItems.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % packagingItems.length; updateLightbox(); }
});

/* ---- PRODUCTS DATA & GRID ---- */
const BASE = '../assets/';

const productsData = [
  { name: 'Celestial Skin Collection', line: 'Skincare', cat: 'skincare', desc: 'The full Morphéa skincare trinity: Nebula Serum, Starfield Moisturizer, and Lunar Eye Elixir. Deep violet glass and acrylic packaging infused with a cosmic glow complex.', img: BASE + 'CelestialSkin.jpg', glow: 'rgba(107, 40, 200, 0.4)' },
  { name: 'Supernova Lip Gloss', line: 'Makeup', cat: 'makeup', desc: 'High-shine lip tint in five cosmic shades: Petal Pink, Stellar Red, Solar Gold, Crimson Nova, Galaxy Fuchsia.', img: BASE + 'Liptint1.jpg', glow: 'rgba(196, 79, 208, 0.4)' },
  { name: 'Nine-Tails Fox Liner', line: 'Makeup', cat: 'makeup', desc: 'Ultra-precise gel eyeliner with fan-shaped stencil guide for perfect cat eyes every time.', img: BASE + 'Fox1.jpg', glow: 'rgba(107, 40, 200, 0.35)' },
  { name: 'Cosmic Blush Palette', line: 'Makeup', cat: 'makeup', desc: 'A full spectrum lip and eye palette featuring matte, shimmer, and pressed-glitter finishes spanning all cosmic shades.', img: BASE + 'LipstickAll.jpg', glow: 'rgba(196, 79, 208, 0.3)' },
  { name: 'Star Dust Body Glitter', line: 'Makeup', cat: 'makeup', desc: 'Vials of body-safe loose glitter — blue, fuchsia, purple, hearts, and pearl — for the full supernova effect.', img: BASE + 'Bottles1.jpg', glow: 'rgba(168, 85, 224, 0.4)' },
  { name: 'Nine-Tails Stencil Set', line: 'Tools', cat: 'tools', desc: 'Fan-shaped guide set with 9 petal templates: Fish Tail, Double Up, Cat Eyeline, Drama, Smoky, and more.', img: BASE + 'FoxLogo1.jpg', glow: 'rgba(61, 18, 120, 0.4)' },
  { name: 'Morphéa Cosmetic Pouch', line: 'Tools', cat: 'tools', desc: 'Crystal-clear holographic makeup pouch with calligraphic zipper pull. Fits the full Morphéa product range.', img: BASE + 'mini morph kit.png', glow: 'rgba(107, 40, 200, 0.3)' },
  { name: 'Cosmic Tide & Lunar Lavender Soap', line: 'Body', cat: 'body', desc: 'Artisanal soap duo — blue-violet sea salt swirl and pink-mauve lavender swirl — both wrapped in signature cosmic belly bands.', img: BASE + 'Product Soap 1.jpg', glow: 'rgba(40, 80, 180, 0.4)' },
  { name: 'Galaxy Body Mist', line: 'Body', cat: 'body', desc: 'Light shimmer-infused body spray in the Morphéa signature cosmic accord — neroli, ambrette, and star anise.', img: BASE + 'MiniBottle2.jpg', glow: 'rgba(107, 40, 200, 0.3)' },
];

const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProducts(filter) {
  productsGrid.innerHTML = '';
  const filtered = filter === 'all' ? productsData : productsData.filter(p => p.cat === filter);
  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.dataset.cat = p.cat;
    const imgContent = p.img
      ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:center;" loading="lazy" onerror="this.style.display='none'" />`
      : `<div class="prod-glow" style="background: radial-gradient(circle at center, ${p.glow}, transparent 70%);"></div><span class="prod-emoji">${p.emoji || '✦'}</span>`;
    card.innerHTML = `
      <div class="prod-img-area" style="background: linear-gradient(135deg, #1e0a42, #0d0518); position:relative; overflow:hidden;">
        ${imgContent}
      </div>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-line">${p.line}</div>
        <div class="prod-desc">${p.desc}</div>
      </div>
    `;
    productsGrid.appendChild(card);
    // Stagger reveal
    setTimeout(() => {
      revealObserver.observe(card);
    }, i * 40);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

renderProducts('all');

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--white)'
          : '';
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => observer.observe(s));

/* parallax handled inline */