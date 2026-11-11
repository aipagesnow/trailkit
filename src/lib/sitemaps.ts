import { categories, compares, guides, kits, notes, products, roundups } from "@/data";
import { absoluteUrl } from "@/lib/affiliate";
import { isIndexedProduct } from "@/data/indexed-products";

const XML_HEADERS = {
  "content-type": "application/xml; charset=utf-8",
} as const;

/** Core / legal / browse hubs that are not section templates. */
export const CORE_PATHS = [
  "/",
  "/library",
  "/browse",
  "/about",
  "/editorial",
  "/disclosure",
  "/privacy",
  "/contact",
  "/sitemap",
] as const;

export function bestPaths(): string[] {
  return ["/best", ...roundups.map((r) => `/best/${r.slug}`)];
}

export function guidesPaths(): string[] {
  return [
    "/guides",
    ...guides.map((g) => `/guides/${g.slug}`),
    "/learn",
    ...notes.map((n) => `/learn/${n.slug}`),
  ];
}

export function comparePaths(): string[] {
  return ["/compare", ...compares.map((c) => `/compare/${c.slug}`)];
}

export function productsPaths(): string[] {
  return [
    "/gear",
    ...categories.map((c) => `/gear/${c.slug}`),
    "/kits",
    ...kits.map((k) => `/kits/${k.slug}`),
    ...products.filter((p) => isIndexedProduct(p.slug)).map((p) => `/products/${p.slug}`),
  ];
}

export function corePaths(): string[] {
  return [...CORE_PATHS];
}

/** All indexable paths — must match the previous single sitemap exactly. */
export function allPaths(): string[] {
  return [
    ...corePaths(),
    ...bestPaths(),
    ...guidesPaths(),
    ...comparePaths(),
    ...productsPaths(),
  ];
}

export function urlsetXml(paths: string[]): string {
  const urls = paths
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function sitemapIndexXml(childPaths: string[]): string {
  const entries = childPaths
    .map((path) => `  <sitemap><loc>${absoluteUrl(path)}</loc></sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
}

export function xmlResponse(body: string): Response {
  return new Response(body, { headers: XML_HEADERS });
}

/** Child sitemap paths listed from the index (order stable for GSC). */
export const CHILD_SITEMAP_PATHS = [
  "/sitemap-best.xml",
  "/sitemap-guides.xml",
  "/sitemap-compare.xml",
  "/sitemap-products.xml",
  "/sitemap-core.xml",
] as const;

export type SitemapLink = { href: string; label: string };
export type SitemapGroup = { heading: string; links: SitemapLink[] };

const LABELS: Record<string, string> = {
  "/": "Home",
  "/library": "Full library",
  "/browse": "All gear",
  "/about": "About",
  "/editorial": "Editorial standards",
  "/disclosure": "Affiliate disclosure",
  "/privacy": "Privacy",
  "/contact": "Contact",
  "/sitemap": "All pages",
  "/best": "Roundups",
  "/guides": "Guides",
  "/learn": "Field notes",
  "/compare": "Compare",
  "/gear": "Categories",
  "/kits": "Kits",
};

function labelFor(path: string): string {
  if (LABELS[path]) return LABELS[path];
  const best = path.match(/^\/best\/(.+)$/);
  if (best) {
    const found = roundups.find((item) => item.slug === best[1]);
    if (found) return found.h1 || found.title;
  }
  const guide = path.match(/^\/guides\/(.+)$/);
  if (guide) {
    const found = guides.find((item) => item.slug === guide[1]);
    if (found) return found.h1 || found.title;
  }
  const note = path.match(/^\/learn\/(.+)$/);
  if (note) {
    const found = notes.find((item) => item.slug === note[1]);
    if (found) return found.h1 || found.title;
  }
  const compare = path.match(/^\/compare\/(.+)$/);
  if (compare) {
    const found = compares.find((item) => item.slug === compare[1]);
    if (found) return found.h1 || found.title;
  }
  const kit = path.match(/^\/kits\/(.+)$/);
  if (kit) {
    const found = kits.find((item) => item.slug === kit[1]);
    if (found) return found.name;
  }
  const cat = path.match(/^\/gear\/(.+)$/);
  if (cat) {
    const found = categories.find((item) => item.slug === cat[1]);
    if (found) return found.name;
  }
  const product = path.match(/^\/products\/(.+)$/);
  if (product) {
    const found = products.find((item) => item.slug === product[1]);
    if (found) return found.name;
  }
  return path;
}

function linksFor(paths: string[]): SitemapLink[] {
  return paths.map((href) => ({ href, label: labelFor(href) }));
}

/** Grouped indexable pages for the HTML sitemap. Noindex product stubs are omitted. */
export function htmlSitemapGroups(): SitemapGroup[] {
  return [
    { heading: "Roundups", links: linksFor(bestPaths()) },
    { heading: "Guides and field notes", links: linksFor(guidesPaths()) },
    { heading: "Comparisons", links: linksFor(comparePaths()) },
    { heading: "Gear and kits", links: linksFor(productsPaths()) },
    { heading: "This site", links: linksFor(corePaths()) },
  ];
}
