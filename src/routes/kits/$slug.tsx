import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { getKit, getProduct } from "@/data";
import { Crumbs, Disclosure, ProductSection } from "@/components/site/blocks";

export const Route = createFileRoute("/kits/$slug")({
  loader: ({ params }) => {
    const kit = getKit(params.slug);
    if (!kit) throw notFound();
    return kit;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData ? `${loaderData.name} kit` : "Kit") },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  component: KitPage,
});

function KitPage() {
  const kit = Route.useLoaderData();
  const picks = kit.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Crumbs items={[{ href: "/kits", label: "Kits" }, { label: kit.name }]} />
      <h1 className="text-4xl">{kit.name}</h1>
      <p className="text-lg text-muted">{kit.description}</p>
      <p><span className="font-bold">Who it is for. </span>{kit.forWhom}</p>
      <ul className="list-disc space-y-1 pl-5">{kit.notes.map((n) => <li key={n}>{n}</li>)}</ul>
      <Disclosure />
      {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} />)}
    </main>
  );
}
