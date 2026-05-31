# VLRN Vault — Portfolio Website
**Princess Valerie** · Multimedia Artist & Graphic Designer  
Trece Martires City, Cavite, Philippines

---

## Overview

VLRN Vault is a personal portfolio website showcasing the creative works of Princess Valerie — a multimedia arts student specializing in graphic design, branding, and visual storytelling. The site features a dark, editorial aesthetic with warm amber accents, animated star backgrounds, a custom cursor, and smooth scroll reveals.

---

## Project Structure

```
VLRN-Vault/
│
├── index.html              # Homepage — hero, vault grid, about, contact
├── style.css               # Main stylesheet for index.html
├── main.js                 # Main JavaScript for index.html
│
├── branding.html           # Branding & Identity section page
│
├── photography.html        # Photography section page (project cards)
│
├── Photography/            # Photography sub-section
│   ├── Photo-index.html    # Full photo gallery with masonry grid & lightbox
│   ├── Photo-main.js       # Gallery JS — photo data, lightbox, filters
│   └── PhotoStyle.css      # Stylesheet for the photo gallery page
│
└── assets/                 # All images and media
    ├── vlrn5.png           # VLRN Vault logo (used in nav across all pages)
    ├── header.png          # Morphéa branding hero image
    ├── PengPengSahur.jpg   # About section portrait photo
    ├── Portrait img.png    # Gallery photo — portrait
    ├── IMG_0067.png        # Gallery photo — documentary (street birds)
    ├── IMG_0069.png        # Gallery photo — nature (open field)
    ├── IMG_6723 3.png      # Gallery photo — portrait (cultural performance)
    ├── IMG_9928.png        # Gallery photo — nature (canopy light)
    └── IMG_9950.png        # Gallery photo — candid (afternoon companion)
```

---

## Pages

### `index.html` — Homepage
The main landing page. Contains:
- Animated starfield canvas background
- Hero section with title and CTA buttons
- Vault grid — links to Branding and Photography sections (photography card has an auto-advancing slideshow)
- About section with photo, bio, and contact info
- Custom amber glow cursor

### `branding.html` — Branding & Identity
Lists branding projects in a card grid. Currently features:
- **Morphéa** — cosmetics brand identity (logo, palette, typography, packaging)
- Two placeholder cards for upcoming projects

### `photography.html` — Photography Hub
An intermediate landing page for the photography section. Shows project cards with a slideshow preview and links to the full gallery.

### `Photography/Photo-index.html` — Photo Gallery
Full masonry photo gallery with:
- **Filter bar** — All / Portrait / Nature / Candid / Documentary
- **Lightbox** — click any photo to view full-size with keyboard navigation (←→ arrows, Escape to close)
- Staggered reveal animations on load

---

## Features

| Feature | Details |
|---|---|
| Custom cursor | Amber dot + lagging ring, enlarges on hover |
| Starfield | Canvas-based animated drifting stars |
| Scroll reveal | IntersectionObserver fade-up on all `.reveal` elements |
| Photography slideshow | Auto-advances every 2.8s on vault/photography cards |
| Masonry gallery | CSS `columns` layout, responsive (4→3→2→1 cols) |
| Lightbox | Full-screen image viewer with prev/next navigation |
| Category filters | JS-driven filter for photography gallery |
| Scroll to top | Fixed button appears after scrolling 300px |
| Mobile nav | Hamburger menu with animated open/close |
| Grain overlay | SVG noise texture for depth and atmosphere |

---

## Adding Photos to the Gallery

Open `Photography/Photo-main.js` and add entries to the `photos` array at the top of the file:

```js
const photos = [
  {
    src:   '../assets/YOUR_IMAGE.png',  // path relative to Photo-main.js
    title: 'Photo Title',
    cat:   'portrait',                  // portrait | nature | candid | documentary
    desc:  'Short caption for lightbox.',
    large: true,                        // optional — makes the card span wider
  },
  // ...
];
```

Save the file and the gallery will automatically display the new photos.

---

## Styling & Fonts

All pages share the same design tokens via CSS custom properties:

```css
--bg:           #0e0c0a   /* near-black background */
--cream:        #f0e8d8   /* primary text */
--accent:       #c8783a   /* amber orange */
--accent2:      #e8a060   /* lighter amber */
--ff-display:   'Cormorant Garamond'  /* headings */
--ff-label:     'Cinzel'              /* eyebrows, nav, labels */
--ff-body:      'DM Sans'            /* body copy */
```

Fonts are loaded from Google Fonts and require an internet connection.

---

## Navigation Logo

All pages use `assets/vlrn5.png` as the nav logo, styled with a warm amber CSS `filter` + `drop-shadow` glow. If the image fails to load, a plain text "VLRN Vault" fallback is shown. The homepage (`index.html`) shows the logo + a divider + the "VLRN Vault" text label. Sub-pages show the logo + divider + a back link (e.g. "← VLRN Vault").

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires JavaScript enabled for the gallery filters, lightbox, cursor, and animations.

---

## Contact

| | |
|---|---|
| Email | valrinry@gmail.com |
| Instagram | [@vlrn.vault](https://instagram.com/vlrn.vault) |

---

© 2026 VLRN Vault — Princess Valerie. All rights reserved.
