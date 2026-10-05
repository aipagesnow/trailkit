import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { getProduct, getRoundup, linksFor } from "@/data";
import { CompareTable, Crumbs, Disclosure, FaqList, JsonLd, ProductSection, Related, Updated } from "@/components/site/blocks";

export const Route = createFileRoute("/best/$slug")({
  loader: ({ params }) => {
    const page = getRoundup(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.title ?? "Roundup") },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  component: RoundupPage,
});

function RoundupPage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[14rem_1fr]">
      <nav className="text-sm lg:sticky lg:top-4 lg:self-start">
        <p className="text-xs font-bold tracking-widest text-muted uppercase">On this page</p>
        <a href="#answer" className="mt-2 block text-ink">Direct answer</a>
        <a href="#compare" className="block py-1 text-ink">Comparison</a>
        {picks.map((p) => (
          <a key={p.slug} href={`#${p.slug}`} className="block truncate py-1 text-ink">{p.name}</a>
        ))}
        <a href="#one" className="block py-1 text-ink">If you only buy one</a>
      </nav>
      <article className="space-y-8">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }} />
        <Crumbs items={[{ href: "/best", label: "Roundups" }, { label: page.h1 }]} />
        <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <Updated read="8 min" />
        <div id="answer" className="border-l-4 border-forest bg-card p-4">{page.answer}</div>
        <p className="rounded-md bg-paper-2 p-4"><span className="font-bold">Who this is for. </span>{page.who}</p>
        <Disclosure />
        <section id="compare" className="space-y-3">
          <h2 className="text-3xl">Comparison</h2>
          <CompareTable products={picks} />
        </section>
        <section className="space-y-4">
          <h2 className="text-3xl">The picks</h2>
          {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} />)}
        </section>
        <section id="one" className="rounded-lg border-2 border-forest bg-card p-4">
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
