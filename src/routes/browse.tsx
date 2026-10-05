import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { categories, products, searchSite } from "@/data";
import { GearCard, HubBand } from "@/components/site/cards";

type BrowseSearch = { q: string; cat: string };

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>): BrowseSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    cat: typeof search.cat === "string" ? search.cat : "",
  }),
  search: {
    middlewares: [stripSearchParams({ q: "", cat: "" })],
  },
  head: () =>
    pageHead({
      title: "Browse all gear",
      description: "Search Trailkit gear write-ups by category, weight class, and the constraint you are buying for.",
      path: "/browse",
    }),
  component: BrowsePage,
});

function BrowsePage() {
  const { q, cat } = Route.useSearch();
  const hits = q.trim().length >= 2 ? searchSite(q) : [];
  const gear = products.filter((p) => (cat ? p.category === cat : true) && (q.trim() ? `${p.name} ${p.brand} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()) : true));
  const groups = cat
    ? []
    : categories
        .map((category) => ({ category, items: gear.filter((p) => p.category === category.slug) }))
        .filter((group) => group.items.length);
  return (
    <main>
      <HubBand
        route="/browse"
        kicker="Browse"
        title="Browse the gear"
        promise="Filter by the constraint, not by a brand aisle."
        chips={[]}
      />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <form className="flex flex-col gap-3" method="get">
          <label className="sr-only" htmlFor="q">Search</label>
          <input id="q" name="q" defaultValue={q} suppressHydrationWarning placeholder="Search tents, wide, stove..." className="min-h-11 border border-line bg-paper px-3" />
          <div className="flex flex-wrap gap-2">
            <a href="/browse" className={`inline-flex min-h-11 items-center border px-3 font-mono text-[11px] tracking-widest uppercase ${cat ? "border-line" : "border-ink"}`}>All</a>
            {categories.map((category) => (
              <a key={category.slug} href={`/browse?cat=${category.slug}${q ? `&q=${encodeURIComponent(q)}` : ""}`} className={`inline-flex min-h-11 items-center border px-3 font-mono text-[11px] tracking-widest uppercase ${cat === category.slug ? "border-ink" : "border-line"}`}>
                {category.short}
              </a>
            ))}
          </div>
        </form>
        {hits.length ? (
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-widest uppercase">Pages</h2>
            <ul className="mt-2 divide-y divide-line border border-line">
              {hits.map((hit) => (
                <li key={hit.href}>
                  <a href={hit.href} className="block px-4 py-3">
                    <span className="font-mono text-[11px] tracking-widest uppercase">{hit.kind}</span>
                    <span className="mt-1 block font-display text-xl">{hit.title}</span>
                    <span className="text-sm text-muted">{hit.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {cat ? (
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-widest uppercase">{categories.find((c) => c.slug === cat)?.short ?? "Gear"} · {gear.length}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {gear.map((product, i) => (
                <GearCard key={product.slug} product={product} priority={i < 4} />
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-8 space-y-8">
            {groups.map((group) => (
              <section key={group.category.slug}>
                <h2 className="font-mono text-[11px] tracking-widest uppercase">{group.category.short} · {group.items.length}</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {group.items.map((product, i) => (
                    <GearCard key={product.slug} product={product} priority={group.category.slug === categories[0]?.slug && i < 4} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
