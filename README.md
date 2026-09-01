# Billion Dreams Group — Website

Official site for **Billion Dreams Group** and its ventures, built with
[Astro](https://astro.build) as a fast, static, SEO-friendly multi-sector site.

| Venture | Status | Page |
| --- | --- | --- |
| Billion Dreams Interiors | **Active** | `/interiors` (full page) |
| Indish eVolt — EV charging | **Rolling out** | `/indish-evolt` (full page) |
| Billion Dreams Logistics | Coming soon | `/logistics` (stub) |
| Billion Dreams Software Solutions | Coming soon | `/software-solutions` (stub) |
| Billion Dreams Gym Equipments | Coming soon | `/gym-equipments` (stub) |

Interiors trades under three companies across two countries: **Billion Dreams
Interiors** in India, and **Majdan Interior Design Consultancy FZ LLC** and
**Milestone Kitchens** (kitchens & Corian tops) in the UAE. All three are shown,
with their own logos, in the "Where we operate" block on `/interiors`.

### Logos

Two different marks, easy to mix up:

- `brands/billion-dreams.png` — the **group** mark. Used in the site header and
  footer. Transparent, so it sits cleanly on the blurred sticky header.
- `brands/billion-dreams-interiors.png` — the **Interiors venture** mark (BD
  monogram with a sofa inside the D). Used only on the Indian operations card.

Every lockup in `brands/` is a trimmed, transparent PNG rendered for the black
plates in the operations block. The `.jpeg` files alongside them are the
untouched originals the PNGs were derived from — keep them, nothing imports them.
Milestone supplied a single-colour navy mark on white, so `milestone.png` is a
white knockout of it; swap it out if an official reversed lockup turns up.
`src/assets/logo.jpeg` is likewise the original behind `billion-dreams.png`.
`public/logo.jpeg` is separate and still serves the favicon and OG image.

**Indish eVolt** is a green-energy company established under **Indish World**
(est. 1997), presented here as a partner venture — the page says so explicitly
and links out to `indishevolt.com`. No investor or return figures appear on the
public site; that material stays in the deck.

---

## Tech stack

- **Astro v7** — zero-JS static output, component-based.
- **`astro:assets`** — automatic image optimization (JPEG/PNG → responsive WebP).
- Plain CSS design system in `src/styles/global.css`.
- No framework runtime; deploys as static files.

## Theming

Nothing in the stylesheet hard-codes a brand colour. Components read
`--accent-1/2/3`, `--accent-rgb`, `--accent-line` and `--accent-gradient`, which
default to Billion Dreams gold on `:root`. A venture page re-skins itself by
passing a theme class to the layout:

```astro
<Layout title="…" theme="theme-evolt"> … </Layout>
```

`.theme-evolt` (Indish eVolt green) lives in the "Venture themes" block near the
top of `global.css`. To add another venture theme, copy that block and change
the values — **redeclare all five tokens**, not just `--accent-rgb`: a custom
property that references another resolves against the element it is declared on,
so descendants inherit the already-computed value.

## Project structure

```
billiondreamsgroup.com/
├── astro.config.mjs
├── netlify.toml               # build config + 301s for retired URLs
├── public/
│   └── logo.jpeg              # favicon / og image (served as-is)
├── src/
│   ├── assets/
│   │   ├── logo.jpeg          # group logo used in header/footer
│   │   ├── brands/            # transparent PNG lockups (BD, Majdan, Milestone, Indish eVolt)
│   │   ├── evolt/             # Indish eVolt hero + station visuals
│   │   └── interiors/
│   │       ├── hero.jpg       # interiors page hero background
│   │       ├── workshop/      # "Inside our workshop" strip (auto-collected)
│   │       └── gallery/       # "Our work" grid (auto-collected)
│   ├── components/            # Header, Footer, ComingSoon
│   ├── layouts/Layout.astro   # shared <head>, fonts, header + footer, theme class
│   ├── styles/global.css      # design system
│   └── pages/                 # index, interiors, indish-evolt, + 3 stubs
└── assets/                    # ORIGINAL source photos/videos (not published)
```

## Commands

```bash
npm install        # once
npm run dev        # local dev server (prints the URL, e.g. http://localhost:4321)
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
```

## Editing content

- **Add / remove gallery photos:** drop `.jpg`/`.jpeg` files into
  `src/assets/interiors/gallery/` (or `.../workshop/`). They're picked up
  automatically, optimized, and shown — no code change needed. Filenames sort
  alphabetically, so prefix with numbers to control order.
- **Compress big source photos:** phone photos are often 12 MP / multiple MB.
  After adding large images, run `npm run compress` — it downscales anything
  over 1920px and re-encodes it in place (originals stay safe in `assets/`).
  The script skips images that are already small, so it's safe to re-run.
- **Interiors copy, operating companies, machinery, contacts:** edit
  `src/pages/interiors.astro`.
- **Indish eVolt copy:** edit the arrays at the top of
  `src/pages/indish-evolt.astro` (focus areas, network, capabilities, segments,
  progress) — the markup loops over them.
- **Ventures on the homepage:** edit the `ventures` array in `src/pages/index.astro`.
- **Coming-soon pages:** edit `src/pages/logistics.astro`,
  `software-solutions.astro`, `gym-equipments.astro`.
- **Navigation:** edit the `links` array in `src/components/Header.astro`.

## Image notes

- The `assets/` folder holds the **original** photos/videos as an archive. Only a
  curated subset was copied into `src/assets/` for the site.
- `assets/documents/` (brand PDFs and the Indish eVolt investor deck) is
  **gitignored on purpose** — this repository is public and the deck contains
  confidential financials. The logos and imagery the site needs were already
  extracted into `src/assets/brands/` and `src/assets/evolt/`.
- The Indish eVolt station images are **design visualisations, not photographs
  of installed sites**, and the page labels them as such. Replace them with real
  site photos once Phase 1 stations are live.
- Only the **cold-press** machine was photographed; the Edgebander and Panel Saw
  are presented as descriptive cards (no photo).
- ~12 sofa images (studio backgrounds, a "MANLY" watermark, "photo prohibited"
  signs) looked like reference/competitor shots and were **excluded** — confirm
  with the team before using any of them.
- 13 kitchen photos were shot sideways (90° rotated) and were skipped pending
  rotation fixes.

## Retired URLs

`/perfumes`, `/ventures` and `/fitness` were removed when the venture list
changed. `netlify.toml` 301s the first two to `/` and `/fitness` to
`/gym-equipments`, so existing links and search results don't break.

## Deploy

`npm run build` outputs a static `dist/`. Host anywhere:

- **Netlify** — connected; `netlify.toml` sets build, publish dir, Node 22 and
  the redirects.
- **Vercel / GitHub Pages / cPanel** — build and publish `dist/` (redirects would
  need re-declaring in that host's own format).
