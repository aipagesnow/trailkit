import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { categories, guides, kits, notes, roundups } from "@/data";
import { CardGrid, Disclosure } from "@/components/site/blocks";
import { pageHead } from "@/lib/seo";

const chips = [
  { href: "/best/hiking-boots-wide-feet", label: "Wide feet" },
  { href: "/best/rain-jackets-under-150", label: "Under $150" },
  { href: "/guides/first-overnight", label: "First overnight" },
  { href: "/best/ultralight-tents", label: "Ultralight" },
  { href: "/best/backpacking-tents", label: "Tents" },
  { href: "/compare/osprey-vs-gregory", label: "Osprey vs Gregory" },
];

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Practical hiking and backpacking gear picks",
      description:
        "Trailkit picks tents, pads, packs, boots, stoves, and shells for a real constraint: budget, weight, weather, width, or a first night out.",
      path: "/",
      image: "/images/home-hero.jpg",
    }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="relative min-h-[28rem] border-b border-line">
        <img
          src="/images/home-hero.jpg"
          alt="Overcast forest trail with switchbacks and damp rock"
          width={1400}
          height={788}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-on-forest">
          <p className="font-display text-xs tracking-widest uppercase">Field kit · Constraint first</p>
          <h1 className="mt-2 max-w-3xl text-4xl text-on-forest md:text-5xl">Gear picks for the trip you are actually taking</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Tents, sleep systems, packs, footwear, stoves, and shells matched to budget, weight, weather, and fit. Not a generic top ten.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.href}>
                <a href={chip.href} className="inline-flex min-h-11 items-center border border-on-forest bg-forest-deep/40 px-3 font-display text-sm tracking-wide text-on-forest uppercase">
                  {chip.label}
                </a>
              </li>
            ))}
          </ul>
          <form
            className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              const q = String(new FormData(event.currentTarget).get("q") ?? "");
              navigate({ to: "/browse", search: { q, cat: "" } });
            }}
          >
            <label className="sr-only" htmlFor="q">Search gear and guides</label>
            <input id="q" name="q" suppressHydrationWarning placeholder="Try wide feet, quilt, or headlamp" className="min-h-11 flex-1 border border-line bg-paper px-3 text-ink" />
            <button type="submit" className="min-h-11 border border-on-forest bg-ink px-4 font-display font-semibold tracking-wide text-on-forest uppercase">Search</button>
          </form>
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
            <CardGrid items={kits.slice(0, 8).map((k) => ({ href: `/kits/${k.slug}`, title: k.name, text: k.description, kicker: "Kit" }))} />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Guides</h2>
          <div className="mt-4">
            <CardGrid items={guides.slice(0, 6).map((g) => ({ href: `/guides/${g.slug}`, title: g.h1, text: g.description, kicker: "Guide" }))} />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Field notes</h2>
          <p className="mt-2 max-w-2xl text-muted">Short references for the words on the spec sheet: R-value, declination, fill power, and the rest.</p>
          <div className="mt-4">
            <CardGrid items={notes.slice(0, 6).map((n) => ({ href: `/learn/${n.slug}`, title: n.h1, text: n.description, kicker: "Field note" }))} />
          </div>
        </section>
      </div>
    </main>
  );
}
