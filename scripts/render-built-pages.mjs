// Trailkit renders on demand (TanStack Start + Nitro), so there is no prerendered HTML to scan.
// After `vite build`, this loads the built Vercel function in-process, renders the sitemap URLs
// plus every internal page they link to, and writes the HTML to .keeper-html/ for keeper-check.
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fn = path.join(root, ".vercel/output/functions/__server.func/index.mjs");
const out = path.join(root, ".keeper-html");
if (!existsSync(fn)) { console.error("render-built-pages: built server not found at " + fn); process.exit(1); }
const handler = (await import(pathToFileURL(fn).href)).default;
const origin = "https://www.trailkitoutdoor.com";
const render = async (p) => {
  const res = await handler.fetch(new Request(origin + p, { headers: { accept: "text/html" } }), { waitUntil() {} });
  return { status: res.status, type: res.headers.get("content-type") || "", text: await res.text() };
};

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const sm = await render("/sitemap.xml");
if (sm.status !== 200) { console.error(`render-built-pages: /sitemap.xml returned ${sm.status}`); process.exit(1); }
const queue = [...sm.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = new Set(queue);
let bad = 0, n = 0;
while (queue.length && n < 1000) {
  const p = queue.shift();
  const r = await render(p);
  if (r.status >= 300 && r.status < 400) continue;
  if (r.status !== 200) { console.error(`render-built-pages: ${p} -> ${r.status}`); bad++; continue; }
  if (!r.type.includes("html")) continue;
  n++;
  const file = path.join(out, p === "/" ? "index.html" : p.replace(/^\//, "") + ".html");
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, r.text);
  for (const m of r.text.matchAll(/href="(\/[^"#?]*)"/g)) {
    const q = m[1].replace(/\/$/, "") || "/";
    if (/\.(png|jpe?g|webp|svg|ico|xml|txt|json|css|js|webmanifest)$/i.test(q) || q.startsWith("/assets/") || q.startsWith("/images/") || q.startsWith("/api/")) continue;
    if (!seen.has(q)) { seen.add(q); queue.push(q); }
  }
}
console.log(`render-built-pages: rendered ${n} pages to .keeper-html/`);
if (bad) { console.error(`render-built-pages: ${bad} page(s) failed to render`); process.exit(1); }
process.exit(0);
