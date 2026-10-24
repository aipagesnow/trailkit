import { asinFor } from "@/data/asins";

export const BRAND = "Trailkit Outdoor";
export const UPDATED = "October 5, 2026";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.trailkitoutdoor.com").replace(/\/$/, "");

/** Single source of truth. Set AMAZON_ASSOCIATE_TAG or VITE_AMAZON_ASSOCIATE_TAG.
 *  Vite inlines VITE_* into the client bundle, so tags survive hydration (unlike
 *  Next server-only AMAZON_ASSOCIATE_TAG). Fallback keeps clicks paid if env is missing. */
export function amazonTag() {
  const tag = (
    import.meta.env.VITE_AMAZON_ASSOCIATE_TAG ||
    import.meta.env.AMAZON_ASSOCIATE_TAG ||
    "trailkit-20"
  ).trim();
  if (!tag || tag === "your-tag-20" || tag === "yourtag-20") {
    return "trailkit-20";
  }
  return tag;
}

export const DISCLOSURE_SHORT =
  "As an Amazon Associate, Trailkit Outdoor earns from qualifying purchases.";

export const DISCLOSURE =
  "Trailkit Outdoor is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate we earn from qualifying purchases. Prices and availability change. We do not publish a live price.";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** ASIN deep link only. Returns null when the listing is not verified — never a search URL. */
export function amazonUrl(slug: string) {
  const asin = asinFor(slug);
  if (!asin) return null;
  const tag = amazonTag();
  // Never emit an untagged dp link — unpaid clicks.
  return `https://www.amazon.com/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}

export function pageTitle(title: string) {
  return title.includes(BRAND) ? title : `${title} | ${BRAND}`;
}
