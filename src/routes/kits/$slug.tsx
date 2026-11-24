import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { getKit, getProduct, linksFor } from "@/data";
import { Crumbs, Disclosure, EarlyListingCta, FaqList, JsonLd, ProductSection, Related, StickyAmazon } from "@/components/site/blocks";
import { FOOTWEAR_SLUGS, HowWePick, Thumb, kitChips } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";
import { IllustrativeCaption } from "@/components/site/illustrative-caption";
import { imageFor } from "@/data/images";

export const Route = createFileRoute("/kits/$slug")({
  loader: ({ params }) => {
    const kit = getKit(params.slug);
    if (!kit) throw notFound();
    return kit;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData
        ? loaderData.seoTitle ?? (/\bkit$/i.test(loaderData.name) ? loaderData.name : `${loaderData.name} kit`)
        : "Kit",
      description: loaderData?.seoDescription ?? loaderData?.description ?? "",
      path: `/kits/${params.slug}`,
    }),
  component: KitPage,
});

function KitPage() {
  const kit = Route.useLoaderData();
  const picks = kit.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  const gearRows = (kit.gearList ?? [])
    .map((row) => ({ row, product: getProduct(row.productSlug) }))
    .filter((r) => r.product != null);
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Kits", path: "/kits" }, { name: kit.name }])]} />
      <Crumbs items={[{ href: "/kits", label: "Kits" }, { label: kit.name }]} />
      {imageFor(`/kits/${kit.slug}`)?.ready ? (
        <figure className="m-0">
          <div className="relative aspect-video overflow-hidden border border-line">
            <TkImage route={`/kits/${kit.slug}`} priority fill sizes="(min-width: 768px) 48rem, 100vw" tone="money" />
          </div>
          <IllustrativeCaption />
        </figure>
      ) : null}
      <h1 className="text-4xl">{kit.h1 ?? kit.name}</h1>
      <p className="text-lg text-muted">{kit.description}</p>
      {kit.answer ? <div className="border-l-4 border-ink bg-spec p-4">{kit.answer}</div> : null}
      <p><span className="font-bold">Who it is for. </span>{kit.forWhom}</p>
      <div className="flex flex-wrap gap-2">
        {kitChips(kit).map((chip) => (
          <span key={chip} className="border border-ink px-2 py-1 font-mono text-[11px]">{chip}</span>
        ))}
      </div>
      <ul className="list-disc space-y-1 pl-5">{kit.notes.map((n) => <li key={n}>{n}</li>)}</ul>
      <Disclosure />
      <HowWePick limits={FOOTWEAR_SLUGS.has(kit.slug) ? "Each pick is matched to a real limit on your trip: budget, weight, weather, foot width, or trip length." : undefined} />
      {gearRows.length ? (
        <section id="gear-list">
          <h2 className="text-3xl">The gear list at a glance</h2>
          <ul className="mt-3 divide-y divide-line border border-line">
            {gearRows.map(({ row, product }) => (
              <li key={row.productSlug} className="grid gap-1 px-3 py-3 md:grid-cols-[8.5rem_minmax(0,1fr)_10rem] md:gap-4">
                <span className="font-mono text-[11px] tracking-widest uppercase md:pt-1">{row.job}</span>
                <span className="min-w-0">
                  <a href={`#${row.productSlug}`} className="font-bold break-words text-forest underline">{product!.name}</a>
                  <span className="mt-1 block text-sm">{row.why}</span>
                </span>
                <span className="text-sm text-muted md:pt-0.5 md:text-right">{row.weight}</span>
              </li>
            ))}
          </ul>
          {kit.gearListNote ? <p className="mt-2 text-sm text-muted">{kit.gearListNote}</p> : null}
        </section>
      ) : (
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
      )}
      <EarlyListingCta slugs={kit.productSlugs} kind="kit" />
      {(kit.sections ?? []).map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-3xl">{section.heading}</h2>
          {section.paragraphs.map((p) => (
            <p key={p} className="mt-3 max-w-3xl">{p}</p>
          ))}
          {section.bullets ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {kit.sections?.length ? <h2 className="text-3xl">Each piece, in order</h2> : null}
      {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} tone="money" pageSlugs={kit.productSlugs} />)}
      {kit.faqs?.length ? <FaqList faqs={kit.faqs} /> : null}
      {kit.related?.length ? <Related links={linksFor(kit.related)} /> : null}
      <StickyAmazon slugs={kit.productSlugs} kind="kit" />
    </main>
  );
}
