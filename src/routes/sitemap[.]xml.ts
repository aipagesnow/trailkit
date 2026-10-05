import { createFileRoute } from "@tanstack/react-router";
import { categories, compares, guides, kits, notes, products, roundups } from "@/data";

const staticPaths = [
  "/",
  "/best",
  "/guides",
  "/compare",
  "/kits",
  "/gear",
  "/library",
  "/browse",
  "/learn",
  "/about",
  "/editorial",
  "/disclosure",
  "/privacy",
  "/contact",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          ...staticPaths,
          ...categories.map((c) => `/gear/${c.slug}`),
          ...roundups.map((r) => `/best/${r.slug}`),
          ...guides.map((g) => `/guides/${g.slug}`),
          ...compares.map((c) => `/compare/${c.slug}`),
          ...kits.map((k) => `/kits/${k.slug}`),
          ...notes.map((n) => `/learn/${n.slug}`),
          ...products.map((p) => `/products/${p.slug}`),
        ];
        const urls = paths
          .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
          .join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
