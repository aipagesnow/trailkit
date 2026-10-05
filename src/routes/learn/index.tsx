import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { notes } from "@/data";
import { CardGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: pageTitle("Field notes") },
      {
        name: "description",
        content: "Short Trailkit references for R-value, fill power, declination, bear storage, and the rest of the spec sheet.",
      },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Field notes</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Definitions and judgment calls that the gear pages assume. Read the note, then open the roundup if you are ready to buy.
      </p>
      <div className="mt-6">
        <CardGrid items={notes.map((n) => ({ href: `/learn/${n.slug}`, title: n.h1, text: n.description, kicker: n.kicker }))} />
      </div>
    </main>
  ),
});
