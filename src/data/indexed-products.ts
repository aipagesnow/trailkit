/**
 * Product quick-notes pages that stay indexed. Every other /products/ page is
 * noindex, follow (still linked for readers) so the roundups carry the topic.
 * These had Search Console impressions in the 90 days to Oct 17, 2026, or are
 * the fuller notes pages. Add a slug here to bring a page back into the index.
 *
 * Demoted 28 Oct 2026 (thin stubs): dutchware-chameleon, head-net, bindi, camp-clog
 * — still live with noindex,follow; not in sitemap.
 * Demoted 1 Nov 2026 (Ellis Crowe risk pass, Chris-approved): all 12 remaining
 * quick-notes pages (baltoro-65 … targhee-iv, incl. coleman-2burner and
 * eno-doublenest). Pages stay live; roundups carry the topics.
 */
export const INDEXED_PRODUCTS: ReadonlySet<string> = new Set<string>([]);

export function isIndexedProduct(slug: string) {
  return INDEXED_PRODUCTS.has(slug);
}
