/* ══════════════════════════════════════
   VLRN Vault — Photography Page JS
   photo-main.js
══════════════════════════════════════ */

/* ══════════════════════════════════════
   PHOTO DATA — add your photos here!
   src:   relative path e.g. "assets/IMG_9950.png"
   title: display name
   cat:   "portrait" | "nature" | "candid" | "documentary"
   large: true = spans wider column (optional)
   desc:  short caption shown in lightbox
══════════════════════════════════════ */
const photos = [
  { src: '../assets/Portrait img.jpg', title: 'Lantern Garden',       cat: 'portrait',     desc: 'Kimono and candlelight among blooms.' },
  { src: '../assets/IMG_6723 3.jpg',   title: 'Halo-Halo: Layers of a Filipino Identity', cat: 'portrait',     desc: 'A visual exploration of identity through layers, texture, and movement.' },
  { src: '../assets/IMG_9950.jpg',     title: 'Afternoon Companion',  cat: 'candid',       desc: 'A quiet moment with a golden Cat' },
  { src: '../assets/IMG_9928.jpg',     title: 'Midday Pause',         cat: 'nature',       desc: 'A quiet pause between rides, captured under the shade of trees.' },
  { src: '../assets/IMG_0069.jpg',     title: 'Solitude in Contrast',           cat: 'nature',       desc: 'A white dove stands at the boundary between shadow and light, creating a contrast that emphasizes simplicity, isolation, and the quiet elegance.' },
  { src: '../assets/IMG_0067.jpg',     title: 'United Gaze',         cat: 'documentary',  desc: 'Three geese rest together on the campus lawn with their synchronized posture and shared focus creating a sense of unity, companionship, and quiet observation.' },
];

/* ── GALLERY ── */
const grid       = document.getElementById('masonryGrid');
const emptyState = document.getElementById('emptyState');
const csMsg      = document.getElementById('comingSoonMsg');

function buildGallery(filter) {
  const filtered = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  grid.innerHTML = '';
  csMsg.style.display = 'none';

  if (photos.length === 0) {
    emptyState.style.display = 'block';
    grid.style.display = 'none';
    return;
  }
  emptyState.style.display = 'none';
  grid.style.display = '';

  if (filtered.length === 0) {
    csMsg.style.display = 'block';
    return;
  }

  filtered.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal' + (p.large ? ' large' : '');
    item.dataset.index = photos.indexOf(p);
    item.innerHTML = `
      <img src="${p.src}" alt="${p.title}" loading="lazy"
        onerror="this.closest('.gallery-item').style.display='none'" />
      <div class="gallery-item-overlay">
        <p class="gallery-item-cat">${p.cat}</p>
        <h3 class="gallery-item-title">${p.title}</h3>
      </div>
      <div class="gallery-item-expand">↗</div>
    `;
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
    grid.appendChild(item);

    /* staggered reveal */
    requestAnimationFrame(() => {
      setTimeout(() => item.classList.add('in'), i * 80);
    });
  });

  /* re-attach cursor hover to new items */
  grid.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/* ── LIGHTBOX ── */
const lb      = document.getElementById('lightbox');
const lbImg   = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbCat   = document.getElementById('lbCat');
let   lbIndex = 0;

function openLightbox(idx) {
  lbIndex = idx;
  const p = photos[idx];
  lbImg.src        = p.src;
  lbImg.alt        = p.title;
  lbTitle.textContent = p.title;
  lbCat.textContent   = p.cat + (p.desc ? ' — ' + p.desc : '');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function navLightbox(dir) {
  lbIndex = (lbIndex + dir + photos.length) % photos.length;
  openLightbox(lbIndex);
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => navLightbox(-1));
document.getElementById('lbNext').addEventListener('click', () => navLightbox(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

/* ── FILTERS ── */
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildGallery(btn.dataset.cat);
  });
});

/* ── CUSTOM CURSOR ── */
const dot  = document.getElementById('dot');
const ring = document.getElementById('ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function follow() {
  rx += (mx-rx) * .12;
  ry += (my-ry) * .12;
  dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(follow);
})();
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const sibs = [...(e.target.parentElement?.querySelectorAll('.reveal') || [])];
      setTimeout(() => e.target.classList.add('in'), sibs.indexOf(e.target) * 100);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(r => ro.observe(r));

/* ── SCROLL TO TOP ── */
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => scrollBtn.classList.toggle('visible', window.scrollY > 300));
scrollBtn.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); });

/* ── INIT ── */
buildGallery('all');
