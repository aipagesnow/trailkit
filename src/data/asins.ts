/**
 * Verified amazon.com ASINs (US). Tag is applied in affiliate.ts from AMAZON_ASSOCIATE_TAG.
 * Unlisted slugs are TODO — do not fall back to /s?k= search URLs or yourtag-20.
 *
 * TODO (no verified listing found this pass — cottage or REI-first, or ASIN not confirmed):
 * copper-spur-ul2, x-mid-2, dragonfly-osmo-2, half-dome-2-plus, lunar-solo,
 * helium, rainier, and the rest of the catalog not in the map below.
 */
export const ASINS: Record<string, string> = {
  "hubba-hubba-2": "B00G7H9CAY",
  "atmos-ag-65": "B09JXQDZG5",
  "baltoro-65": "B09GX9K3R9",
  "targhee-iv": "B0CNHWTRVM",
  "lone-peak": "B0CQVNG7RH",
  precip: "B0CMRX1SY1",
  torrentshell: "B0G631B8BF",
  "xlite-nxt": "B0BKFLTM3T",
  "actik-core": "B09X9PHB9W",
  /** Men's Speedgoat 6 Wide, amazon.com. */
  speedgoat: "B0CP3S2FBZ",
  /** Men's StormLine Stretch rain shell. Listing has been unavailable. */
  stormline: "B0C446S2QQ",
};

export function asinFor(slug: string) {
  return ASINS[slug];
}
