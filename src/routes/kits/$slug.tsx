import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { getKit, getProduct } from "@/data";
import { Crumbs, Disclosure, JsonLd, ProductSection } from "@/components/site/blocks";
import { HowWePick, Thumb, kitChips } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";

export const Route = createFileRoute("/kits/$slug")({
  loader: ({ params }) => {
    const kit = getKit(params.slug);
    if (!kit) throw notFound();
    return kit;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData ? `${loaderData.name} kit` : "Kit",
      description: loaderData?.description ?? "",
      path: `/kits/${params.slug}`,
    }),
  component: KitPage,
});

function KitPage() {
  const kit = Route.useLoaderData();
  const picks = kit.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Kits", path: "/kits" }, { name: kit.name }])]} />
      <Crumbs items={[{ href: "/kits", label: "Kits" }, { label: kit.name }]} />
      <div className="relative aspect-video overflow-hidden border border-line">
        <TkImage route={`/kits/${kit.slug}`} priority fill sizes="(min-width: 768px) 48rem, 100vw" tone="money" />
      </div>
      <h1 className="text-4xl">{kit.name}</h1>
      <p className="text-lg text-muted">{kit.description}</p>
      <p><span className="font-bold">Who it is for. </span>{kit.forWhom}</p>
      <div className="flex flex-wrap gap-2">
        {kitChips(kit).map((chip) => (
          <span key={chip} className="border border-ink px-2 py-1 font-mono text-[11px]">{chip}</span>
        ))}
      </div>
      <ul className="list-disc space-y-1 pl-5">{kit.notes.map((n) => <li key={n}>{n}</li>)}</ul>
      <Disclosure />
      <HowWePick />
      <section>
        <h2 className="text-3xl">Packing list</h2>
        <ul className="mt-3 divide-y divide-line border border-line">
          {picks.map((pick) => (
            <li key={pick.slug} className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 px-3 py-2">
              <Thumb route={`/products/${pick.slug}`} tone="money" />
              <span className="min-w-0">
                <a href={`/products/${pick.slug}`} className="block font-bold break-words">{pick.name}</a>
                <span className="block font-mono text-[11px] text-muted uppercase">{pick.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} tone="money" />)}
    </main>
  );
}
