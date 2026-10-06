import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const svg = readFileSync("public/favicon.svg");

async function png(size, file, pad = 0) {
  const inner = size - pad * 2;
  const icon = await sharp(svg).resize(inner, inner).png().toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: "#1d2326" },
  })
    .composite([{ input: icon, top: pad, left: pad }])
    .png()
    .toFile(file);
}

await sharp(svg).resize(32, 32).png().toFile("public/favicon-32.png");
await png(180, "public/apple-touch-icon.png", 24);
await png(512, "public/icon-512.png", 64);
// Tile fills the canvas. The blazes already sit inside the maskable safe zone.
await png(512, "public/icon-512-maskable.png", 0);

function ico(png16, png32) {
  const count = 2;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const images = [png16, png32];
  const sizes = [16, 32];
  for (let i = 0; i < count; i++) {
    const at = i * 16;
    dir[at] = sizes[i];
    dir[at + 1] = sizes[i];
    dir[at + 2] = 0;
    dir[at + 3] = 0;
    dir.writeUInt16LE(1, at + 4);
    dir.writeUInt16LE(32, at + 6);
    dir.writeUInt32LE(images[i].length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += images[i].length;
  }
  return Buffer.concat([header, dir, ...images]);
}

const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
const png32 = await sharp("public/favicon-32.png").png().toBuffer();
writeFileSync("public/favicon.ico", ico(png16, png32));

const fontFile = path.resolve("scripts/fonts/IBMPlexSansCondensed-SemiBold.ttf");
const fontSize = 132;
const word = await sharp({
  text: {
    text: `<span foreground="#f7f6f2" size="${fontSize * 1024}" letter_spacing="${Math.round(-0.025 * fontSize * 1024)}">Trailkit</span>`,
    font: "IBM Plex Sans Condensed",
    fontfile: fontFile,
    rgba: true,
    dpi: 72,
  },
}).png().toBuffer();
const trimmed = await sharp(word).trim().png().toBuffer();
const wordMeta = await sharp(trimmed).metadata();
const cap = wordMeta.height ?? fontSize;
const textW = wordMeta.width ?? 600;
const scale = cap / 32;
const markW = 32 * scale;
const gap = Math.round(fontSize * 0.2);
const groupW = markW + gap + textW;
const x0 = Math.round((1200 - groupW) / 2);
const y0 = Math.round((630 - cap) / 2);
const ogMark = Buffer.from(svg.toString("utf8").replaceAll("#1d2326", "#2a3236"));
const mark = await sharp(ogMark).resize(Math.round(markW), Math.round(32 * scale)).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#1d2326" } })
  .composite([
    { input: mark, left: x0, top: y0 },
    { input: trimmed, left: Math.round(x0 + markW + gap), top: y0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("favicons written");
