// One-off: downscale + recompress source images in src/assets/interiors.
// Originals remain untouched in assets/images/. Run: node compress-images.mjs
import sharp from "sharp";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "src/assets/interiors";
const MAX = 1920; // longest edge cap (hero needs up to 1920w; gallery only 900w)
const QUALITY = 88; // near-transparent recompress; Astro does the final WebP pass

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(ROOT);
let before = 0,
  after = 0;
for (const f of files) {
  const input = await readFile(f); // read into memory so no file handle is held on the path
  before += input.length;
  const meta = await sharp(input).metadata();
  // Skip images that are already small enough — avoids inflating them on re-runs.
  if (meta.width <= MAX && meta.height <= MAX && input.length <= 400 * 1024) {
    after += input.length;
    console.log(`${path.basename(f).padEnd(24)} ${meta.width}x${meta.height}  ${Math.round(input.length / 1024)}KB (skipped)`);
    continue;
  }
  const buf = await sharp(input, { failOn: "none" })
    .rotate() // bake EXIF orientation, strip metadata
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  await writeFile(f, buf);
  after += buf.length;
  console.log(
    `${path.basename(f).padEnd(24)} ${meta.width}x${meta.height}  ${Math.round(
      input.length / 1024,
    )}KB -> ${Math.round(buf.length / 1024)}KB`,
  );
}
console.log(
  `\nTOTAL  ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB  (${files.length} files)`,
);
