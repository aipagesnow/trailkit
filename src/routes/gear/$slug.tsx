import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { getCategory, guides, productsIn, roundups } from "@/data";
import { Crumbs, JsonLd } from "@/components/site/blocks";
import { FieldCard, GearCard, GuideCard } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";

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
  const relatedGuides = guides.filter((g) => g.productSlugs.some((slug) => gear.some((p) => p.slug === slug))).slice(0, 4);
  return (
    <main>
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Categories", path: "/gear" }, { name: category.name }])]} />
      <section className="relative isolate min-h-64 overflow-hidden border-b border-line md:min-h-[300px]">
        <TkImage route={`/gear/${category.slug}`} priority fill sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 text-on-forest md:py-14">
          <Crumbs items={[{ href: "/gear", label: "Categories" }, { label: category.name }]} />
          <p className="mt-4 font-mono text-[11px] tracking-widest uppercase">{category.short}</p>
          <h1 className="mt-2 max-w-3xl text-4xl text-on-forest md:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lg">{category.lede}</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {category.intro.map((p) => <p key={p} className="max-w-3xl">{p}</p>)}
        <section>
          <h2 className="text-3xl">How to choose</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">{category.choose.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
        {lists.length ? (
          <section>
            <h2 className="text-3xl">Roundups</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {lists.map((roundup, i) => (
                <FieldCard key={roundup.slug} roundup={roundup} index={`R-${String(i + 1).padStart(2, "0")}`} />
              ))}
            </div>
          </section>
        ) : null}
        <section>
          <h2 className="text-3xl">Gear in this category</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {gear.map((product) => (
              <GearCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
        {relatedGuides.length ? (
          <section>
            <h2 className="text-3xl">Related guides</h2>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {relatedGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
