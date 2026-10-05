import { createFileRoute } from "@tanstack/react-router";
import { getNote, notes } from "@/data";
import { LEARN_SECTIONS } from "@/data/hubs";
import { HubBand, NotePlate } from "@/components/site/cards";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/learn/")({
  head: () =>
    pageHead({
      title: "Field notes",
      description: "Short Trailkit references for R-value, fill power, declination, bear storage, and the rest of the spec sheet.",
      path: "/learn",
    }),
  component: LearnIndex,
});

function LearnIndex() {
  const used = new Set<string>();
  const sections = LEARN_SECTIONS.map((section) => {
    const items = section.slugs.map((slug) => getNote(slug)).filter((n) => n != null);
    items.forEach((item) => used.add(item.slug));
    return { ...section, items };
  }).filter((section) => section.items.length);
  const rest = notes.filter((n) => !used.has(n.slug));
  let n = 0;
  return (
    <main>
      <HubBand
        route="/learn"
        kicker="Field notes"
        title="Field notes"
        promise="Definitions and judgment calls that the gear pages assume. Read the note, then open the roundup if you are ready to buy."
        chips={sections.map((section) => ({ href: `#${section.id}`, label: section.label }))}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">{section.label}</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {section.items.map((note) => {
                n += 1;
                return <NotePlate key={note.slug} note={note} index={String(n).padStart(2, "0")} priority={n <= 4} />;
              })}
            </div>
          </section>
        ))}
        {rest.length ? (
          <section>
            <h2 className="font-mono text-[11px] tracking-widest uppercase">More</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {rest.map((note) => {
                n += 1;
                return <NotePlate key={note.slug} note={note} index={String(n).padStart(2, "0")} />;
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
