import { createFileRoute } from "@tanstack/react-router";
import { getRoundup, roundups } from "@/data";
import { BEST_SECTIONS } from "@/data/hubs";
import { FieldCard, HubBand } from "@/components/site/cards";
import { HubListing } from "@/components/site/blocks";
import { pageHead } from "@/lib/seo";

const featured = ["backpacking-tents", "hiking-boots-wide-feet", "rain-jackets-under-150"];

export const Route = createFileRoute("/best/")({
  head: () =>
    pageHead({
      title: "Gear roundups",
      description: "Trailkit roundups for tents, sleep, packs, footwear, stoves, rain shells, and budget gear.",
      path: "/best",
    }),
  component: BestIndex,
});

function BestIndex() {
  const featuredSet = new Set(featured);
  const used = new Set<string>(featured);
  const sections = BEST_SECTIONS.map((section) => {
    const items = section.slugs.filter((slug) => !featuredSet.has(slug)).map((slug) => getRoundup(slug)).filter((r) => r != null);
    items.forEach((item) => used.add(item.slug));
    return { ...section, items };
  }).filter((section) => section.items.length);
  const rest = roundups.filter((r) => !used.has(r.slug));
  return (
    <main>
      <HubBand
        route="/best"
        kicker="Roundups"
        title="Gear roundups"
        promise="Each page answers one buying question, compares the real options, and names one pick to start with."
        chips={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <section>
          <h2 className="font-mono text-[11px] tracking-widest uppercase">Start here</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {featured.map((slug, i) => {
              const roundup = getRoundup(slug);
              if (!roundup) return null;
              return (
                <div key={slug} className="flex h-full flex-col">
                  <div className="min-h-0 flex-1">
                    <FieldCard roundup={roundup} index={`R-0${i + 1}`} priority />
                  </div>
                  <HubListing slugs={roundup.productSlugs} />
                </div>
              );
            })}
          </div>
        </section>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">{section.label} · {section.items.length}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {section.items.map((roundup, i) => (
                <FieldCard key={roundup.slug} roundup={roundup} index={`R-${String(i + 1).padStart(2, "0")}`} priority={i < 3 && section.id === "shelters"} />
              ))}
            </div>
          </section>
        ))}
        {rest.length ? (
          <section id="more">
            <h2 className="font-mono text-[11px] tracking-widest uppercase">More · {rest.length}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {rest.map((roundup, i) => (
                <FieldCard key={roundup.slug} roundup={roundup} index={`R-${String(i + 1).padStart(2, "0")}`} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
