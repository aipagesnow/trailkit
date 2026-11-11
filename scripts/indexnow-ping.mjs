// IndexNow ping of pages whose MAIN CONTENT changed since the previous production deploy (v2, after Dara audit 11 Nov).
// Read-only except the IndexNow POST. keeper.config.json optional. Expands sitemap indexes; never submits XML files.
// Per URL: skip non-200, noindex (meta robots or X-Robots-Tag), or canonical pointing elsewhere.
// Change = hash of <main> (else <article>, else <body> minus header/nav/footer/aside), scripts/build ids/asset hashes stripped,
// so footer/nav/template edits do not count. Guards: if more than MAX_CHANGED_PCT of indexable URLs changed, submit nothing
// (likely a template change) and log it; otherwise submit at most MAX_URLS. First run (or legacy cache) only seeds.
// Env: SITE_URL, INDEXNOW_KEY (public by IndexNow design), DRY_RUN=1, INDEXNOW_ALL=1 (manual full submit, still capped),
//      INDEXNOW_MAX_URLS (default 50), INDEXNOW_MAX_CHANGED_PCT (default 30), INDEXNOW_CACHE_DIR.
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
const MAX_URLS = Number(process.env.INDEXNOW_MAX_URLS || 50);
const MAX_PCT = Number(process.env.INDEXNOW_MAX_CHANGED_PCT || 30);
const cacheDir = process.env.INDEXNOW_CACHE_DIR || path.join(root, ".indexnow-cache");
const cacheFile = path.join(cacheDir, "main-hashes.json");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const DELAY = Number(process.env.INDEXNOW_DELAY_MS ?? 150);

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "aivora-indexnow/2.0" } });
      return { status: r.status, text: await r.text(), xrobots: r.headers.get("x-robots-tag") || "" };
    } catch (e) { if (i === 2) throw e; await sleep(2000); }
  }
}
const locs = (t) => [...t.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
const norm = (u) => { const x = new URL(u, site); let p = x.pathname.replace(/\/+$/, "") || "/"; return x.host.replace(/^www\./, "") + p; };

export function mainContent(html) {
  let m = html.match(/<main\b[\s\S]*?<\/main>/i) || html.match(/<article\b[\s\S]*?<\/article>/i);
  let s = m ? m[0] : (html.match(/<body\b[\s\S]*<\/body>/i) || [html])[0]
    .replace(/<(header|nav|footer|aside)\b[\s\S]*?<\/\1>/gi, "");
  return s.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/\b(nonce|data-dpl-id|data-build-id)="[^"]*"/gi, "")
    .replace(/\/_next\/static\/[^"']+|\/assets\/[^"']+/g, "").replace(/\s+/g, " ");
}
export function indexable(url, html, xrobots) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const robots = metas.filter((m) => /name=["'](robots|googlebot|bingbot)["']/i.test(m)).map((m) => (m.match(/content=["']([^"']*)["']/i) || [])[1] || "").join(",");
  if (/noindex/i.test(robots) || /noindex/i.test(xrobots)) return "noindex";
  const c = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i);
  const href = c && (c[0].match(/href=["']([^"']+)["']/i) || [])[1];
  if (href && norm(href) !== norm(url)) return `canonical elsewhere (${href})`;
  return null;
}

async function main() {
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
      pages.push(...locs(r.text)); await sleep(DELAY);
    }
    urls = pages;
  }
  urls = [...new Set(urls)].filter((u) => !/\.xml(\?|$)/i.test(u) && new URL(u).host === host);
  const old = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf8")) : null;
  const now = {}; const changed = []; const skipped = [];
  for (const u of urls) {
    const r = await get(u);
    if (r.status !== 200) { skipped.push(`${u} (HTTP ${r.status})`); continue; }
    const why = indexable(u, r.text, r.xrobots);
    if (why) { skipped.push(`${u} (${why})`); continue; }
    now[u] = createHash("sha256").update(mainContent(r.text)).digest("hex");
    if (process.env.INDEXNOW_ALL || (old && old[u] !== now[u])) changed.push(u);
    await sleep(DELAY);
  }
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cacheFile, JSON.stringify(now, null, 1));
  const n = Object.keys(now).length;
  console.log(`IndexNow: ${urls.length} sitemap URLs, ${n} indexable, ${skipped.length} skipped`);
  for (const s of skipped.slice(0, 20)) console.log(`  skip ${s}`);
  if (!old && !process.env.INDEXNOW_ALL) { console.log(`IndexNow: no previous cache; seeded ${n} main-content hashes, nothing submitted`); return; }
  if (!changed.length) { console.log("IndexNow: no main-content changes"); return; }
  const pct = n ? (100 * changed.length) / n : 0;
  if (!process.env.INDEXNOW_ALL && pct > MAX_PCT) {
    console.log(`IndexNow: ${changed.length}/${n} (${pct.toFixed(0)}%) main-content changed > ${MAX_PCT}% guard; looks like a template change. Nothing submitted.`);
    return;
  }
  const urlList = changed.slice(0, MAX_URLS);
  if (changed.length > MAX_URLS) console.log(`IndexNow: capped at ${MAX_URLS} of ${changed.length} changed URLs`);
  console.log(`IndexNow: ${urlList.length} changed URL(s)\n` + urlList.map((u) => "  " + u).join("\n"));
  if (process.env.DRY_RUN) { console.log("IndexNow: DRY_RUN, nothing submitted"); return; }
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${site}/${key}.txt`, urlList }),
  });
  console.log(`IndexNow response: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  if (res.status >= 400) process.exit(1);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
