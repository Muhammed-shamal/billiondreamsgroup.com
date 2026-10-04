# Marketing assets

Not part of the website. Astro only builds `src/` and copies `public/`, so
nothing in this folder is ever deployed — it is here so the source files live
with the project they describe. Safe to move or delete.

## instagram/

A four-slide carousel for **Wiesella's** Instagram, presenting
billiondreamsgroup.com as a case study. See `CAPTION.md` for the post copy,
alt text and posting order.

`posters.source.html` is the artboard file the PNGs were rendered from — four
1080×1350 boards in one page. To change the copy and re-export:

1. Edit `posters.source.html`.
2. Open it in a browser to check, then screenshot each `.board` at
   `deviceScaleFactor: 2` and downscale to 1080×1350.

The page screenshots it embeds were captured from a local `npm run preview`
build; they are referenced as relative paths (`shots/…`) that are not kept in
the repo, so re-rendering needs fresh captures.

**Re-measure before reusing the stats.** The "0 KB JavaScript" and "15 KB CSS"
figures on slide 2 were taken from a real production build:

```bash
npm run build
grep -c '<script' dist/index.html     # 0
find dist -name '*.js' | wc -l        # 0
du -b dist/_astro/*.css               # one shared stylesheet
```
