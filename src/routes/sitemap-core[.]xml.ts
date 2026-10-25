import { createFileRoute } from "@tanstack/react-router";
import { corePaths, urlsetXml, xmlResponse } from "@/lib/sitemaps";

export const Route = createFileRoute("/sitemap-core.xml")({
  server: {
    handlers: {
      GET: () => xmlResponse(urlsetXml(corePaths())),
    },
  },
});
