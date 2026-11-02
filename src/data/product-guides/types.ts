export type GuideBlock = {
  id: string;
  heading: string;
  /** Paragraphs may contain inline links written as [label](/path) or [label](https://...). */
  paragraphs: string[];
  bullets?: string[];
};

export type ProductGuide = {
  slug: string;
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
