import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description: "Contact Aivora Digital about a Trailkit correction.",
      path: "/contact",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Contact</h1>
      <p>Trailkit is published by Aivora Digital. This address is the editorial contact for corrections. Include the page URL and the spec you believe is wrong.</p>
      <p>
        <a className="font-bold text-forest" href="mailto:aivora@agentmail.to">aivora@agentmail.to</a>
      </p>
      <p>We do not accept payment for a place in a ranked list.</p>
    </main>
  ),
});
