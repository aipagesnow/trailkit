#!/usr/bin/env node
/**
 * Writes src/data/last-updated.ts: YYYY-MM-DD (Europe/London) each indexable
 * sitemap URL last changed, from git blame on that page's data entry and,
 * where it is that page's own source, its route or product-guide file.
 * Shared chrome (root layout, generic cards on every page) is ignored.
 * The /compare hub also uses src/routes/compare/$slug.tsx (shared template).
 * Individual /compare/${slug} pages use the data-entry blame date, not the
 * template's fileDate. A page.slug === "…" condition in that template still
 * bumps that one slug (so a hideUpdated fix is attributed honestly).
 * Uncommitted edits count as today. Run: node scripts/gen-last-updated.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OPTS = { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 };
const git = (...args) => execFileSync("git", args, OPTS);

const londonDate = (epoch) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(epoch * 1000));

const now = Math.floor(Date.now() / 1000);
const dirty = new Set(
  git("status", "--porcelain")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.slice(3).trim().replace(/^.* -> /, ""))
);

function fileDate(path) {
  if (!existsSync(path)) return "";
  if (dirty.has(path)) return londonDate(now);
  const out = git("log", "-1", "--format=%ct", "--", path).trim();
  return out ? londonDate(Number(out)) : "";
}

function blameDate(path, start, end) {
  if (!existsSync(path) || start < 1 || end < start) return "";
  if (dirty.has(path)) return londonDate(now);
  const out = git("blame", "-w", "--line-porcelain", "-L", `${start},${end}`, "--", path);
  let best = 0;
  let current = "";
  for (const line of out.split("\n")) {
    const head = line.match(/^([0-9a-f]{40}) /);
    if (head) current = head[1];
    else if (line.startsWith("committer-time ")) {
      best = Math.max(best, Number(line.slice(15)));
    }
  }
  return best ? londonDate(best) : "";
}

/** slug -> [startLine, endLine] for top-level `{ ... }` objects in a file. */
function entryRanges(path) {
  if (!existsSync(path)) return {};
  const lines = readFileSync(path, "utf8").split("\n");
  const ranges = {};
  const starts = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^  \{/.test(lines[i])) starts.push(i);
  }
  starts.forEach((s, k) => {
    const endIdx = k + 1 < starts.length ? starts[k + 1] - 1 : lines.length - 1;
    let e = endIdx;
    const block = lines.slice(s, e + 1).join("\n");
    const slug = block.match(/^\s+"?slug"?\s*:\s*"([^"]+)"/m);
    if (slug) ranges[slug[1]] = [s + 1, e + 1];
  });
  return ranges;
}

function rangesInExport(path, exportName) {
  if (!existsSync(path)) return {};
  const text = readFileSync(path, "utf8");
  const lines = text.split("\n");
  const startRe = new RegExp(`^export const ${exportName}\\b`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startRe.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start < 0) return {};
  let end = lines.length - 1;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^export const /.test(lines[i]) || /^export \{/.test(lines[i]) || /^export function /.test(lines[i])) {
      end = i - 1;
      break;
    }
  }
  const ranges = {};
  const starts = [];
  for (let i = start; i <= end; i++) {
    if (/^  \{/.test(lines[i])) starts.push(i);
  }
  starts.forEach((s, k) => {
    const endIdx = k + 1 < starts.length ? starts[k + 1] - 1 : end;
    const block = lines.slice(s, endIdx + 1).join("\n");
    const slug = block.match(/^\s+"?slug"?\s*:\s*"([^"]+)"/m);
    if (slug) ranges[slug[1]] = [s + 1, endIdx + 1];
  });
  return ranges;
}

const latest = (...xs) => xs.filter(Boolean).sort().pop() || "";
const map = {};
function setPath(path, ...dates) {
  const d = latest(map[path], ...dates);
  if (d) map[path] = d;
}

const EDITORIAL = "src/data/editorial.ts";
const EXP_PAGES = "src/data/expansion/pages.ts";
const PRODUCTS = "src/data/products.ts";
const EXP_CATALOG = "src/data/expansion/catalog.ts";

