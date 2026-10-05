import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";

export const Route = createFileRoute("/editorial")({
  head: () => ({
    meta: [
      { title: pageTitle("Editorial standards") },
      { name: "description", content: "How Trailkit frames gear recommendations, updates pages, and handles affiliate links." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Editorial standards</h1>
      <ul className="list-disc space-y-2 pl-5">
        <li>Commercial pages lead with a direct answer, a who-it-is-for line, a comparison, and one default pick.</li>
        <li>No invented test scores. Roles such as "best freestanding" are editorial framing.</li>
        <li>Prices are not hard-coded. Buttons say check current price.</li>
        <li>Illustrative comparisons are labeled.</li>
        <li>Affiliate links use rel sponsored nofollow.</li>
        <li>A visible date marks the last editorial pass.</li>
      </ul>
    </main>
  ),
});
