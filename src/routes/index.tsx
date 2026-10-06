import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { categories, getCompare, getGuide, getKit, getNote, getProduct, getRoundup, products, roundups } from "@/data";
import { asinFor } from "@/data/asins";
import { CategoryTile, FieldCard, GuideCard, HowWePick, KitCard, NotePlate, VersusCard } from "@/components/site/cards";
import { AmazonButton, Disclosure } from "@/components/site/blocks";
import { TkImage } from "@/components/site/tk-image";
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
    }),
  component: Home,
});

function takeRoundup(slug: string) {
  return getRoundup(slug);
}

function Home() {
  const navigate = useNavigate();
  const featured = takeRoundup("backpacking-tents");
  const stacked = ["hiking-boots-wide-feet", "rain-jackets-under-150"].map(takeRoundup).filter((r) => r != null);
  const row = ["backpacking-packs", "sleeping-pads"].map(takeRoundup).filter((r) => r != null);
  const overnight = getGuide("first-overnight");
  const compares = ["microspikes-vs-yaktrax", "actik-vs-spot", "aura-vs-deva"].map((slug) => getCompare(slug)).filter((c) => c != null);
  const kits = ["day-hike", "car-camp-weekend"].map((slug) => getKit(slug)).filter((k) => k != null);
  const guides = ["choose-a-pad", "layering", "boot-fit"].map((slug) => getGuide(slug)).filter((g) => g != null);
  const notes = ["r-value", "fill-power", "freestanding", "wide-last"].map((slug) => getNote(slug)).filter((n) => n != null);
  const shelter = getProduct("msr-elixir-2");
  return (
    <main>
      <section className="relative isolate min-h-[28rem] overflow-hidden border-b border-line">
        <TkImage route="/" priority fill sizes="100vw" />
        <div className="absolute inset-0 bg-forest-deep/70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-6 text-on-forest md:py-16">
          <p className="font-mono text-[11px] tracking-widest uppercase">Hiking and backpacking gear</p>
          <h1 className="mt-2 max-w-3xl text-4xl text-on-forest md:text-5xl">Gear picks for the trip you are actually taking</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Tents, sleep systems, packs, footwear, stoves, and shells matched to budget, weight, weather, and fit. Not a generic top ten.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.href}>
                <a href={chip.href} className="inline-flex min-h-11 items-center border border-on-forest px-3 font-mono text-[11px] tracking-widest uppercase">
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
      <div className="mx-auto max-w-6xl space-y-12 px-4 pt-4 pb-10 md:py-10">
        <div className="space-y-3">
          <Disclosure />
          {shelter && asinFor(shelter.slug) ? (
            <div className="border border-line bg-paper p-4">
              <p className="max-w-2xl">
                Start here for a two-person shelter: the MSR Elixir 2, a freestanding tent and a solid first pick.
              </p>
              <AmazonButton product={shelter} />
            </div>
          ) : null}
        </div>
        <section>
          <h2 className="text-3xl">Start with a decision</h2>
          <p className="mt-2 max-w-2xl text-muted">Each guide starts with a straight answer, a comparison table, and one pick to start with.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {featured ? <FieldCard roundup={featured} index="R-01" featured priority /> : null}
            <div className="grid gap-3">
              {stacked.map((roundup, i) => (
                <FieldCard key={roundup.slug} roundup={roundup} index={`R-0${i + 2}`} priority={i === 0} />
              ))}
            </div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {overnight ? <GuideCard guide={overnight} tile /> : null}
            {row.map((roundup, i) => (
              <FieldCard key={roundup.slug} roundup={roundup} index={`R-0${i + 4}`} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Categories</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
            {categories.map((category, i) => (
              <CategoryTile
                key={category.slug}
                category={category}
                items={products.filter((p) => p.category === category.slug).length}
                roundups={roundups.filter((r) => r.category === category.slug || r.productSlugs.some((slug) => products.find((p) => p.slug === slug)?.category === category.slug)).length}
                priority={i < 5}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Compare</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {compares.map((compare) => (
              <VersusCard key={compare.slug} compare={compare} />
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl">Kits for a kind of trip</h2>
            <a href="/kits" className="font-mono text-[11px] tracking-widest uppercase">All 14 kits</a>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {kits.map((kit) => (
              <KitCard key={kit.slug} kit={kit} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Guides</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {overnight ? <GuideCard guide={overnight} featured stretch /> : null}
            <div className="grid gap-3">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-3xl">Field notes</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {notes.map((note, i) => (
              <NotePlate key={note.slug} note={note} index={String(i + 1).padStart(2, "0")} />
            ))}
          </div>
        </section>
        <HowWePick />
      </div>
    </main>
  );
}
