import { createFileRoute, notFound } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/affiliate";
import { getProduct, getRoundup, linksFor } from "@/data";
import { CompareTable, Crumbs, Disclosure, FaqList, FieldImage, JsonLd, PageToc, ProductSection, Related, Updated } from "@/components/site/blocks";
import { breadcrumbLd, heroSrc, pageHead } from "@/lib/seo";

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
      image: heroSrc(params.slug),
    }),
  component: RoundupPage,
});

function RoundupPage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  const hero = heroSrc(page.slug);
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
        {hero ? <FieldImage src={hero} alt={`${page.h1} — trail context, not a studio packshot`} /> : null}
        <p className="font-display text-xs tracking-widest uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <Updated read="8 min" />
        <Disclosure />
        <div id="answer" className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
        <p className="border border-line bg-paper-2 p-4"><span className="font-bold">Who this is for. </span>{page.who}</p>
        <section id="compare" className="space-y-3">
          <h2 className="text-3xl">Comparison</h2>
          <CompareTable products={picks} />
        </section>
        <section className="space-y-4">
          <h2 className="text-3xl">The picks</h2>
          {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} />)}
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
