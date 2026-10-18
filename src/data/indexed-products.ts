/**
 * Product quick-notes pages that stay indexed. Every other /products/ page is
 * noindex, follow (still linked for readers) so the roundups carry the topic.
 * These had Search Console impressions in the 90 days to Oct 17, 2026, or are
 * the fuller notes pages. Add a slug here to bring a page back into the index.
 */
export const INDEXED_PRODUCTS: ReadonlySet<string> = new Set([
  "baltoro-65",
  "bindi",
  "blackbird-xlc",
  "camp-clog",
  "coleman-2burner",
  "dragonfly-osmo-2",
  "dutchware-chameleon",
  "eno-doublenest",
  "head-net",
  "trestles-eco-30",
  "wash-bins",
  "copper-spur-ul2",
  "half-dome-2-plus",
  "magma-15",
  "atmos-ag-65",
  "talon-22",
  "targhee-iv",
]);

export function isIndexedProduct(slug: string) {
  return INDEXED_PRODUCTS.has(slug);
}
