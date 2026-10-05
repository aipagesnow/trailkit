import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: pageTitle("Contact") },
      { name: "description", content: "Contact Trailkit about corrections." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Contact</h1>
      <p>Corrections are welcome. Include the page and the spec you believe is wrong.</p>
      <p><a className="font-bold text-forest" href="mailto:hello@trailkit.example">hello@trailkit.example</a></p>
      <p>We do not accept payment for a place in a ranked list.</p>
    </main>
  ),
});
