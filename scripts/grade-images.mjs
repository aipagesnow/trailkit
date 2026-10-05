// Trailkit image grades.
// Usage: node scripts/grade-images.mjs [--money-only] [--missing] [srcDir=images-src] [outDir=public/images]
// Field grade: cool, desaturated, for hubs. Money grade: fuller chroma for roundup, compare, kit, and product pages.
// Output: <slug>-<w>.avif/.webp + <slug>.jpg, and <slug>-money-<w> + <slug>-money.jpg
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const flags = process.argv.slice(2).filter((arg) => arg.startsWith("--"));
const args = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const MONEY_ONLY = flags.includes("--money-only");
const MISSING = flags.includes("--missing");
const SRC = args[0] ?? "images-src";
const OUT = args[1] ?? "public/images";
const WIDTHS = [480, 800, 1200, 1600];

const FIELD_RECOMB = [
  [0.92, 0.06, 0.02],
  [0.04, 0.92, 0.04],
  [0.02, 0.08, 0.98],
];

// Slightly warm, almost neutral. Lifts chroma without neon or an orange cast.
const MONEY_RECOMB = [
  [1.04, 0.02, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 0.03, 0.96],
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

function pipeline(file, kind) {
  const base = sharp(file).rotate();
  if (kind === "money") {
    return base.modulate({ saturation: 1.12, brightness: 1.04 }).recomb(MONEY_RECOMB).linear(1.02, 3);
  }
  return base.modulate({ saturation: 0.62, brightness: 0.95 }).recomb(FIELD_RECOMB).linear(0.96, -4);
}

async function writeSet(file, outBase, kind, width) {
  const widths = WIDTHS.filter((w) => w <= width);
  for (const w of widths) {
    const resized = pipeline(file, kind).resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: kind === "money" ? 46 : 42, effort: 3 }).toFile(`${outBase}-${w}.avif`);
    await resized.clone().webp({ quality: kind === "money" ? 70 : 64 }).toFile(`${outBase}-${w}.webp`);
  }
  await pipeline(file, kind)
    .resize({ width: Math.min(width, 1600), withoutEnlargement: true })
    .jpeg({ quality: kind === "money" ? 74 : 68, mozjpeg: true, progressive: true })
    .toFile(`${outBase}.jpg`);
  const card = `${outBase}-800.avif`;
  try {
    const info = await stat(card);
    if (info.size > 45 * 1024) {
      await pipeline(file, kind).resize({ width: 800, withoutEnlargement: true }).avif({ quality: 28, effort: 6 }).toFile(card);
    }
  } catch {
    /* no 800 */
  }
  const hero = `${outBase}-1600.avif`;
  try {
    const heroInfo = await stat(hero);
    if (heroInfo.size > 120 * 1024) {
      await pipeline(file, kind).resize({ width: 1600, withoutEnlargement: true }).avif({ quality: 30, effort: 6 }).toFile(hero);
    }
  } catch {
    /* narrower than 1600 */
  }
}

async function hasCard(outBase) {
  try {
    const info = await stat(`${outBase}-800.avif`);
    return info.size > 4096;
  } catch {
    try {
      const info = await stat(`${outBase}-480.avif`);
      return info.size > 2048;
    } catch {
      return false;
    }
  }
}

async function grade(file) {
  const rel = path.relative(SRC, file).replace(/\.(jpe?g|png|webp)$/i, "");
  const outBase = path.join(OUT, rel);
  await mkdir(path.dirname(outBase), { recursive: true });
  const needField = !MONEY_ONLY && !(MISSING && (await hasCard(outBase)));
  const needMoney = !(MISSING && (await hasCard(`${outBase}-money`)));
  if (!needField && !needMoney) return null;
  const { width } = await sharp(file).rotate().metadata();
  const px = width ?? 1600;
  if (needField) await writeSet(file, outBase, "field", px);
  if (needMoney) await writeSet(file, `${outBase}-money`, "money", px);
  return rel;
}

let n = 0;
let skipped = 0;
const queue = [];
for await (const f of walk(SRC)) queue.push(f);
console.log(`queue ${queue.length}`);
async function worker() {
  while (queue.length) {
    const f = queue.shift();
    const rel = await grade(f);
    if (rel) {
      n++;
      if (n % 8 === 0) console.log(`progress ${n} ${rel}`);
    } else skipped++;
  }
}
await Promise.all([worker(), worker()]);
console.log(`graded ${n} images -> ${OUT}${MONEY_ONLY ? " (money only)" : ""}${MISSING ? ` (missing only, skipped ${skipped})` : ""}`);
