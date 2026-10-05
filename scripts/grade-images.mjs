// Trailkit "Field Grade" — one look for every image, whatever generated it.
// Usage: node scripts/grade-images.mjs [srcDir=images-src] [outDir=public/images]
// Input: masters (jpg/png/webp) in srcDir mirroring /images/<hub>/<slug>.<ext>
// Output: <slug>-<w>.avif / .webp for widths + <slug>.jpg fallback (1600w max). Requires: npm i -D sharp
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = process.argv[2] ?? "images-src";
const OUT = process.argv[3] ?? "public/images";
const WIDTHS = [480, 800, 1200, 1600];

// Cool-charcoal split: slightly pull red, keep green, lift blue in shadows (#1d2326 / #3d5a6c family)
const RECOMB = [
  [0.92, 0.06, 0.02],
  [0.04, 0.92, 0.04],
  [0.02, 0.08, 0.98],
];

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) yield p;
  }
}

async function grade(file) {
  const rel = path.relative(SRC, file).replace(/\.(jpe?g|png|webp)$/i, "");
  const outBase = path.join(OUT, rel);
  await mkdir(path.dirname(outBase), { recursive: true });
  const input = sharp(file).rotate();
  const { width } = await input.metadata();
  const graded = () =>
    sharp(file)
      .rotate()
      .modulate({ saturation: 0.62, brightness: 0.95 })
      .recomb(RECOMB)
      .linear(0.96, -4);
  for (const w of WIDTHS.filter((w) => w <= (width ?? 1600))) {
    const resized = graded().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 42, effort: 5 }).toFile(`${outBase}-${w}.avif`);
    await resized.clone().webp({ quality: 64 }).toFile(`${outBase}-${w}.webp`);
  }
  await graded()
    .resize({ width: Math.min(width ?? 1600, 1600), withoutEnlargement: true })
    .jpeg({ quality: 68, mozjpeg: true, progressive: true })
    .toFile(`${outBase}.jpg`);
  const card = `${outBase}-800.avif`;
  try {
    const info = await stat(card);
    if (info.size > 45 * 1024) {
      await graded().resize({ width: 800, withoutEnlargement: true }).avif({ quality: 32, effort: 6 }).toFile(card);
    }
  } catch {
    /* no 800 */
  }
  return rel;
}

let n = 0;
for await (const f of walk(SRC)) {
  await grade(f);
  n++;
}
console.log(`graded ${n} images -> ${OUT}`);
