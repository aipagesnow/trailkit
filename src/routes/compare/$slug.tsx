import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { getCompare, getProduct, linksFor } from "@/data";
import { AmazonButton, Crumbs, Disclosure, FaqList, Related, Updated } from "@/components/site/blocks";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const page = getCompare(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.title ?? "Comparison") },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const page = Route.useLoaderData();
  const left = getProduct(page.left);
  const right = getProduct(page.right);
  if (!left || !right) throw notFound();
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <Crumbs items={[{ href: "/compare", label: "Compare" }, { label: page.h1 }]} />
      <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{page.kicker}</p>
      <h1 className="text-4xl">{page.h1}</h1>
      <Updated />
      <div className="border-l-4 border-forest bg-card p-4">{page.answer}</div>
      <Disclosure />
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-forest-deep text-on-forest">
            <tr>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2">{left.name}</th>
              <th className="px-3 py-2">{right.name}</th>
            </tr>
          </thead>
          <tbody>
            {page.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th className="px-3 py-2 font-semibold">{row.label}</th>
                <td className="px-3 py-2">{row.left}</td>
                <td className="px-3 py-2">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {[left, right].map((p) => (
          <article key={p.slug} className="rounded-lg border border-line bg-card p-4">
            <h2 className="text-2xl"><a href={`/products/${p.slug}`} className="text-ink">{p.name}</a></h2>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>
            <AmazonButton query={p.query} />
          </article>
        ))}
      </section>
      <section className="rounded-lg border-2 border-forest bg-card p-4">
        <h2 className="text-3xl">Verdict</h2>
        <p className="mt-2 max-w-3xl">{page.verdict}</p>
      </section>
      <FaqList faqs={page.faqs} />
      <Related links={linksFor(page.related)} />
    </main>
  );
}
