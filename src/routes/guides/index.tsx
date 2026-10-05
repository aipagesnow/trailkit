import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { guides } from "@/data";
import { CardGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: pageTitle("Hiking and camping guides") },
      { name: "description", content: "Trailkit guides on tents, pads, pack fit, water treatment, layering, and a first overnight." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Guides</h1>
      <p className="mt-3 max-w-2xl text-muted">Supporting pages that explain the decision, then point at the roundup where the buying happens.</p>
      <div className="mt-6">
        <CardGrid items={guides.map((g) => ({ href: `/guides/${g.slug}`, title: g.h1, text: g.description, kicker: g.kicker }))} />
      </div>
    </main>
  ),
});
