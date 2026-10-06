import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, getProduct, pagesMentioning, productsIn, roundups } from "@/data";
import type { Product } from "@/data/types";
import { asinFor } from "@/data/asins";
import { AmazonButton, Crumbs, Disclosure, JsonLd, Related, StickyAmazon } from "@/components/site/blocks";
import { GearCard } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData ? `${loaderData.name} — quick notes` : "Gear",
      description: loaderData?.summary ?? "",
      path: `/products/${params.slug}`,
    }),
  component: ProductPage,
});

function alsoIn(product: Product) {
  const category = productsIn(product.category);
  const seen = new Set<string>([product.slug]);
  const picked: Product[] = [];
  const take = (slug: string) => {
    if (picked.length >= 4 || seen.has(slug)) return;
    const other = category.find((item) => item.slug === slug);
    if (!other) return;
    seen.add(slug);
    picked.push(other);
  };
  for (const roundup of roundups) {
    if (!roundup.productSlugs.includes(product.slug)) continue;
    const start = roundup.productSlugs.indexOf(product.slug);
    for (let step = 1; step < roundup.productSlugs.length; step++) {
      take(roundup.productSlugs[(start + step) % roundup.productSlugs.length] ?? "");
    }
  }
  const index = category.findIndex((item) => item.slug === product.slug);
  if (index >= 0) {
    for (let step = 1; step < category.length; step++) take(category[(index + step) % category.length]?.slug ?? "");
  }
  return picked;
}

function ProductPage() {
  const product = Route.useLoaderData();
  const category = getCategory(product.category);
  const alts = alsoIn(product);
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: category?.name ?? "Gear", path: `/gear/${product.category}` },
            { name: product.name },
          ]),
          {
            "@type": "Product",
            name: product.name,
            brand: { "@type": "Brand", name: product.brand },
            description: product.summary,
            category: category?.name,
          },
        ]}
      />
      <Crumbs items={[{ href: `/gear/${product.category}`, label: category?.name ?? "Gear" }, { label: product.name }]} />
      <p className="font-display text-xs tracking-widest uppercase">{product.role}</p>
      <h1 className="text-4xl">{product.name}</h1>
      <p className="font-mono text-sm text-muted">{product.brand} · {product.priceBand} · {product.weight}</p>
      <p className="text-lg">{product.summary}</p>
      <Disclosure />
      {asinFor(product.slug) ? <AmazonButton product={product} /> : null}
      <p>{product.body}</p>
      <p><span className="font-bold">Who should buy it. </span>{product.who}</p>
      <p><span className="font-bold">Best for. </span>{product.bestFor}</p>
      <p><span className="font-bold">Standout limitation. </span>{product.limit}</p>
      <section className="grid items-start gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border border-line">
          <TkImage route={`/products/${product.slug}`} priority fill sizes="(min-width: 768px) 40vw, 100vw" tone="money" />
        </div>
        <div>
        <h2 className="text-3xl">Specs</h2>
        <dl className="mt-3 divide-y divide-line border border-line">
          {product.specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-2 gap-2 bg-spec px-3 py-2 text-sm odd:bg-paper">
              <dt className="min-w-0 break-words font-bold">{spec.label}</dt>
              <dd className="min-w-0 font-mono text-xs break-words">{spec.value}</dd>
            </div>
          ))}
        </dl>
        </div>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-line p-4">
          <h2 className="text-xl">Pros</h2>
          <ul className="mt-2 list-disc pl-5">{product.pros.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className="border border-line p-4">
          <h2 className="text-xl">Cons</h2>
          <ul className="mt-2 list-disc pl-5">{product.cons.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
      <AmazonButton product={product} onProductPage />
      <section>
        <h2 className="text-3xl">Also in {category?.name ?? "this category"}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {alts.map((p) => (
            <GearCard key={p.slug} product={p} mini />
          ))}
        </div>
      </section>
      <Related links={pagesMentioning(product.slug)} />
      <StickyAmazon slugs={[product.slug]} kind="product" />
    </main>
  );
}
