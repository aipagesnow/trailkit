import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, getProduct, pagesMentioning, productsIn, roundups } from "@/data";
import type { Product } from "@/data/types";
import { asinFor } from "@/data/asins";
import { AmazonButton, Crumbs, Disclosure, JsonLd, Related, StickyAmazon } from "@/components/site/blocks";
import { GearCard } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { isIndexedProduct } from "@/data/indexed-products";
import { guideFor } from "@/data/product-guides";
import type { ProductGuide } from "@/data/product-guides/types";
import { RichText } from "@/components/site/rich-text";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData ? guideFor(params.slug)?.title ?? productTitle(loaderData.name, Boolean(guideFor(params.slug))) : "Gear",
      description: guideFor(params.slug)?.description ?? loaderData?.summary ?? "",
      path: `/products/${params.slug}`,
      noindex: !isIndexedProduct(params.slug),
    }),
  component: ProductPage,
});

// Guide pages: "[Product] review: who it suits, trade-offs", shortened when the full title would pass ~70 chars.
function productTitle(name: string, isGuide: boolean) {
  if (!isGuide) return `${name} — quick notes`;
  const full = `${name} review: who it suits, trade-offs`;
  return full.length + " | Trailkit Outdoor".length <= 70 ? full : `${name} review: who it suits`;
}

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
  const home = roundups.find((r) => r.productSlugs.includes(product.slug));
  const guide = guideFor(product.slug);
  if (guide) return <GuidePage product={product} guide={guide} alts={alts} homeSlug={home?.slug} homeH1={home?.h1} categoryName={category?.name} />;
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: category?.name ?? "Gear", path: `/gear/${product.category}` },
            { name: product.name },
          ]),
        ]}
      />
      <Crumbs items={[{ href: `/gear/${product.category}`, label: category?.name ?? "Gear" }, { label: product.name }]} />
      <p className="font-display text-xs tracking-widest uppercase">{product.role}</p>
      <h1 className="text-4xl">{product.name}</h1>
      <p className="font-mono text-sm text-muted">{product.brand} · {product.priceBand} · {product.weight}</p>
      <p className="text-lg">{product.summary}</p>
      {home ? (
        <p className="border border-line bg-spec p-3 text-sm">
          You'll get the most out of this one side by side with its rivals in{" "}
          <a href={`/best/${home.slug}#${product.slug}`} className="font-bold underline">{home.h1}</a>.
        </p>
      ) : null}
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

function GuidePage({
  product,
  guide,
  alts,
  homeSlug,
  homeH1,
  categoryName,
}: {
  product: Product;
  guide: ProductGuide;
  alts: Product[];
  homeSlug?: string;
  homeH1?: string;
  categoryName?: string;
}) {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: categoryName ?? "Gear", path: `/gear/${product.category}` },
            { name: product.name },
          ]),
        ]}
      />
      <Crumbs items={[{ href: `/gear/${product.category}`, label: categoryName ?? "Gear" }, { label: product.name }]} />
      <p className="font-display text-xs tracking-widest uppercase">{product.role}</p>
      <h1 className="text-4xl">{guide.h1 ?? product.name}</h1>
      <p className="text-lg"><RichText text={guide.answer} /></p>
      <Disclosure />
      {asinFor(product.slug) ? <AmazonButton product={product} /> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-line p-4">
          <h2 className="text-xl">Who it suits</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">{guide.suits.map((p) => <li key={p}><RichText text={p} /></li>)}</ul>
        </div>
        <div className="border border-line p-4">
          <h2 className="text-xl">Who should skip it</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">{guide.skip.map((p) => <li key={p}><RichText text={p} /></li>)}</ul>
        </div>
      </div>
      <section id="specs">
        <h2 className="text-3xl">The specs that matter</h2>
        <dl className="mt-3 divide-y divide-line border border-line">
          {guide.keySpecs.map((spec) => (
            <div key={spec.label} className="grid gap-1 bg-spec px-3 py-2 text-sm odd:bg-paper sm:grid-cols-[10rem_1fr]">
              <dt className="font-bold">{spec.label}</dt>
              <dd className="min-w-0 break-words">
                <span className="font-mono text-xs">{spec.value}</span>
                <span className="block"><RichText text={spec.plain} /></span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="relative aspect-[4/3] overflow-hidden border border-line">
        <TkImage route={`/products/${product.slug}`} priority fill sizes="(min-width: 768px) 48rem, 100vw" tone="money" />
      </div>
      {guide.sections.map((sec) => (
        <section key={sec.id} id={sec.id} className="space-y-3">
          <h2 className="text-3xl">{sec.heading}</h2>
          {sec.paragraphs.map((para, i) => <p key={i}><RichText text={para} /></p>)}
          {sec.bullets?.length ? (
            <ul className="list-disc space-y-1 pl-5">{sec.bullets.map((b) => <li key={b}><RichText text={b} /></li>)}</ul>
          ) : null}
        </section>
      ))}
      <section id="alternatives" className="space-y-3">
        <h2 className="text-3xl">Alternatives worth a look</h2>
        <ul className="space-y-2">
          {guide.alternatives.map((a) => (
            <li key={a.href} className="border border-line p-3">
              <a href={a.href} className="font-bold underline">{a.label}</a>
              <span className="block text-sm"><RichText text={a.why} /></span>
            </li>
          ))}
        </ul>
        {homeSlug ? (
          <p className="text-sm">
            Side by side with its rivals: <a href={`/best/${homeSlug}#${product.slug}`} className="font-bold underline">{homeH1}</a>.
          </p>
        ) : null}
      </section>
      <AmazonButton product={product} onProductPage />
      <section id="faq" className="space-y-3">
        <h2 className="text-3xl">FAQ</h2>
        {guide.faqs.map((f) => (
          <div key={f.q}>
            <h3 className="text-xl">{f.q}</h3>
            <p><RichText text={f.a} /></p>
          </div>
        ))}
      </section>
      <section className="border border-line bg-spec p-3 text-sm">
        <h2 className="text-base font-bold">Sources</h2>
        <p className="text-muted">Specs come from the maker; owner feedback comes from the reviews and forums below. We haven't tested this product ourselves.</p>
        <ul className="mt-2 list-disc pl-5">
          {guide.sources.map((s) => (
            <li key={s.url}><a href={s.url} className="underline" rel="noopener noreferrer nofollow" target="_blank">{s.label}</a></li>
          ))}
        </ul>
      </section>
      {alts.length ? (
        <section>
          <h2 className="text-3xl">Also in {categoryName ?? "this category"}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {alts.map((p) => <GearCard key={p.slug} product={p} mini />)}
          </div>
        </section>
      ) : null}
      <Related links={pagesMentioning(product.slug)} />
      <StickyAmazon slugs={[product.slug]} kind="product" />
    </main>
  );
}
