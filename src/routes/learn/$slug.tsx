import { createFileRoute, notFound } from "@tanstack/react-router";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { getNote, getProduct, getRoundup, linksFor } from "@/data";
import { Crumbs, Disclosure, FaqList, JsonLd, ProductSection, Related, Updated } from "@/components/site/blocks";
import { FieldCard } from "@/components/site/cards";
import { QuickTable } from "@/components/site/quick-table";
import { TkImage } from "@/components/site/tk-image";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const page = getNote(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) =>
    pageHead({
      title: loaderData?.title ?? "Field note",
      description: loaderData?.description ?? "",
      path: `/learn/${params.slug}`,
    }),
  component: NotePage,
});

function NotePage() {
  const page = Route.useLoaderData();
  const picks = page.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null);
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <JsonLd
          data={[
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Field notes", path: "/learn" },
              { name: page.h1 },
            ]),
            {
              "@type": "Article",
              headline: page.h1,
              description: page.description,
              articleSection: "Field note",
            },
          ]}
        />
      <Crumbs items={[{ href: "/learn", label: "Field notes" }, { label: page.h1 }]} />
      <div className="md:float-right md:ml-4 md:w-56">
        <div className="relative aspect-square overflow-hidden border border-line">
          <TkImage route={`/learn/${page.slug}`} priority fill sizes="224px" />
        </div>
      </div>
      <p className="font-mono text-[11px] tracking-widest uppercase">{page.kicker}</p>
      <h1 className="text-4xl">{page.h1}</h1>
      <Updated />
      <div className="border-l-4 border-ink bg-spec p-4">{page.answer}</div>
      {page.quick ? <QuickTable table={page.quick} /> : null}
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
      <section>
        <h2 className="text-3xl">Where this matters</h2>
        <div className="mt-3 max-w-md">
          {linksFor(page.related).slice(0, 1).map((link) => {
            const roundup = getRoundup(link.href.replace("/best/", ""));
            return roundup ? <FieldCard key={link.href} roundup={roundup} index="R-01" /> : <a key={link.href} href={link.href} className="font-bold underline">{link.label}</a>;
          })}
        </div>
      </section>
      <Related links={linksFor(page.related)} />
    </main>
  );
}
