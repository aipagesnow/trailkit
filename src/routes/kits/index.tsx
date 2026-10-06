import { createFileRoute } from "@tanstack/react-router";
import { getKit, kits } from "@/data";
import { asinFor } from "@/data/asins";
import { KIT_SECTIONS } from "@/data/hubs";
import { HubBand, KitCard } from "@/components/site/cards";
import { HubListing } from "@/components/site/blocks";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kits/")({
  head: () =>
    pageHead({
      title: "Trip kits",
      description: "Trailkit kits for a fair weekend, a light-and-dry hike, cold sleepers, wide feet, car camping, and a day hike.",
      path: "/kits",
    }),
  component: KitsIndex,
});

function KitsIndex() {
  const used = new Set<string>();
  const sections = KIT_SECTIONS.map((section) => {
    const items = section.slugs.map((slug) => getKit(slug)).filter((k) => k != null);
    items.forEach((item) => used.add(item.slug));
    return { ...section, items };
  }).filter((section) => section.items.length);
  const rest = kits.filter((k) => !used.has(k.slug));
  const reserved = new Set<string>();
  const skipByKit = new Map<string, Set<string>>();
  const reserve = (slugs: string[], kitSlug: string) => {
    const skip = new Set(reserved);
    for (const slug of slugs) {
      const asin = asinFor(slug);
      if (!asin || reserved.has(asin)) continue;
      reserved.add(asin);
      break;
    }
    skipByKit.set(kitSlug, skip);
  };
  for (const section of sections) for (const kit of section.items) reserve(kit.productSlugs, kit.slug);
  for (const kit of rest) reserve(kit.productSlugs, kit.slug);
  return (
    <main>
      <HubBand
        route="/kits"
        kicker="Kits"
        title="Trip kits"
        promise="A short list for a kind of trip. Swap a piece if the constraint does not match you."
        chips={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">{section.label} · {section.items.length}</h2>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {section.items.map((kit, i) => (
                <div key={kit.slug} className="flex h-full flex-col">
                  <div className="min-h-0 flex-1">
                    <KitCard kit={kit} priority={section.id === "backpacking" && i < 2} />
                  </div>
                  <HubListing slugs={kit.productSlugs} allowLater skipAsins={skipByKit.get(kit.slug)} />
                </div>
              ))}
            </div>
          </section>
        ))}
        {rest.length ? (
          <section>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">More · {rest.length}</h2>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {rest.map((kit) => (
                <div key={kit.slug} className="flex h-full flex-col">
                  <div className="min-h-0 flex-1">
                    <KitCard kit={kit} />
                  </div>
                  <HubListing slugs={kit.productSlugs} allowLater skipAsins={skipByKit.get(kit.slug)} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
