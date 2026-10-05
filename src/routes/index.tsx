import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";
import { categories, guides, kits, libraryCount, notes, roundups } from "@/data";
import { CardGrid, Disclosure } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle("Practical hiking and backpacking gear picks") },
      {
        name: "description",
        content:
          "Trailkit ranks tents, pads, packs, boots, stoves, and shells for a real constraint: budget, weight, weather, width, or a first night out.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const stats = libraryCount();
  const navigate = useNavigate();
  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">Outdoor gear, constrained</p>
          <h1 className="mt-2 max-w-3xl text-4xl md:text-5xl">Gear picks for the trip you are actually taking</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A full desk of tents, sleep systems, packs, footwear, stoves, hammocks, water, and the field notes that explain the specs. Budget, weight, weather, and fit. Not a generic top ten.
          </p>
          <form
            className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              const q = String(new FormData(event.currentTarget).get("q") ?? "");
              navigate({ to: "/browse", search: { q, cat: "" } });
            }}
          >
            <label className="sr-only" htmlFor="q">Search gear and guides</label>
            <input id="q" name="q" suppressHydrationWarning placeholder="Try wide feet, quilt, or headlamp" className="min-h-11 flex-1 rounded-md border border-line bg-card px-3" />
            <button type="submit" className="min-h-11 rounded-md bg-forest px-4 font-bold text-on-forest">Search</button>
          </form>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [String(stats.pages), "Pages in the library"],
              [String(stats.products), "Gear write-ups"],
              [String(stats.guides), "How-to guides"],
              [String(stats.compares), "Head-to-head compares"],
            ].map(([n, label]) => (
              <div key={label} className="rounded-lg border border-line bg-card p-3">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="font-serif text-3xl">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
        <Disclosure />
        <section>
          <h2 className="text-3xl">Start with a decision</h2>
          <p className="mt-2 max-w-2xl text-muted">Commercial pages lead with a direct answer, a comparison table, and one default pick.</p>
          <div className="mt-4">
            <CardGrid items={roundups.slice(0, 9).map((r) => ({ href: `/best/${r.slug}`, title: r.h1, text: r.description, kicker: "Roundup" }))} />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Categories</h2>
          <div className="mt-4">
            <CardGrid items={categories.map((c) => ({ href: `/gear/${c.slug}`, title: c.name, text: c.lede, kicker: c.short }))} />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Kits for a kind of trip</h2>
          <div className="mt-4">
            <CardGrid items={kits.map((k) => ({ href: `/kits/${k.slug}`, title: k.name, text: k.description, kicker: "Kit" }))} />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Guides</h2>
          <div className="mt-4">
            <CardGrid items={guides.slice(0, 9).map((g) => ({ href: `/guides/${g.slug}`, title: g.h1, text: g.description, kicker: "Guide" }))} />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Field notes</h2>
          <p className="mt-2 max-w-2xl text-muted">Short references for the words on the spec sheet: R-value, declination, fill power, and the rest.</p>
          <div className="mt-4">
            <CardGrid items={notes.slice(0, 9).map((n) => ({ href: `/learn/${n.slug}`, title: n.h1, text: n.description, kicker: "Field note" }))} />
          </div>
        </section>
      </div>
    </main>
  );
}
