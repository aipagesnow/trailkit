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
