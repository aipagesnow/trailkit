// Post-deploy proof: checks the LIVE site. For every sitemap URL (plus extra paths in
// keeper.config.json "proofPaths") it checks HTTP 200, a canonical that matches the URL,
// every Amazon link carrying the affiliate tag and rel="sponsored", and the IndexNow key file.
// Env: SITE_URL, AMAZON_ASSOCIATE_TAG (else keeper.config.json amazonTag). Exit 1 on any failure.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(path.join(root, "keeper.config.json"), "utf8"));
const site = (process.env.SITE_URL || cfg.siteUrl).replace(/\/$/, "");
const tag = process.env.AMAZON_ASSOCIATE_TAG || cfg.amazonTag || "";
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const norm = (u) => u.replace(/\/$/, "");
const fails = [];
const get = async (u) => { const r = await fetch(u, { redirect: "manual", headers: { "user-agent": "keeper-proof/1.0" } }); return { status: r.status, text: await r.text() }; };

const sm = await get(`${site}/sitemap.xml`);
if (sm.status !== 200) fails.push(`sitemap.xml -> ${sm.status}`);
const urls = [...new Set([...sm.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]).concat((cfg.proofPaths || []).map((p) => site + p)))];
const key = await get(`${site}/${cfg.indexNowKey}.txt`);
if (key.status !== 200 || key.text.trim() !== cfg.indexNowKey) fails.push(`IndexNow key file -> ${key.status}`);

let links = 0;
for (const u of urls) {
  const r = await get(u);
  if (r.status !== 200) { fails.push(`${u} -> HTTP ${r.status}`); continue; }
  const c = r.text.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i);
  const href = c && (c[0].match(/href=["']([^"']+)["']/i) || [])[1];
  if (!href) fails.push(`${u}: no canonical`);
  else if (norm(dec(href)) !== norm(u)) fails.push(`${u}: canonical is ${href}`);
  for (const m of r.text.matchAll(/<a\b[^>]*>/gi)) {
    const h = (m[0].match(/href=["']([^"']+)["']/i) || [])[1];
    if (!h || !/^https?:\/\/(www\.)?amazon\./i.test(dec(h))) continue;
    links++;
    const t = new URL(dec(h)).searchParams.get("tag");
    if (!t || (tag && t !== tag)) fails.push(`${u}: Amazon link tag ${t || "missing"}: ${dec(h)}`);
    if (!/rel=["'][^"']*sponsored/i.test(m[0])) fails.push(`${u}: Amazon link without rel=sponsored: ${dec(h)}`);
  }
}
console.log(`proof: ${urls.length} URLs, ${links} Amazon links checked on ${site}`);
if (fails.length) { console.error(`proof FAILED (${fails.length}):\n` + fails.slice(0, 100).map((f) => "  - " + f).join("\n")); process.exit(1); }
console.log("proof: OK");
