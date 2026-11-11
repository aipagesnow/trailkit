// IndexNow ping of URLs that changed since the previous production deploy (read-only except the IndexNow POST).
// Portable version: keeper.config.json optional. Expands sitemap indexes. Never submits sitemap child XML files as pages.
// Change detection: per-URL body hash (scripts/build ids/hashed asset paths stripped) vs previous run's
// .indexnow-cache/hashes.json (restored by actions/cache). First run with no cache => seeds the cache, submits nothing
// unless INDEXNOW_ALL=1. Env: SITE_URL, INDEXNOW_KEY (public by IndexNow design; it is served at /<key>.txt), DRY_RUN=1.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfgPath = path.join(root, "keeper.config.json");
const cfg = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, "utf8")) : {};
const site = (process.env.SITE_URL || cfg.siteUrl || "").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || cfg.indexNowKey;
if (!site || !key) { console.error("SITE_URL / INDEXNOW_KEY missing"); process.exit(1); }
const host = new URL(site).host;
const cacheDir = process.env.INDEXNOW_CACHE_DIR || path.join(root, ".indexnow-cache");
const cacheFile = path.join(cacheDir, "hashes.json");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "aivora-indexnow/1.1" } });
      return { status: r.status, text: await r.text() };
    } catch (e) { if (i === 2) throw e; await sleep(2000); }
  }
}
const locs = (t) => [...t.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

const keyCheck = await get(`${site}/${key}.txt`);
if (keyCheck.status !== 200 || keyCheck.text.trim() !== key) { console.error(`key file not live at ${site}/<key>.txt (HTTP ${keyCheck.status})`); process.exit(1); }

const sm = await get(`${site}/sitemap.xml`);
if (sm.status !== 200) { console.error(`sitemap returned ${sm.status}`); process.exit(1); }
let urls = locs(sm.text);
if (/<sitemapindex[\s>]/i.test(sm.text)) {
  const pages = [];
  for (const child of urls) {
    const r = await get(child);
    if (r.status !== 200) { console.error(`child sitemap ${child} -> ${r.status}`); process.exit(1); }
    pages.push(...locs(r.text)); await sleep(200);
  }
  urls = pages;
}
urls = [...new Set(urls)].filter((u) => !/\.xml(\?|$)/i.test(u) && new URL(u).host === host);

const old = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf8")) : null;
const now = {}; const changed = [];
for (const u of urls) {
  const r = await get(u);
  if (r.status !== 200) { console.warn(`skip ${u} (${r.status})`); continue; }
  const body = r.text
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\b(nonce|data-dpl-id|data-build-id)="[^"]*"/gi, "")
    .replace(/\/_next\/static\/[^"']+|\/assets\/[^"']+/g, "");
  now[u] = createHash("sha256").update(body).digest("hex");
  if (process.env.INDEXNOW_ALL || (old && old[u] !== now[u])) changed.push(u);
  await sleep(150);
}
mkdirSync(cacheDir, { recursive: true });
writeFileSync(cacheFile, JSON.stringify(now, null, 1));
if (!old && !process.env.INDEXNOW_ALL) { console.log(`IndexNow: no previous cache; seeded ${Object.keys(now).length} hashes, nothing submitted`); process.exit(0); }
if (!changed.length) { console.log("IndexNow: no changed URLs"); process.exit(0); }
const urlList = changed.slice(0, 10000);
console.log(`IndexNow: ${urlList.length} changed URL(s) of ${urls.length}\n` + urlList.map((u) => "  " + u).join("\n"));
if (process.env.DRY_RUN) process.exit(0);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST", headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow response: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
if (res.status >= 400) process.exit(1);
