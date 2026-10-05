import { createFileRoute, notFound } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/affiliate";
import { getProduct, getRoundup, linksFor } from "@/data";
import { CompareTable, Crumbs, Disclosure, FaqList, JsonLd, PageToc, ProductSection, Related, Updated } from "@/components/site/blocks";
import { HowWePick } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";
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
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[14rem_1fr]">
      <PageToc
        links={[
          { href: "#answer", label: "Direct answer" },
          { href: "#compare", label: "Comparison" },
          ...picks.map((p) => ({ href: `#${p.slug}`, label: p.name })),
          { href: "#one", label: "If you only buy one" },
        ]}
      />
      <article className="space-y-8">
        <JsonLd
          data={[
            breadcrumbLd(crumbs),
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "ItemList",
              name: page.h1,
              itemListElement: picks.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.name,
                url: absoluteUrl(`/products/${p.slug}`),
              })),
            },
          ]}
        />
        <Crumbs items={[{ href: "/best", label: "Roundups" }, { label: page.h1 }]} />
        <div className="relative aspect-video overflow-hidden border border-line">
          <TkImage route={`/best/${page.slug}`} priority fill sizes="(min-width: 1024px) 70vw, 100vw" tone="money" />
        </div>
        <p className="font-mono text-[11px] tracking-widest uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <Updated read="8 min" />
        <Disclosure />
        <HowWePick />
        {pair ? (
          <p className="border border-line bg-spec p-3 text-sm">
            {pair.note}{" "}
            <a href={pair.href} className="font-bold underline">{pair.label}</a>
          </p>
        ) : null}
        <div id="answer" className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
        <p className="border border-line bg-paper-2 p-4"><span className="font-bold">Who this is for. </span>{page.who}</p>
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
          <CompareTable products={picks} />
        </section>
        <section className="space-y-4">
          <h2 className="text-3xl">The picks</h2>
          {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} tone="money" />)}
        </section>
        <section id="one" className="border-2 border-ink bg-paper p-4">
          <h2 className="text-3xl">If you only buy one</h2>
          <p className="mt-2 max-w-3xl">{page.one}</p>
        </section>
        <FaqList faqs={page.faqs} />
        <Related links={linksFor(page.related)} />
        <p className="border-t border-line pt-4 text-sm text-muted"><span className="font-bold">How this was framed. </span>{page.method}</p>
      </article>
    </main>
  );
}
