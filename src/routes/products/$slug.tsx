import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { getCategory, getProduct, pagesMentioning, productsIn } from "@/data";
import { AmazonButton, Crumbs, Disclosure, Related } from "@/components/site/blocks";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData ? `${loaderData.name} review notes` : "Gear") },
      { name: "description", content: loaderData?.summary ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const category = getCategory(product.category);
  const alts = productsIn(product.category).filter((p) => p.slug !== product.slug).slice(0, 4);
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Crumbs items={[{ href: `/gear/${product.category}`, label: category?.name ?? "Gear" }, { label: product.name }]} />
      <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{product.role}</p>
      <h1 className="text-4xl">{product.name}</h1>
      <p className="text-muted">{product.brand} · {product.priceBand} · {product.weight}</p>
      <p className="text-lg">{product.summary}</p>
      <Disclosure />
      <p>{product.body}</p>
      <p><span className="font-bold">Who should buy it. </span>{product.who}</p>
      <p><span className="font-bold">Best for. </span>{product.bestFor}</p>
      <p><span className="font-bold">Standout limitation. </span>{product.limit}</p>
      <section>
        <h2 className="text-3xl">Specs</h2>
        <dl className="mt-3 divide-y divide-line rounded-lg border border-line bg-card">
          {product.specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-2 gap-2 px-3 py-2 text-sm">
              <dt className="font-bold">{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-card p-4">
          <h2 className="text-xl text-forest">Pros</h2>
          <ul className="mt-2 list-disc pl-5">{product.pros.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className="rounded-lg border border-line bg-card p-4">
          <h2 className="text-xl text-amber-deep">Cons</h2>
          <ul className="mt-2 list-disc pl-5">{product.cons.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
      <AmazonButton query={product.query} label={`Check current price: ${product.name}`} />
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
