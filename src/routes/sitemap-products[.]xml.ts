import { createFileRoute } from "@tanstack/react-router";
import { productsPaths, urlsetXml, xmlResponse } from "@/lib/sitemaps";

export const Route = createFileRoute("/sitemap-products.xml")({
  server: {
    handlers: {
      GET: () => xmlResponse(urlsetXml(productsPaths())),
    },
  },
});
