import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, getProduct, pagesMentioning, productsIn } from "@/data";
import { AmazonButton, Crumbs, Disclosure, JsonLd, Related } from "@/components/site/blocks";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData ? `${loaderData.name} review notes` : "Gear",
      description: loaderData?.summary ?? "",
      path: `/products/${params.slug}`,
    }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const category = getCategory(product.category);
  const alts = productsIn(product.category).filter((p) => p.slug !== product.slug).slice(0, 4);
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
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
      <p>{product.body}</p>
      <p><span className="font-bold">Who should buy it. </span>{product.who}</p>
      <p><span className="font-bold">Best for. </span>{product.bestFor}</p>
      <p><span className="font-bold">Standout limitation. </span>{product.limit}</p>
      <section>
        <h2 className="text-3xl">Specs</h2>
        <dl className="mt-3 divide-y divide-line border border-line">
          {product.specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-2 gap-2 bg-spec px-3 py-2 text-sm odd:bg-paper">
              <dt className="font-bold">{spec.label}</dt>
              <dd className="font-mono text-xs">{spec.value}</dd>
            </div>
          ))}
        </dl>
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
      <AmazonButton product={product} />
      <section>
        <h2 className="text-3xl">Also in {category?.short}</h2>
        <ul className="mt-2 space-y-2">
          {alts.map((p) => (
            <li key={p.slug}><a href={`/products/${p.slug}`} className="font-bold text-forest">{p.name}</a> <span className="text-sm text-muted">· {p.role}</span></li>
          ))}
        </ul>
      </section>
      <Related links={pagesMentioning(product.slug)} />
    </main>
  );
}
