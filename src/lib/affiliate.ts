export const BRAND = "Trailkit";
export const UPDATED = "October 5, 2026";
export const AMAZON_TAG = "yourtag-20";

export const DISCLOSURE =
  "Trailkit is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate we earn from qualifying purchases. Prices and availability change. We do not publish a live price.";

export function amazonUrl(query: string) {
  const params = new URLSearchParams({ k: query, tag: AMAZON_TAG });
  return `https://www.amazon.com/s?${params.toString()}`;
}

export function pageTitle(title: string) {
  return title.includes(BRAND) ? title : `${title} | ${BRAND}`;
}
