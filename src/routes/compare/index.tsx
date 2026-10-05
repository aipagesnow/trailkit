import { createFileRoute } from "@tanstack/react-router";
import { compares, getCompare } from "@/data";
import { COMPARE_SECTIONS } from "@/data/hubs";
import { HubBand, VersusCard } from "@/components/site/cards";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/compare/")({
  head: () =>
    pageHead({
      title: "Gear comparisons",
      description: "Head-to-head outdoor gear comparisons: tents, packs, pads, boots, stoves, filters, and rain shells.",
      path: "/compare",
    }),
  component: CompareIndex,
});

function CompareIndex() {
  const used = new Set<string>(["osprey-vs-gregory"]);
  const feature = getCompare("osprey-vs-gregory");
  const sections = COMPARE_SECTIONS.filter((section) => section.id !== "illustrative")
    .map((section) => {
      const items = section.slugs.map((slug) => getCompare(slug)).filter((c) => c != null);
      items.forEach((item) => used.add(item.slug));
      return { ...section, items };
    })
    .filter((section) => section.items.length);
  const rest = compares.filter((c) => !used.has(c.slug));
  return (
    <main>
      <HubBand
        route="/compare"
        kicker="Compare"
        title="Gear comparisons"
        promise="Two options, one job. If the fit is wrong, neither wins."
        chips={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        {feature ? (
          <section>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">Start here</h2>
            <div className="mt-3">
              <VersusCard compare={feature} featured priority />
            </div>
          </section>
        ) : null}
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">{section.label} · {section.items.length}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {section.items.map((compare) => (
                <VersusCard key={compare.slug} compare={compare} />
              ))}
            </div>
          </section>
        ))}
        {rest.length ? (
          <section>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">More · {rest.length}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {rest.map((compare) => (
                <VersusCard key={compare.slug} compare={compare} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
