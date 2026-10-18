// Ping IndexNow with URLs that changed since the last production deploy.
// Fetches every URL in the live sitemap, hashes the page body (scripts/build ids stripped),
// compares with the previous run's hashes (.indexnow-cache/hashes.json, kept by the GitHub
// Actions cache), and submits new + changed URLs plus the sitemap itself.
// Env: SITE_URL (default from keeper.config.json), INDEXNOW_KEY (default from config),
//      DRY_RUN=1 to print without submitting, INDEXNOW_ALL=1 to submit every sitemap URL.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(path.join(root, "keeper.config.json"), "utf8"));
const site = (process.env.SITE_URL || cfg.siteUrl).replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || cfg.indexNowKey;
const host = new URL(site).host;
const cacheDir = path.join(root, ".indexnow-cache");
const cacheFile = path.join(cacheDir, "hashes.json");

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "keeper-indexnow/1.0" } });
      return { status: r.status, text: await r.text() };
    } catch (e) { if (i === 2) throw e; await new Promise((s) => setTimeout(s, 2000)); }
  }
}

const sm = await get(`${site}/sitemap.xml`);
if (sm.status !== 200) { console.error(`sitemap returned ${sm.status}`); process.exit(1); }
const urls = [...sm.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

const old = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf8")) : {};
const now = {};
const changed = [];
for (const u of urls) {
  const r = await get(u);
  if (r.status !== 200) { console.warn(`skip ${u} (${r.status})`); continue; }
  const body = r.text
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\b(nonce|data-dpl-id|data-build-id)="[^"]*"/gi, "")
    .replace(/\/_next\/static\/[^"']+|\/assets\/[^"']+/g, "");
  const h = createHash("sha256").update(body).digest("hex");
  now[u] = h;
  if (process.env.INDEXNOW_ALL || old[u] !== h) changed.push(u);
}
mkdirSync(cacheDir, { recursive: true });
writeFileSync(cacheFile, JSON.stringify(now, null, 1));

if (!changed.length) { console.log("IndexNow: no changed URLs"); process.exit(0); }
const urlList = [...new Set([...changed, `${site}/sitemap.xml`])];
console.log(`IndexNow: ${urlList.length} URL(s)\n` + urlList.map((u) => "  " + u).join("\n"));
if (process.env.DRY_RUN) process.exit(0);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow response: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
if (res.status >= 400) process.exit(1);
