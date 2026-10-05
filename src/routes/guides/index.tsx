import { createFileRoute } from "@tanstack/react-router";
import { getGuide, guides } from "@/data";
import { GUIDE_SECTIONS } from "@/data/hubs";
import { GuideCard, HubBand } from "@/components/site/cards";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Hiking and camping guides",
      description: "Trailkit guides on tents, pads, pack fit, water treatment, layering, and a first overnight.",
      path: "/guides",
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  const used = new Set<string>();
  const sections = GUIDE_SECTIONS.map((section) => {
    const items = section.slugs.map((slug) => getGuide(slug)).filter((g) => g != null);
    items.forEach((item) => used.add(item.slug));
    return { ...section, items };
  }).filter((section) => section.items.length);
  const rest = guides.filter((g) => !used.has(g.slug));
  const feature = getGuide("first-overnight");
  const overlays = ["choose-a-pad", "ultralight-shelter"].map((slug) => getGuide(slug)).filter((g) => g != null);
  return (
    <main>
      <HubBand
        route="/guides"
        kicker="Guides"
        title="Hiking and camping guides"
        promise="The decision, explained, then a link to the roundup where the buying happens."
        chips={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <div className="grid gap-3 lg:grid-cols-2">
          {feature ? <GuideCard guide={feature} featured priority /> : null}
          <div className="grid gap-3">
            {overlays.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} featured />
            ))}
          </div>
        </div>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">{section.label} · {section.items.length}</h2>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {section.items.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ))}
        {rest.length ? (
          <section>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">More · {rest.length}</h2>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {rest.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