for (const [file, exp] of [
  [EDITORIAL, "roundups"],
  [EXP_PAGES, "extraRoundups"],
]) {
  for (const [slug, [s, e]] of Object.entries(rangesInExport(file, exp))) {
    setPath(`/best/${slug}`, blameDate(file, s, e));
  }
}
for (const [file, exp] of [
  [EDITORIAL, "guides"],
  [EXP_PAGES, "extraGuides"],
]) {
  for (const [slug, [s, e]] of Object.entries(rangesInExport(file, exp))) {
    setPath(`/guides/${slug}`, blameDate(file, s, e));
  }
}
for (const [slug, [s, e]] of Object.entries(rangesInExport(EXP_PAGES, "notes"))) {
  setPath(`/learn/${slug}`, blameDate(EXP_PAGES, s, e));
}
for (const [file, exp] of [
  [EDITORIAL, "compares"],
  [EXP_PAGES, "extraCompares"],
]) {
  for (const [slug, [s, e]] of Object.entries(rangesInExport(file, exp))) {
    setPath(`/compare/${slug}`, blameDate(file, s, e));
  }
}
const COMPARE_TEMPLATE = "src/routes/compare/$slug.tsx";
if (existsSync(COMPARE_TEMPLATE)) {
  const tplLines = readFileSync(COMPARE_TEMPLATE, "utf8").split("\n");
  const mentionLines = {};
  tplLines.forEach((line, i) => {
    for (const m of line.matchAll(/page\.slug\s*===\s*["']([^"']+)["']/g)) {
      (mentionLines[m[1]] ||= []).push(i + 1);
    }
  });
  for (const [slug, lines] of Object.entries(mentionLines)) {
    setPath(`/compare/${slug}`, blameDate(COMPARE_TEMPLATE, Math.min(...lines), Math.max(...lines)));
  }
}
for (const [file, exp] of [
  [EDITORIAL, "kits"],
  [EXP_PAGES, "extraKits"],
]) {
  for (const [slug, [s, e]] of Object.entries(rangesInExport(file, exp))) {
    setPath(`/kits/${slug}`, blameDate(file, s, e));
  }
}
for (const [file, exp] of [
  [PRODUCTS, "categories"],
  [EXP_CATALOG, "extraCategories"],
]) {
  for (const [slug, [s, e]] of Object.entries(rangesInExport(file, exp))) {
    setPath(`/gear/${slug}`, blameDate(file, s, e));
  }
}
for (const [file, exp] of [
  [PRODUCTS, "products"],
  [EXP_CATALOG, "extraProducts"],
]) {
  for (const [slug, [s, e]] of Object.entries(rangesInExport(file, exp))) {
    setPath(`/products/${slug}`, blameDate(file, s, e));
  }
}

// Product guide files (full reviews) override / add page-specific dates
const guideDir = "src/data/product-guides";
for (const name of readdirSync(guideDir)) {
  if (!name.endsWith(".ts") || name === "types.ts" || name === "index.ts") continue;
  const file = join(guideDir, name);
  for (const [slug, [s, e]] of Object.entries(entryRanges(file))) {
    setPath(`/products/${slug}`, blameDate(file, s, e), fileDate(file));
  }
}

// Hubs and core routes
setPath("/best", fileDate("src/routes/best/index.tsx"));
setPath("/guides", fileDate("src/routes/guides/index.tsx"));
setPath("/learn", fileDate("src/routes/learn/index.tsx"));
setPath("/compare", fileDate("src/routes/compare/index.tsx"), fileDate("src/routes/compare/$slug.tsx"));
setPath("/gear", fileDate("src/routes/gear/index.tsx"));
setPath("/kits", fileDate("src/routes/kits/index.tsx"));
setPath("/", fileDate("src/routes/index.tsx"));
setPath("/library", fileDate("src/routes/library.tsx"));
setPath("/browse", fileDate("src/routes/browse.tsx"));
setPath("/about", fileDate("src/routes/about.tsx"));
setPath("/editorial", fileDate("src/routes/editorial.tsx"));
setPath("/disclosure", fileDate("src/routes/disclosure.tsx"));
setPath("/privacy", fileDate("src/routes/privacy.tsx"));
setPath("/contact", fileDate("src/routes/contact.tsx"));
setPath("/sitemap", fileDate("src/routes/sitemap.tsx"));


// Keep noindex product stubs out of the lastmod map (they stay out of the sitemap too).
const indexedSrc = readFileSync("src/data/indexed-products.ts", "utf8");
const indexed = new Set(
  [...indexedSrc.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]).filter((s) => s !== "string")
);
for (const key of Object.keys(map)) {
  const m = key.match(/^\/products\/(.+)$/);
  if (m && !indexed.has(m[1])) delete map[key];
}

const entries = Object.keys(map)
  .sort()
  .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(map[k])},`)
  .join("\n");

writeFileSync(
  "src/data/last-updated.ts",
  `// Generated by scripts/gen-last-updated.mjs from git history. Do not edit by hand.
export const lastUpdated: Record<string, string> = {
${entries}
};

/** ISO date (YYYY-MM-DD, Europe/London) the page at this path last changed, if known. */
export function lastUpdatedFor(path: string): string | undefined {
  return lastUpdated[path];
}
`
);
console.log(`wrote ${Object.keys(map).length} dates to src/data/last-updated.ts`);
