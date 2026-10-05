import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { getNote, getProduct, linksFor } from "@/data";
import { Crumbs, Disclosure, FaqList, JsonLd, ProductSection, Related, Updated } from "@/components/site/blocks";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const page = getNote(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.title ?? "Field note") },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  component: NotePage,
});

function NotePage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.h1,
          description: page.description,
          articleSection: "Field note",
        }}
      />
      <Crumbs items={[{ href: "/learn", label: "Field notes" }, { label: page.h1 }]} />
      <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{page.kicker}</p>
      <h1 className="text-4xl">{page.h1}</h1>
      <Updated />
      <div className="border-l-4 border-forest bg-card p-4">{page.answer}</div>
      {page.sections.map((section) => (
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
      {picks.length ? (
        <section className="space-y-4">
          <h2 className="text-3xl">Gear that shows the point</h2>
          <Disclosure />
          {picks.map((p, i) => (
            <ProductSection key={p.slug} product={p} index={i + 1} />
          ))}
        </section>
      ) : null}
      {page.faqs.length ? <FaqList faqs={page.faqs} /> : null}
      <Related links={linksFor(page.related)} />
    </main>
  );
}
