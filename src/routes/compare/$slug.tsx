import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCompare, getProduct, linksFor } from "@/data";
import { AmazonButton, Crumbs, Disclosure, FaqList, FieldImage, JsonLd, Related, Updated } from "@/components/site/blocks";
import { breadcrumbLd, heroSrc, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const page = getCompare(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData?.title ?? "Comparison",
      description: loaderData?.description ?? "",
      path: `/compare/${params.slug}`,
      image: heroSrc(params.slug),
    }),
  component: ComparePage,
});

function ComparePage() {
  const page = Route.useLoaderData();
  const left = getProduct(page.left);
  const right = getProduct(page.right);
  if (!left || !right) throw notFound();
  const hero = heroSrc(page.slug);
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: page.h1 },
          ]),
          page.faqs.length
            ? {
                "@type": "FAQPage",
                mainEntity: page.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }
            : { "@type": "Article", headline: page.h1, description: page.description },
        ]}
      />
      <Crumbs items={[{ href: "/compare", label: "Compare" }, { label: page.h1 }]} />
      {hero ? <FieldImage src={hero} alt="Two loaded packs on trailhead gravel, shown as illustrative models" /> : null}
      <p className="font-display text-xs tracking-widest uppercase">{page.kicker}</p>
      <h1 className="text-4xl">{page.h1}</h1>
      <Updated />
      <Disclosure />
      <div className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
      <div>
        <p className="mb-1 font-display text-xs tracking-widest text-muted uppercase">Scroll →</p>
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-forest-deep text-on-forest">
              <tr>
                <th className="sticky left-0 bg-forest-deep px-3 py-2 font-display"> </th>
                <th className="px-3 py-2 font-display">{left.name}</th>
                <th className="px-3 py-2 font-display">{right.name}</th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th className="sticky left-0 bg-paper px-3 py-2 text-left font-semibold">{row.label}</th>
                  <td className="px-3 py-2">{row.left}</td>
                  <td className="px-3 py-2">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {[left, right].map((p) => (
          <article key={p.slug} className="border border-line bg-paper p-4">
            <h2 className="text-2xl"><a href={`/products/${p.slug}`} className="text-ink">{p.name}</a></h2>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>
            <AmazonButton product={p} />
          </article>
        ))}
      </section>
      <section className="border-2 border-ink bg-paper p-4">
        <h2 className="text-3xl">Verdict</h2>
        <p className="mt-2 max-w-3xl">{page.verdict}</p>
      </section>
      <FaqList faqs={page.faqs} />
      <Related links={linksFor(page.related)} />
    </main>
  );
}
