// Build a 1200×630 Open Graph card per route: photo if we have one, charcoal strip, title, blaze rule.
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const manifest = JSON.parse(readFileSync(new URL("../IMAGE-MANIFEST.json", import.meta.url), "utf8"));
const HUB_TITLES = {
  "/best": "Gear roundups",
  "/guides": "Hiking and camping guides",
  "/kits": "Trip kits",
  "/compare": "Gear comparisons",
  "/gear": "Gear categories",
  "/browse": "Browse all gear",
  "/learn": "Field notes",
  "/library": "Library",
};
const pages = [
  { path: "/", title: "Practical hiking and backpacking gear picks", image: "/images/home-hero.jpg" },
  { path: "/about", title: "About Trailkit", image: "" },
  { path: "/editorial", title: "Editorial standards", image: "" },
  { path: "/disclosure", title: "Affiliate disclosure", image: "" },
  { path: "/privacy", title: "Privacy", image: "" },
  { path: "/contact", title: "Contact", image: "" },
  ...manifest.cards.map((card) => ({
    path: card.route,
    title: HUB_TITLES[card.route] || card.card_title,
    image: card.image,
  })),
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&" + "amp;")
    .replaceAll("<", "&" + "lt;")
    .replaceAll(">", "&" + "gt;")
    .replaceAll('"', "&" + "quot;");
}

function wrap(title) {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= 46) return [clean];
  const cut = clean.lastIndexOf(" ", 46);
  const at = cut > 16 ? cut : 46;
  return [clean.slice(0, at), clean.slice(at).trim()];
}

async function render(page) {
  const out = page.path === "/" ? "public/og/home.jpg" : path.join("public/og", `${page.path.replace(/^\//, "")}.jpg`);
  mkdirSync(path.dirname(out), { recursive: true });
  const lines = wrap(page.title.includes("Trailkit") ? page.title : `${page.title} | Trailkit`);
  const photo = page.image ? path.join("public", page.image.replace(/^\//, "")) : "";
  const layers = [];
  if (photo && existsSync(photo)) {
    const img = await sharp(photo).resize(1200, 500, { fit: "cover", position: "centre" }).jpeg().toBuffer();
    layers.push({ input: img, top: 0, left: 0 });
  }
  const text = lines
    .map((line, i) => `<text x="80" y="${lines.length === 1 ? 82 : 60 + i * 34}" fill="#f7f6f2" font-family="DejaVu Sans, Liberation Sans, sans-serif" font-size="30" font-weight="700">${escapeXml(line)}</text>`)
    .join("");
  const svg = Buffer.from(
    `<svg width="1200" height="130" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="130" fill="#0f1416"/>
      <rect width="1200" height="4" fill="#ff5a1f"/>
      <path d="M48 48 L64 64 L48 80 L32 64 Z" fill="#f7f6f2"/>
      <path d="M48 56 L56 64 L48 74 L40 64 Z" fill="#ff5a1f"/>
      ${text}
    </svg>`,
  );
  const composites = [...layers, { input: svg, top: 500, left: 0 }];
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#0f1416" } })
    .composite(composites)
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(out);
}

let n = 0;
for (const page of pages) {
  await render(page);
  n++;
}
console.log(`og cards ${n}`);
