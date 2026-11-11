import { createFileRoute, Link } from "@tanstack/react-router";
import { htmlSitemapGroups } from "@/lib/sitemaps";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    pageHead({
      title: "All pages",
      description: "A complete list of pages on Trailkit Outdoor.",
      path: "/sitemap",
    }),
  component: SitemapPage,
});

function SitemapPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">All pages</h1>
      <p>Every indexable page on Trailkit Outdoor, grouped by section.</p>
      {htmlSitemapGroups().map((group) => (
        <section key={group.heading} className="space-y-2 pt-4">
          <h2 className="text-2xl">{group.heading}</h2>
          <ul className="list-disc space-y-1 pl-5">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-bold text-forest underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
