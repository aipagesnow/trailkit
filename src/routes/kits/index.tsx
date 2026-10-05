import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { kits } from "@/data";
import { CardGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/kits/")({
  head: () =>
    pageHead({
      title: "Trip kits",
      description: "Trailkit kits for a fair weekend, a light-and-dry hike, cold sleepers, wide feet, car camping, and a day hike.",
      path: "/kits",
    }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Kits</h1>
      <p className="mt-3 max-w-2xl text-muted">A short list for a kind of trip. Swap a piece if the constraint does not match you.</p>
      <div className="mt-6">
        <CardGrid items={kits.map((k) => ({ href: `/kits/${k.slug}`, title: k.name, text: k.description, kicker: "Kit" }))} />
      </div>
    </main>
  ),
});
