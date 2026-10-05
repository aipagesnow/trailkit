import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { getGuide, getProduct, linksFor } from "@/data";
import { Crumbs, Disclosure, FaqList, ProductSection, Related, Updated } from "@/components/site/blocks";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const page = getGuide(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.title ?? "Guide") },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[14rem_1fr]">
      <nav className="text-sm lg:sticky lg:top-4 lg:self-start">
        <p className="text-xs font-bold tracking-widest text-muted uppercase">On this page</p>
        {page.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="block py-1 text-ink">{s.heading}</a>
        ))}
      </nav>
      <article className="space-y-8">
        <Crumbs items={[{ href: "/guides", label: "Guides" }, { label: page.h1 }]} />
        <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <Updated />
        <div className="border-l-4 border-forest bg-card p-4">{page.answer}</div>
        {page.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-3xl">{section.heading}</h2>
            {section.paragraphs.map((p) => <p key={p} className="mt-2 max-w-3xl">{p}</p>)}
            {section.bullets ? <ul className="mt-2 list-disc pl-5">{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          </section>
        ))}
        <Disclosure />
        <section className="space-y-4">
          <h2 className="text-3xl">Gear that fits this guide</h2>
          {picks.map((p, i) => <ProductSection key={p.slug} product={p} index={i + 1} />)}
        </section>
        <FaqList faqs={page.faqs} />
        <Related links={linksFor(page.related)} />
      </article>
    </main>
  );
}
