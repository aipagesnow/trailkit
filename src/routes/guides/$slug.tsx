import { createFileRoute, notFound } from "@tanstack/react-router";
import { getGuide, getProduct, linksFor } from "@/data";
import { Crumbs, Disclosure, FaqList, FieldImage, JsonLd, PageToc, ProductSection, Related, Updated } from "@/components/site/blocks";
import { breadcrumbLd, heroSrc, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const page = getGuide(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData?.title ?? "Guide",
      description: loaderData?.description ?? "",
      path: `/guides/${params.slug}`,
      image: heroSrc(params.slug),
    }),
  component: GuidePage,
});

function GuidePage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  const hero = heroSrc(page.slug);
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[14rem_1fr]">
      <PageToc links={page.sections.map((s) => ({ href: `#${s.id}`, label: s.heading }))} />
      <article className="space-y-8">
        <JsonLd
          data={[
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: page.h1 },
            ]),
            {
              "@type": "Article",
              headline: page.h1,
              description: page.description,
            },
          ]}
        />
        <Crumbs items={[{ href: "/guides", label: "Guides" }, { label: page.h1 }]} />
        {hero ? <FieldImage src={hero} alt={`${page.h1}, packed for a short first night`} /> : null}
        <p className="font-display text-xs tracking-widest uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <Updated />
        <Disclosure />
        <div className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
        {page.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-3xl">{section.heading}</h2>
            {section.paragraphs.map((p) => <p key={p} className="mt-2 max-w-3xl">{p}</p>)}
            {section.bullets ? <ul className="mt-2 list-disc pl-5">{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          </section>
        ))}
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
