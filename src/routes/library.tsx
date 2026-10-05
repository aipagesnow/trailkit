import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { categories, compares, guides, kits, notes, products, roundups } from "@/data";

export const Route = createFileRoute("/library")({
  head: () =>
    pageHead({
      title: "Library",
      description: "Every Trailkit category, roundup, guide, field note, comparison, kit, and gear page.",
      path: "/library",
    }),
  component: LibraryPage,
});

function Group({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <section>
      <h2 className="text-2xl">{title}</h2>
      <ul className="mt-2 columns-1 gap-8 sm:columns-2">
        {items.map((item) => (
          <li key={item.href} className="py-1"><a href={item.href} className="text-forest">{item.label}</a></li>
        ))}
      </ul>
    </section>
  );
}

function LibraryPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <h1 className="text-4xl">Library</h1>
      <p className="max-w-2xl text-muted">Every public page on Trailkit. Use it as a map, not as a ranking.</p>
      <Group title="Categories" items={categories.map((c) => ({ href: `/gear/${c.slug}`, label: c.name }))} />
      <Group title="Roundups" items={roundups.map((r) => ({ href: `/best/${r.slug}`, label: r.h1 }))} />
      <Group title="Guides" items={guides.map((g) => ({ href: `/guides/${g.slug}`, label: g.h1 }))} />
      <Group title="Field notes" items={notes.map((n) => ({ href: `/learn/${n.slug}`, label: n.h1 }))} />
      <Group title="Comparisons" items={compares.map((c) => ({ href: `/compare/${c.slug}`, label: c.h1 }))} />
      <Group title="Kits" items={kits.map((k) => ({ href: `/kits/${k.slug}`, label: k.name }))} />
      <Group title="Gear" items={products.map((p) => ({ href: `/products/${p.slug}`, label: p.name }))} />
    </main>
  );
}
