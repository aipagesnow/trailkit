export type Spec = { label: string; value: string };

export type Category = {
  slug: string;
  name: string;
  short: string;
  lede: string;
  intro: string[];
  choose: string[];
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  query: string;
  priceBand: string;
  weight: string;
  bestFor: string;
  limit: string;
  role: string;
  summary: string;
  body: string;
  who: string;
  pros: string[];
  cons: string[];
  specs: Spec[];
  tags: string[];
};

export type Faq = { q: string; a: string };

export type QuickTable = {
  caption: string;
  lead?: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type Roundup = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  category: string;
  answer: string;
  /** Factual aside rendered under the direct answer. Not part of the home-card excerpt. */
  note?: string;
  quick?: QuickTable;
  who: string;
  productSlugs: string[];
  one: string;
  faqs: Faq[];
  related: string[];
  method: string;
};

export type GuideSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  answer: string;
  quick?: QuickTable;
  sections: GuideSection[];
  productSlugs: string[];
  faqs: Faq[];
  related: string[];
};

export type Compare = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  answer: string;
  left: string;
  right: string;
  rows: { label: string; left: string; right: string }[];
  verdict: string;
  faqs: Faq[];
  related: string[];
};

export type Kit = {
  slug: string;
  name: string;
  description: string;
  forWhom: string;
  productSlugs: string[];
  notes: string[];
};
