import { createFileRoute } from "@tanstack/react-router";
import { categories, products, roundups } from "@/data";
import { CategoryTile, HubBand } from "@/components/site/cards";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/gear/")({
  head: () =>
    pageHead({
      title: "Gear categories",
      description: "Trailkit category hubs for shelters, sleep, packs, footwear, rain, stoves, water, and car camping.",
      path: "/gear",
    }),
  component: GearIndex,
});

function GearIndex() {
  return (
    <main>
      <HubBand
        route="/gear"
        kicker="Categories"
        title="Gear categories"
        promise="Each hub explains the decision, then links to the gear and the roundups that use it."
        chips={categories.slice(0, 8).map((category) => ({ href: `/gear/${category.slug}`, label: category.short }))}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, i) => (
            <CategoryTile
              key={category.slug}
              category={category}
              items={products.filter((p) => p.category === category.slug).length}
              roundups={roundups.filter((r) => r.productSlugs.some((slug) => products.find((p) => p.slug === slug)?.category === category.slug)).length}
              priority={i < 5}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
