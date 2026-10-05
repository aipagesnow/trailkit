import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { categories } from "@/data";
import { CardGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/gear/")({
  head: () =>
    pageHead({
      title: "Gear categories",
      description: "Trailkit category hubs for shelters, sleep, packs, footwear, rain, stoves, water, and car camping.",
      path: "/gear",
    }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl">Categories</h1>
      <p className="mt-3 max-w-2xl text-muted">Each hub explains the decision, then links to the gear and the roundups that use it.</p>
      <div className="mt-6">
        <CardGrid items={categories.map((c) => ({ href: `/gear/${c.slug}`, title: c.name, text: c.lede, kicker: `${c.short}` }))} />
      </div>
    </main>
  ),
});
