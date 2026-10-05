import { categories as baseCategories, products as baseProducts } from "./products";
import { compares as baseCompares, guides as baseGuides, kits as baseKits, roundups as baseRoundups } from "./editorial";
import { extraCategories, extraProducts } from "./expansion/catalog";
import { extraCompares, extraGuides, extraKits, extraRoundups, notes } from "./expansion/pages";
import type { Category, Compare, Guide, Kit, Product, Roundup } from "./types";

export type LinkItem = { href: string; label: string; kind: string };

export const categories: Category[] = [...baseCategories, ...extraCategories];
export const products: Product[] = [...baseProducts, ...extraProducts];
export const roundups: Roundup[] = [...baseRoundups, ...extraRoundups];
export const guides: Guide[] = [...baseGuides, ...extraGuides];
export const compares: Compare[] = [...baseCompares, ...extraCompares];
export const kits: Kit[] = [...baseKits, ...extraKits];
export { notes };

const productBySlug = new Map(products.map((p) => [p.slug, p]));
const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
const roundupBySlug = new Map(roundups.map((r) => [r.slug, r]));
const guideBySlug = new Map(guides.map((g) => [g.slug, g]));
const compareBySlug = new Map(compares.map((c) => [c.slug, c]));
const kitBySlug = new Map(kits.map((k) => [k.slug, k]));
const noteBySlug = new Map(notes.map((n) => [n.slug, n]));

export function getProduct(slug: string) {
  return productBySlug.get(slug);
}
export function getCategory(slug: string) {
  return categoryBySlug.get(slug);
}
export function getRoundup(slug: string) {
  return roundupBySlug.get(slug);
}
export function getGuide(slug: string) {
  return guideBySlug.get(slug);
}
export function getCompare(slug: string) {
  return compareBySlug.get(slug);
}
export function getKit(slug: string) {
  return kitBySlug.get(slug);
}
export function getNote(slug: string) {
  return noteBySlug.get(slug);
}

export function productsIn(category: string) {
  return products.filter((p) => p.category === category);
}

export function resolveLink(slug: string): LinkItem | undefined {
  const roundup = roundupBySlug.get(slug);
  if (roundup) return { href: `/best/${roundup.slug}`, label: roundup.h1, kind: "Roundup" };
  const guide = guideBySlug.get(slug);
  if (guide) return { href: `/guides/${guide.slug}`, label: guide.h1, kind: "Guide" };
  const note = noteBySlug.get(slug);
  if (note) return { href: `/learn/${note.slug}`, label: note.h1, kind: "Field note" };
  const compare = compareBySlug.get(slug);
  if (compare) return { href: `/compare/${compare.slug}`, label: compare.h1, kind: "Comparison" };
  const kit = kitBySlug.get(slug);
  if (kit) return { href: `/kits/${kit.slug}`, label: kit.name, kind: "Kit" };
  const product = productBySlug.get(slug);
  if (product) return { href: `/products/${product.slug}`, label: product.name, kind: "Gear" };
  return undefined;
}

export function linksFor(slugs: string[]) {
  return slugs.map(resolveLink).filter((item): item is LinkItem => Boolean(item));
}

export function roundupsForCategory(slug: string) {
  return roundups.filter((r) => r.category === slug || r.productSlugs.some((p) => getProduct(p)?.category === slug));
}

export function pagesMentioning(productSlug: string) {
  const found: LinkItem[] = [];
  for (const r of roundups) {
    if (r.productSlugs.includes(productSlug)) found.push({ href: `/best/${r.slug}`, label: r.h1, kind: "Roundup" });
  }
  for (const g of guides) {
    if (g.productSlugs.includes(productSlug)) found.push({ href: `/guides/${g.slug}`, label: g.h1, kind: "Guide" });
  }
  for (const n of notes) {
    if (n.productSlugs.includes(productSlug)) found.push({ href: `/learn/${n.slug}`, label: n.h1, kind: "Field note" });
  }
  for (const c of compares) {
    if (c.left === productSlug || c.right === productSlug) found.push({ href: `/compare/${c.slug}`, label: c.h1, kind: "Comparison" });
  }
  for (const k of kits) {
    if (k.productSlugs.includes(productSlug)) found.push({ href: `/kits/${k.slug}`, label: k.name, kind: "Kit" });
  }
  return found;
}

export type SearchHit = { href: string; title: string; kind: string; text: string };

export function searchSite(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];
  const push = (href: string, title: string, kind: string, text: string) => {
    if (`${title} ${text}`.toLowerCase().includes(q)) hits.push({ href, title, kind, text });
  };
  for (const p of products) push(`/products/${p.slug}`, p.name, "Gear", `${p.brand}. ${p.summary}`);
  for (const r of roundups) push(`/best/${r.slug}`, r.h1, "Roundup", r.description);
  for (const g of guides) push(`/guides/${g.slug}`, g.h1, "Guide", g.description);
  for (const n of notes) push(`/learn/${n.slug}`, n.h1, "Field note", n.description);
  for (const c of compares) push(`/compare/${c.slug}`, c.h1, "Comparison", c.description);
  for (const k of kits) push(`/kits/${k.slug}`, k.name, "Kit", k.description);
  for (const cat of categories) push(`/gear/${cat.slug}`, cat.name, "Category", cat.lede);
  return hits.slice(0, 36);
}

export function libraryCount() {
  return {
    products: products.length,
    roundups: roundups.length,
    guides: guides.length,
    compares: compares.length,
    kits: kits.length,
    notes: notes.length,
    categories: categories.length,
    pages:
      products.length +
      roundups.length +
      guides.length +
      compares.length +
      kits.length +
      categories.length +
      notes.length +
      14,
  };
}

export type { Category, Compare, Guide, Kit, Product, Roundup };
