import { createFileRoute, notFound } from "@tanstack/react-router";
import { RichText } from "@/components/site/rich-text";
import { absoluteUrl } from "@/lib/affiliate";
import { getProduct, getRoundup, linksFor } from "@/data";
import { CompareTable, Crumbs, Disclosure, EarlyListingCta, FaqList, JsonLd, PageToc, ProductSection, Related, StickyAmazon, Updated } from "@/components/site/blocks";
import { FOOTWEAR_SLUGS, HowWePick } from "@/components/site/cards";
import { QuickTable } from "@/components/site/quick-table";
import { TkImage } from "@/components/site/tk-image";
import { IllustrativeCaption } from "@/components/site/illustrative-caption";
import { INTENT_PAIRS } from "@/data/hubs";
import { imageFor } from "@/data/images";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/best/$slug")({
  loader: ({ params }) => {
    const page = getRoundup(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData?.title ?? "Roundup",
      description: loaderData?.description ?? "",
      path: `/best/${params.slug}`,
    }),
  component: RoundupPage,
});

function RoundupPage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  const pair = INTENT_PAIRS[page.slug];
  // Headlamps: one price line near the disclosure, and one spec/test note in How we pick.
  const quietPrice = page.slug === "headlamps";
  // One price line under the table, no footer method note: 2 Nov Blair (sleeping bags + rain)
  // plus 16/23 Nov Blair (water-carry, cook-pots, camp-comfort, solo-tents).
  const tableOnlyPrice =
    page.slug === "sleeping-bags" ||
    page.slug === "rain-jackets-under-150" ||
    page.slug === "water-carry" ||
    page.slug === "cook-pots" ||
    page.slug === "camp-comfort" ||
    page.slug === "solo-tents";
  const editedToday = new Set([
    "water-carry",
    "cook-pots",
    "camp-comfort",
    "solo-tents",
    "budget-tents",
    "sleeping-bags",
    "rain-jackets-under-150",
    "first-aid",
    "ultralight-packs",
  ]);
  const notePrices = !quietPrice && !tableOnlyPrice;
  const figures = [
    page.slug === "backpacking-tents" ? "/inline/tents-freestanding-vs-pole" : "",
    page.slug === "backpacking-tents" ? "/inline/tents-vestibule-rain" : "",
    page.slug === "hiking-boots-wide-feet" ? "/inline/boots-toebox-topdown" : "",
    page.slug === "hiking-boots-wide-feet" ? "/inline/boots-lacing-heel" : "",
    page.slug === "rain-jackets-under-150" ? "/inline/rain-pitzip-open" : "",
    page.slug === "rain-jackets-under-150" ? "/inline/rain-hood-brim" : "",
  ].filter((route) => route && imageFor(route)?.ready);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Roundups", path: "/best" },
    { name: page.h1 },
  ];
  return (
    <main className="mx-auto grid w-full min-w-0 max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <PageToc
        links={[
          { href: "#answer", label: "Direct answer" },
          ...(page.quick ? [{ href: "#quick", label: "Quick answer" }] : []),
          { href: "#compare", label: "Comparison" },
          ...picks.map((p) => ({ href: `#${p.slug}`, label: p.name })),
          { href: "#one", label: "If you only buy one" },
        ]}
      />
      <article className="min-w-0 space-y-8">
        <JsonLd
          data={[
            breadcrumbLd(crumbs),
            {
              "@type": "ItemList",
              name: page.h1,
              itemListElement: picks.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.name,
                url: absoluteUrl(`/best/${page.slug}#${p.slug}`),
              })),
            },
          ]}
        />
        <Crumbs items={[{ href: "/best", label: "Roundups" }, { label: page.h1 }]} />
        <figure className="m-0">
          <div className="relative aspect-video overflow-hidden border border-line">
            <TkImage route={`/best/${page.slug}`} priority fill sizes="(min-width: 1024px) 70vw, 100vw" tone="money" />
          </div>
          <IllustrativeCaption />
        </figure>
        <p className="font-mono text-[11px] tracking-widest uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <div id="answer" className="border-l-4 border-ink bg-spec p-4"><RichText text={page.answer} /></div>
        <Updated
          date={editedToday.has(page.slug) ? "November 24, 2026" : undefined}
          read={editedToday.has(page.slug) ? "6 min" : "8 min"}
        />
        <Disclosure />
        {quietPrice ? <p className="text-sm text-muted">Check current price on the listing.</p> : null}
        <HowWePick
          limits={
            FOOTWEAR_SLUGS.has(page.slug)
              ? "Each pick is matched to a real limit on your trip: budget, weight, weather, foot width, or trip length."
              : undefined
          }
          specNote={
            quietPrice
              ? "We don't invent trail tests or scores. Specs are the maker's published figures, and they can change between model years."
              : undefined
          }
          updated={editedToday.has(page.slug) ? "November 24, 2026" : undefined}
        />
        {pair ? (
          <p className="border border-line bg-spec p-3 text-sm">
            {pair.note}{" "}
            <a href={pair.href} className="font-bold underline">{pair.label}</a>
          </p>
        ) : null}
        {page.note ? <p className="max-w-3xl border-l-4 border-line p-4 text-sm"><RichText text={page.note} /></p> : null}
        {page.quick ? <QuickTable table={page.quick} /> : null}
        <p className="border border-line bg-paper-2 p-4"><span className="font-bold">Who this is for. </span><RichText text={page.who} /></p>
        <EarlyListingCta
          slugs={page.productSlugs}
          kind="roundup"
          priceNote={notePrices}
          plainAlt={tableOnlyPrice}
          startNote={page.slug === "solo-tents" ? "The X-Mid 1 is not sold on Amazon US. The Lunar Solo on this list is." : undefined}
          preferFirstAlternative={page.slug === "base-layers"}
        />
        {figures.map((route) => (
          <figure key={route}>
            <div className="relative aspect-video overflow-hidden border border-line">
              <TkImage route={route} fill sizes="(min-width: 1024px) 70vw, 100vw" />
            </div>
            <figcaption className="mt-1 font-mono text-[11px] text-muted">{imageFor(route)?.alt}</figcaption>
          </figure>
        ))}
        <section id="compare" className="space-y-3">
          <h2 className="text-3xl">Comparison</h2>
          {page.specTable ? <QuickTable table={{ ...page.specTable, heading: "none" }} /> : null}
          <CompareTable products={picks} bandNote={!tableOnlyPrice} />
          {tableOnlyPrice ? <p className="text-sm text-muted">Check current price on the listing.</p> : null}
        </section>
        <section className="space-y-4">
          <h2 className="text-3xl">The picks</h2>
          {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} tone="money" pageSlugs={page.productSlugs} priceNote={notePrices} />)}
        </section>
        <section id="one" className="border-2 border-ink bg-paper p-4">
          <h2 className="text-3xl">If you only buy one</h2>
          <p className="mt-2 max-w-3xl"><RichText text={page.one} /></p>
        </section>
        <FaqList faqs={page.faqs} />
        <Related links={linksFor(page.related)} />
        {tableOnlyPrice ? null : <p className="border-t border-line pt-4 text-sm text-muted"><span className="font-bold">How this was framed. </span>{page.method}</p>}
        <StickyAmazon slugs={page.slug === "base-layers" ? page.productSlugs.filter((slug) => slug !== "smartwool-classic-thermal") : page.productSlugs} kind="roundup" priceNote={notePrices} />
      </article>
    </main>
  );
}
