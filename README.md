# Billion Dreams Group — Website

Official site for **Billion Dreams Group** and its ventures, built with
[Astro](https://astro.build) as a fast, static, SEO-friendly multi-sector site.

| Venture | Status | Page |
| --- | --- | --- |
| Interiors & Landscapes | **Active** | `/interiors` (full page) |
| Perfumes | Coming soon | `/perfumes` (stub) |
| Venture Capital | Coming soon | `/ventures` (stub) |
| Fitness | Future | `/fitness` (stub) |

---

## Tech stack

- **Astro v7** — zero-JS static output, component-based.
- **`astro:assets`** — automatic image optimization (JPEG → responsive WebP).
- Plain CSS design system in `src/styles/global.css` (theme: black · gold · white).
- No framework runtime; deploys as static files.

## Project structure

```
billiondreamsgroup.com/
├── astro.config.mjs
├── package.json
├── public/
│   └── logo.jpeg              # favicon / og image (served as-is)
├── src/
│   ├── assets/
│   │   ├── logo.jpeg          # logo used by <Image> (optimized)
│   │   └── interiors/
│   │       ├── hero.jpg       # interiors page hero background
│   │       ├── workshop/      # "Inside our workshop" strip (auto-collected)
│   │       └── gallery/       # "Our work" grid (auto-collected)
│   ├── components/            # Header, Footer, VentureCard-style cards, ComingSoon
│   ├── layouts/Layout.astro   # shared <head>, fonts, header + footer
│   ├── styles/global.css      # design system
│   └── pages/                 # index, interiors, perfumes, ventures, fitness
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
  Astro then generates the small responsive WebP variants at build time. The
  script skips images that are already small, so it's safe to re-run.
- **Interiors copy, machinery, contacts:** edit `src/pages/interiors.astro`.
- **Ventures on the homepage:** edit the `ventures` array in `src/pages/index.astro`.
- **Coming-soon pages:** edit `src/pages/perfumes.astro`, `ventures.astro`, `fitness.astro`.

## Image notes

- The `assets/` folder holds the **original** WhatsApp photos/videos as an archive.
  Only a curated subset was copied into `src/assets/interiors/` for the site.
- Only the **cold-press** machine was photographed; the Edgebander and Panel Saw
  are presented as descriptive cards (no photo).
- ~12 sofa images (studio backgrounds, a "MANLY" watermark, "photo prohibited"
  signs) looked like reference/competitor shots and were **excluded** — confirm
  with the team before using any of them.
- 13 kitchen photos were shot sideways (90° rotated) and were skipped pending
  rotation fixes.

## Deploy

`npm run build` outputs a static `dist/`. Host anywhere:

- **Netlify / Vercel** — connect the repo (build: `npm run build`, publish: `dist`).
- **GitHub Pages** — publish the `dist/` folder.
- **cPanel / shared hosting** — upload the contents of `dist/` to `public_html`.
