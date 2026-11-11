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
 *
 * Re-shown 2 Nov 2026, batch 1 (rebuilt guides passed Jude + Ellis review):
 * baltoro-65, copper-spur-ul2, atmos-ag-65, dragonfly-osmo-2, talon-22, magma-15.
 * Re-shown 2 Nov 2026, batch 2 (Chris-approved, brought forward from 3 Nov):
 * targhee-iv (thickened first), coleman-2burner, eno-doublenest,
 * trestles-eco-30 (fourth source added), half-dome-2-plus, blackbird-xlc.
 * Added 11 Nov 2026 (REVIEW-ADD, Chris-approved): nemo-disco-15, rebuilt as a full
 * side-sleeper review guide (same URL, previously noindex quick notes).
 */
export const INDEXED_PRODUCTS: ReadonlySet<string> = new Set<string>([
  "baltoro-65",
  "copper-spur-ul2",
  "atmos-ag-65",
  "dragonfly-osmo-2",
  "talon-22",
  "magma-15",
  "targhee-iv",
  "coleman-2burner",
  "eno-doublenest",
  "trestles-eco-30",
  "half-dome-2-plus",
  "blackbird-xlc",
  "nemo-disco-15",
]);

export function isIndexedProduct(slug: string) {
  return INDEXED_PRODUCTS.has(slug);
}
