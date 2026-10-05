import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { getCategory, productsIn, roundups } from "@/data";
import { CardGrid, Crumbs, JsonLd } from "@/components/site/blocks";

export const Route = createFileRoute("/gear/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return category;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData?.name ?? "Category",
      description: loaderData?.lede ?? "Trailkit gear category.",
      path: `/gear/${params.slug}`,
    }),
  component: CategoryPage,
});

function CategoryPage() {
  const category = Route.useLoaderData();
  const gear = productsIn(category.slug);
  const lists = roundups.filter((r) => r.productSlugs.some((slug) => gear.some((p) => p.slug === slug)));
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/gear" },
            { name: category.name },
          ]),
        ]}
      />
      <Crumbs items={[{ href: "/gear", label: "Categories" }, { label: category.name }]} />
      <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{category.short}</p>
      <h1 className="text-4xl">{category.name}</h1>
      <p className="max-w-3xl text-lg text-muted">{category.lede}</p>
      {category.intro.map((p) => <p key={p} className="max-w-3xl">{p}</p>)}
      <section>
        <h2 className="text-3xl">How to choose</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">{category.choose.map((c) => <li key={c}>{c}</li>)}</ul>
      </section>
      <section>
        <h2 className="text-3xl">Roundups</h2>
        <div className="mt-3">
          <CardGrid items={lists.map((r) => ({ href: `/best/${r.slug}`, title: r.h1, text: r.description, kicker: "Roundup" }))} />
        </div>
      </section>
      <section>
        <h2 className="text-3xl">Gear in this category</h2>
        <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-card">
          {gear.map((p) => (
            <li key={p.slug} className="p-4">
              <Link to="/products/$slug" params={{ slug: p.slug }} className="font-serif text-xl text-ink">{p.name}</Link>
              <p className="text-sm text-amber-deep">{p.role}</p>
              <p className="mt-1 text-sm text-muted">{p.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
