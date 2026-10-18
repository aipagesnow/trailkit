// Build-time keeper check. Runs after the build and fails it (exit 1) if any built page has:
//  - an Amazon link without the affiliate tag
//  - an Amazon link without rel="sponsored"
//  - Amazon links but no affiliate disclosure
//  - invalid JSON-LD, or any FAQPage schema
//  - a meta description over 160 characters
// Scans prerendered HTML (.next/server/app for Next.js, dist/ or .output/public otherwise).
// Usage: node scripts/keeper-check.mjs [dir...]
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfgPath = path.join(root, "keeper.config.json");
const cfg = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, "utf8")) : {};
const tag = process.env.AMAZON_ASSOCIATE_TAG || cfg.amazonTag || "";
const disclosureRe = new RegExp(cfg.disclosurePattern || "amazon associate|affiliate|commission", "i");
const maxDesc = cfg.maxDescription || 160;

const args = process.argv.slice(2);
const dirs = (args.length ? args : cfg.htmlDirs || [".next/server/app", "dist", ".output/public"])
  .map((d) => path.resolve(root, d))
  .filter(existsSync);

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

function types(v, out) {
  if (!v || typeof v !== "object") return out;
  if (Array.isArray(v)) { v.forEach((x) => types(x, out)); return out; }
  const t = v["@type"];
  if (typeof t === "string") out.push(t);
  else if (Array.isArray(t)) out.push(...t);
  Object.values(v).forEach((x) => types(x, out));
  return out;
}

const isAmazon = (href) => /^https?:\/\/(www\.)?(amazon\.[a-z.]+|amzn\.(to|eu))\//i.test(href);

let pages = 0;
let amazonLinks = 0;
for (const dir of dirs) {
  for (const file of walk(dir)) {
    const where = path.relative(root, file);
    if (/(^|\/)(_not-found|404|500|_global-error|_error)\.html$/.test(where)) continue;
    const html = readFileSync(file, "utf8");
    pages++;

    // Meta description length
    for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
      if (!/name=["']description["']/i.test(m[0])) continue;
      const c = m[0].match(/content=(?:"([^"]*)"|'([^']*)')/i);
      const text = decode((c && (c[1] ?? c[2])) || "").trim();
      if (!text) fail(where, "empty meta description");
      else if ([...text].length > maxDesc) fail(where, `meta description is ${[...text].length} chars (max ${maxDesc})`);
    }

    // JSON-LD
    for (const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      let data;
      try { data = JSON.parse(m[1]); } catch (e) { fail(where, `invalid JSON-LD (${e.message.slice(0, 80)})`); continue; }
      const t = types(data, []);
      if (t.includes("FAQPage")) fail(where, "FAQPage JSON-LD present");
      if (t.length === 0) fail(where, "JSON-LD block has no @type");
    }
    if (/itemtype=["'][^"']*FAQPage/i.test(html)) fail(where, "FAQPage microdata present");

    // Amazon links
    let pageAmazon = 0;
    for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
      const a = m[0];
      const h = a.match(/href=(?:"([^"]*)"|'([^']*)')/i);
      if (!h) continue;
      const href = decode(h[1] ?? h[2]);
      if (!isAmazon(href)) continue;
      pageAmazon++;
      let u;
      try { u = new URL(href); } catch { fail(where, `unparseable Amazon href ${href}`); continue; }
      const got = u.searchParams.get("tag");
      if (!got) fail(where, `Amazon link missing tag: ${href}`);
      else if (tag && got !== tag) fail(where, `Amazon link has tag "${got}", expected "${tag}": ${href}`);
      const rel = (a.match(/rel=(?:"([^"]*)"|'([^']*)')/i) || [])
        .slice(1).filter(Boolean).join(" ");
      if (!/\bsponsored\b/i.test(rel)) fail(where, `Amazon link missing rel="sponsored": ${href}`);
    }
    amazonLinks += pageAmazon;
    if (pageAmazon > 0) {
      const text = decode(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
      if (!disclosureRe.test(text)) fail(where, "page has Amazon links but no affiliate disclosure");
    }
  }
}

if (pages === 0) {
  console.error(`keeper-check: no built HTML found in ${dirs.join(", ") || "(no dirs)"}`);
  process.exit(1);
}
if (failures.length) {
  console.error(`keeper-check: FAILED with ${failures.length} problem(s) across ${pages} pages:`);
  for (const f of failures.slice(0, 200)) console.error("  - " + f);
  process.exit(1);
}
console.log(`keeper-check: OK (${pages} pages, ${amazonLinks} Amazon links${tag ? `, tag ${tag}` : ""})`);
