# Billion Dreams Group — Website

The official site for **Billion Dreams Group** and its ventures:

| Venture | Status |
| --- | --- |
| Interiors & Landscapes | Live soon |
| Perfumes | Live soon |
| Venture Capital | Live soon |
| Fitness | Future |

---

## Current stage: Coming Soon page

A single, self-contained "coming soon" page — **plain HTML + CSS**, no build
step. Open it directly or drop it on any static host.

```
billiondreamsgroup.com/
├── index.html          # the coming-soon page
├── css/
│   └── styles.css      # brand theme (black · gold · white)
├── assets/
│   ├── logo.png        # ← add the brand logo here (see assets/README.txt)
│   └── README.txt
└── README.md
```

### Run it locally

Just open `index.html` in a browser. Or serve it (better, so fonts/paths behave):

```bash
# Python (any OS with Python installed)
python -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

### Add the logo

Save the Billion Dreams logo as `assets/logo.png`. Until then the page shows a
styled text fallback, so it still looks intentional.

### Change the notify email

The "Notify me" form posts to `info@billiondreamsgroup.com` via
[FormSubmit](https://formsubmit.co) (no backend needed — confirm the address
once via their emailed link). Update the `action` in `index.html` to your real
inbox, or remove the form section entirely.

---

## Deploy (any of these work)

- **Netlify / Vercel** — drag the folder in, or connect the repo. Free, instant HTTPS.
- **GitHub Pages** — push to a repo, enable Pages on the `main` branch.
- **cPanel / shared hosting** — upload the files to `public_html`.

Point the domain `billiondreamsgroup.com` at whichever host you choose.

---

## Next stage: the full multi-sector site

Recommended stack: **[Astro](https://astro.build)**.

Why Astro fits this project:
- Ships **zero JavaScript by default** → very fast, great SEO.
- **Component-based** → each venture (Interiors, Perfumes, Ventures, Fitness)
  becomes its own section or page, reusing shared header/footer/theme.
- The HTML/CSS written here **drops straight in** — no rewrite.
- Easy content updates, and it still deploys as a static site to the same hosts.

When ready:

```bash
npm create astro@latest
```

Then move this page's markup into `src/pages/index.astro` and the styles into a
shared stylesheet, and grow one section per venture from there.
