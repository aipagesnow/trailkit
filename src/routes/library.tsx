import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { categories, compares, guides, kits, notes, products, roundups } from "@/data";
import { HubBand } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";

export const Route = createFileRoute("/library")({
  head: () =>
    pageHead({
      title: "Library",
      description: "Every Trailkit category, roundup, guide, field note, comparison, kit, and gear page.",
      path: "/library",
    }),
  component: LibraryPage,
});

function Peek({ title, href, items }: { title: string; href: string; items: { href: string; label: string; route: string }[] }) {
  return (
    <section>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl">{title}</h2>
        <a href={href} className="font-mono text-[11px] tracking-widest uppercase">View all</a>
      </div>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <li key={item.href}>
            <a href={item.href} className="tk-card group block bg-paper">
              <span className="relative block aspect-[4/3] overflow-hidden">
                <TkImage route={item.route} fill sizes="240px" />
              </span>
              <span className="block p-3 font-display text-lg">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Group({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <section>
      <h2 className="text-2xl">{title}</h2>
      <ul className="mt-2 columns-1 gap-8 sm:columns-2">
        {items.map((item) => (
          <li key={item.href} className="py-1"><a href={item.href}>{item.label}</a></li>
        ))}
      </ul>
    </section>
  );
}

function LibraryPage() {
  return (
    <main>
      <HubBand route="/library" kicker="Library" title="The whole map" promise="An index of every page on the site. The cards are a sample. The lists below are complete." chips={[]} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <Peek title="Roundups" href="/best" items={roundups.slice(0, 3).map((r) => ({ href: `/best/${r.slug}`, label: r.h1, route: `/best/${r.slug}` }))} />
        <Peek title="Guides" href="/guides" items={guides.slice(0, 3).map((g) => ({ href: `/guides/${g.slug}`, label: g.h1, route: `/guides/${g.slug}` }))} />
        <Peek title="Comparisons" href="/compare" items={compares.slice(0, 3).map((c) => ({ href: `/compare/${c.slug}`, label: c.h1, route: `/compare/${c.slug}` }))} />
        <Peek title="Kits" href="/kits" items={kits.slice(0, 3).map((k) => ({ href: `/kits/${k.slug}`, label: k.name, route: `/kits/${k.slug}` }))} />
        <Group title="Categories" items={categories.map((c) => ({ href: `/gear/${c.slug}`, label: c.name }))} />
        <Group title="Roundups" items={roundups.map((r) => ({ href: `/best/${r.slug}`, label: r.h1 }))} />
        <Group title="Guides" items={guides.map((g) => ({ href: `/guides/${g.slug}`, label: g.h1 }))} />
        <Group title="Field notes" items={notes.map((n) => ({ href: `/learn/${n.slug}`, label: n.h1 }))} />
        <Group title="Comparisons" items={compares.map((c) => ({ href: `/compare/${c.slug}`, label: c.h1 }))} />
        <Group title="Kits" items={kits.map((k) => ({ href: `/kits/${k.slug}`, label: k.name }))} />
        <Group title="Gear" items={products.map((p) => ({ href: `/products/${p.slug}`, label: p.name }))} />
      </div>
    </main>
  );
}
