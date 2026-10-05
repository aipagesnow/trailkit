import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { categories, products, searchSite } from "@/data";

type BrowseSearch = { q: string; cat: string };

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>): BrowseSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    cat: typeof search.cat === "string" ? search.cat : "",
  }),
  head: () =>
    pageHead({
      title: "Browse all gear",
      description: "Search Trailkit gear write-ups, roundups, guides, and comparisons.",
      path: "/browse",
    }),
  component: BrowsePage,
});

function BrowsePage() {
  const { q, cat } = Route.useSearch();
  const hits = q.trim().length >= 2 ? searchSite(q) : [];
  const gear = products.filter((p) => (cat ? p.category === cat : true) && (q.trim() ? `${p.name} ${p.brand} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()) : true));
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-4xl">Browse</h1>
      <form className="mt-4 flex flex-col gap-2 sm:flex-row" method="get">
        <label className="sr-only" htmlFor="q">Search</label>
        <input id="q" name="q" defaultValue={q} suppressHydrationWarning placeholder="Search tents, wide, stove..." className="min-h-11 flex-1 rounded-md border border-line bg-card px-3" />
        <label className="sr-only" htmlFor="cat">Category</label>
        <select id="cat" name="cat" defaultValue={cat} className="min-h-11 rounded-md border border-line bg-card px-3">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <button type="submit" className="min-h-11 rounded-md bg-forest px-4 font-bold text-on-forest">Filter</button>
      </form>
      {hits.length ? (
        <section className="mt-8">
          <h2 className="text-2xl">Pages</h2>
          <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-card">
            {hits.map((hit) => (
              <li key={hit.href}>
                <a href={hit.href} className="block px-4 py-3">
                  <span className="text-xs font-bold tracking-widest text-amber-deep uppercase">{hit.kind}</span>
                  <span className="mt-1 block font-serif text-xl">{hit.title}</span>
                  <span className="text-sm text-muted">{hit.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="text-2xl">Gear ({gear.length})</h2>
        <ul className="mt-2 grid gap-3 sm:grid-cols-2">
          {gear.map((p) => (
            <li key={p.slug}>
              <a href={`/products/${p.slug}`} className="block h-full rounded-lg border border-line bg-card p-4">
                <span className="text-xs font-bold tracking-widest text-amber-deep uppercase">{p.role}</span>
                <span className="mt-1 block font-serif text-xl">{p.name}</span>
                <span className="mt-1 block text-sm text-muted">{p.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
