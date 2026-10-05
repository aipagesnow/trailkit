import { createFileRoute, notFound } from "@tanstack/react-router";
import { getGuide, getProduct, linksFor } from "@/data";
import { Crumbs, Disclosure, FaqList, JsonLd, PageToc, Related, Updated } from "@/components/site/blocks";
import { GearCard, HowWePick } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";
import { imageFor } from "@/data/images";
import { breadcrumbLd, pageHead } from "@/lib/seo";

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
    }),
  component: GuidePage,
});

function GuidePage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  const figures = (page.slug === "first-overnight" ? ["/inline/overnight-camp-dusk", "/inline/overnight-kitchen-rock"] : []).filter((route) => imageFor(route)?.ready);
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
        <div className="relative aspect-video overflow-hidden border border-line">
          <TkImage route={`/guides/${page.slug}`} priority fill sizes="(min-width: 1024px) 70vw, 100vw" />
        </div>
        <p className="font-mono text-[11px] tracking-widest uppercase">{page.kicker}</p>
        <h1 className="text-4xl">{page.h1}</h1>
        <Updated />
        <Disclosure />
        <div className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
        {figures.map((route) => (
          <figure key={route}>
            <div className="relative aspect-video overflow-hidden border border-line">
              <TkImage route={route} fill sizes="(min-width: 1024px) 70vw, 100vw" />
            </div>
            <figcaption className="mt-1 font-mono text-[11px] text-muted">{imageFor(route)?.alt}</figcaption>
          </figure>
        ))}
        {page.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-3xl">{section.heading}</h2>
            {section.paragraphs.map((p) => <p key={p} className="mt-2 max-w-3xl">{p}</p>)}
            {section.bullets ? <ul className="mt-2 list-disc pl-5">{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          </section>
        ))}
        <section>
          <h2 className="text-3xl">Gear for this guide</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {picks.slice(0, 3).map((product) => (
              <GearCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
        <FaqList faqs={page.faqs} />
        <HowWePick />
        <Related links={linksFor(page.related)} />
      </article>
    </main>
  );
}
