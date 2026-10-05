import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { compares } from "@/data";
import { CardGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/compare/")({
  head: () => ({
    meta: [
      { title: pageTitle("Gear comparisons") },
      { name: "description", content: "Head-to-head outdoor gear comparisons: tents, packs, pads, boots, stoves, filters, and rain shells." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Comparisons</h1>
      <p className="mt-3 max-w-2xl text-muted">Two options, one job. If the fit is wrong, neither wins.</p>
      <div className="mt-6">
        <CardGrid items={compares.map((c) => ({ href: `/compare/${c.slug}`, title: c.h1, text: c.description, kicker: c.kicker }))} />
      </div>
    </main>
  ),
});
