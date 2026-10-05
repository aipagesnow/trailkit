import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, getCompare, getProduct, getRoundup, linksFor, roundups } from "@/data";
import type { Category, Compare, Roundup } from "@/data/types";
import { AmazonButton, Crumbs, Disclosure, FaqList, JsonLd, Related, Updated } from "@/components/site/blocks";
import { HowWePick, decidesLine } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";
import { imageFor } from "@/data/images";
import { breadcrumbLd, pageHead } from "@/lib/seo";

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
    }),
  component: ComparePage,
});

function roundupsForCompare(page: Compare): Roundup[] {
  const linked = page.related.map((slug) => getRoundup(slug)).filter((item): item is Roundup => Boolean(item));
  if (linked.length) return linked;
  return roundups.filter((item) => item.productSlugs.includes(page.left) || item.productSlugs.includes(page.right)).slice(0, 2);
}

function categoriesForCompare(page: Compare): Category[] {
  const slugs = [page.left, page.right]
    .map((slug) => getProduct(slug)?.category)
    .filter((slug): slug is string => Boolean(slug));
  return [...new Set(slugs)].map((slug) => getCategory(slug)).filter((item): item is Category => Boolean(item));
}

function ComparePage() {
  const page = Route.useLoaderData();
  const left = getProduct(page.left);
  const right = getProduct(page.right);
  if (!left || !right) throw notFound();
  const figures = (page.slug === "osprey-vs-gregory" ? ["/inline/pack-mesh-back-detail", "/inline/pack-lid-pockets-detail"] : []).filter((route) => imageFor(route)?.ready);
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
      <div className="relative aspect-video overflow-hidden border border-line">
        <TkImage route={`/compare/${page.slug}`} priority fill sizes="100vw" />
        <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-paper" aria-hidden />
        <span className="absolute top-1/2 left-1/2 grid size-[46px] -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-ink bg-paper font-display text-sm">VS</span>
      </div>
      <p className="font-mono text-[11px] tracking-widest uppercase">{page.kicker}</p>
      <h1 className="text-4xl">{page.h1}</h1>
      <Updated />
      <Disclosure />
      <HowWePick />
      <div className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
      <p className="bg-spec px-3 py-2 font-mono text-[11px] tracking-wide uppercase">Decides on → {decidesLine(page)}</p>
      <div className="sticky top-0 z-10 grid gap-3 bg-paper py-3 md:grid-cols-2">
        {[left, right].map((p) => (
          <article key={p.slug} className="grid grid-cols-[120px_1fr] gap-3 border border-line p-3">
            <div className="relative aspect-[4/3] overflow-hidden">
              <TkImage route={`/products/${p.slug}`} fill sizes="120px" />
            </div>
            <div>
              <h2 className="text-xl"><a href={`/products/${p.slug}`}>{p.name}</a></h2>
              <p className="text-sm text-muted">{p.bestFor}</p>
              <AmazonButton product={p} />
            </div>
          </article>
        ))}
      </div>
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
      <section className="space-y-6">
        <h2 className="text-3xl">What the published specs say</h2>
        {[left, right].map((p) => (
          <article key={p.slug} className="space-y-2 border border-line p-4">
            <h3 className="text-2xl">{p.name}</h3>
            <p>{p.body}</p>
            <p><span className="font-bold">Who should buy it. </span>{p.who}</p>
            <p><span className="font-bold">Best for. </span>{p.bestFor}</p>
            <p><span className="font-bold">Limitation. </span>{p.limit}</p>
            <p className="font-mono text-xs uppercase">{p.weight} · {p.priceBand}</p>
            <ul className="list-disc pl-5 text-sm">{p.pros.map((item) => <li key={item}>{item}</li>)}</ul>
            <ul className="list-disc pl-5 text-sm">{p.cons.map((item) => <li key={item}>{item}</li>)}</ul>
            <dl className="grid gap-1 text-sm">
              {p.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-2 border-t border-line py-1">
                  <dt>{spec.label}</dt>
                  <dd className="font-mono text-xs">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>
      {figures.map((route) => (
        <figure key={route}>
          <div className="relative aspect-[4/3] overflow-hidden border border-line">
            <TkImage route={route} fill sizes="(min-width: 1024px) 70vw, 100vw" />
          </div>
          <figcaption className="mt-1 font-mono text-[11px] text-muted">{imageFor(route)?.alt}</figcaption>
        </figure>
      ))}
      <FaqList faqs={page.faqs} />
      <section className="space-y-4">
        <h2 className="text-3xl">From the related pages</h2>
        <p className="max-w-3xl text-sm text-muted">
          The paragraphs below already appear on the linked roundup and category pages. They are reprinted so this comparison stands on those facts. Nothing here is a new test or a new score.
        </p>
        {roundupsForCompare(page).map((roundup) => (
          <article key={roundup.slug} className="space-y-2 border border-line p-4">
            <h3 className="text-2xl">
              <a href={`/best/${roundup.slug}`} className="text-ink">{roundup.h1}</a>
            </h3>
            <p>{roundup.answer}</p>
            <p>{roundup.who}</p>
            <p>{roundup.method}</p>
            <p><span className="font-bold">Default on that page. </span>{roundup.one}</p>
          </article>
        ))}
        {categoriesForCompare(page).map((category) => (
          <article key={category.slug} className="space-y-2 border border-line p-4">
            <h3 className="text-2xl">
              <a href={`/gear/${category.slug}`} className="text-ink">{category.name}</a>
            </h3>
            <p>{category.lede}</p>
            {category.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="list-disc pl-5 text-sm">
              {category.choose.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <Related links={linksFor(page.related)} />
    </main>
  );
}
