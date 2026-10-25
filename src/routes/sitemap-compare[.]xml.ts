import { createFileRoute } from "@tanstack/react-router";
import { comparePaths, urlsetXml, xmlResponse } from "@/lib/sitemaps";

export const Route = createFileRoute("/sitemap-compare.xml")({
  server: {
    handlers: {
      GET: () => xmlResponse(urlsetXml(comparePaths())),
    },
  },
});
