export type GuideBlock = {
  id: string;
  heading: string;
  /** Paragraphs may contain inline links written as [label](/path) or [label](https://...). */
  paragraphs: string[];
  bullets?: string[];
};

export type ProductGuide = {
  slug: string;
  /** Optional search-led overrides (title tag, meta description, visible H1). Fall back to the product name/summary. */
  title?: string;
  description?: string;
  h1?: string;
  /** Optional hero badge for this guide only (product.role still shows on cards). */
  role?: string;
  /** Hide the closing "Side by side with its rivals" link when the alternatives list already links that roundup. */
  hideRivalsLink?: boolean;
  /** Optional "Specs checked {date}" line, same typography as the site Updated lines. */
  specsChecked?: string;
  /** Optional replacement for the default Sources intro sentence. */
  sourcesIntro?: string;
  /** Answer-first opening, shown under the H1. */
  answer: string;
  suits: string[];
  skip: string[];
  keySpecs: { label: string; value: string; plain: string }[];
  sections: GuideBlock[];
  alternatives: { href: string; label: string; why: string }[];
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
};
