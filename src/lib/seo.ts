import { absoluteUrl, pageTitle } from "@/lib/affiliate";

const HERO: Record<string, string> = {
  "backpacking-tents": "/images/best-tents-hero.jpg",
  "hiking-boots-wide-feet": "/images/best-wide-boots.jpg",
  "rain-jackets-under-150": "/images/best-rain-under-150.jpg",
  "first-overnight": "/images/guides-first-overnight.jpg",
  "osprey-vs-gregory": "/images/compare-osprey-gregory.jpg",
};

export function heroSrc(slug?: string) {
  if (!slug) return undefined;
  return HERO[slug];
}

export function pageHead(opts: { title: string; description: string; path: string; image?: string }) {
  const title = pageTitle(opts.title);
  const image = absoluteUrl(opts.image ?? "/images/og-default.jpg");
  const url = absoluteUrl(opts.path);
  const meta: { title?: string; name?: string; property?: string; content?: string }[] = [
    { title },
    { name: "description", content: opts.description },
    { property: "og:title", content: title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];
  const gsc = import.meta.env.VITE_GSC_VERIFICATION;
  if (gsc) meta.push({ name: "google-site-verification", content: gsc });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function breadcrumbLd(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}
