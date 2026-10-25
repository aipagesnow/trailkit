import { createFileRoute } from "@tanstack/react-router";
import { guidesPaths, urlsetXml, xmlResponse } from "@/lib/sitemaps";

export const Route = createFileRoute("/sitemap-guides.xml")({
  server: {
    handlers: {
      GET: () => xmlResponse(urlsetXml(guidesPaths())),
    },
  },
});
