import { createFileRoute } from "@tanstack/react-router";
import { bestPaths, urlsetXml, xmlResponse } from "@/lib/sitemaps";

export const Route = createFileRoute("/sitemap-best.xml")({
  server: {
    handlers: {
      GET: () => xmlResponse(urlsetXml(bestPaths())),
    },
  },
});
