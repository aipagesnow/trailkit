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
  /** Default is h2. Use "none" to render under an existing heading (locked pages). */
  heading?: "h2" | "none";
};

export type Roundup = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  category: string;
  answer: string;
  /** One card sentence. The full answer stays on the roundup page. */
  teaser?: string;
  /** Factual aside rendered under the direct answer. Not part of the home-card excerpt. */
  note?: string;
  quick?: QuickTable;
  /** Numeric or published-spec table, usually rendered under Comparison (no new H2). */
  specTable?: QuickTable;
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
  /** Optional search packaging. Cards, crumbs and hubs keep using `name`. */
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  /** Optional short answer block under the H1. */
  answer?: string;
  /** Optional gear-list table: one row per job in the kit. */
  gearList?: KitGearRow[];
  gearListNote?: string;
  sections?: GuideSection[];
  /** Rendered as a plain FAQ list. No FAQPage schema (keeper rule). */
  faqs?: Faq[];
  related?: string[];
};

export type KitGearRow = {
  job: string;
  productSlug: string;
  weight: string;
  why: string;
};
