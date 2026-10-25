import { createFileRoute } from "@tanstack/react-router";
import { CHILD_SITEMAP_PATHS, sitemapIndexXml, xmlResponse } from "@/lib/sitemaps";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => xmlResponse(sitemapIndexXml([...CHILD_SITEMAP_PATHS])),
    },
  },
});
