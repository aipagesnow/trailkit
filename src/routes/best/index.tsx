import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { roundups } from "@/data";
import { CardGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/best/")({
  head: () => ({
    meta: [
      { title: pageTitle("Gear roundups") },
      { name: "description", content: "Trailkit roundups for tents, sleep, packs, footwear, stoves, rain shells, and budget gear." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Roundups</h1>
      <p className="mt-3 max-w-2xl text-muted">Each page answers a buying question, compares the real options, and names one default pick.</p>
      <div className="mt-6">
        <CardGrid items={roundups.map((r) => ({ href: `/best/${r.slug}`, title: r.h1, text: r.description, kicker: r.kicker }))} />
      </div>
    </main>
  ),
});
