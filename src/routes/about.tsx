import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/lib/affiliate";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: `About ${BRAND}`,
      description: "Trailkit publishes practical outdoor gear recommendations for hiking, backpacking, and car camping.",
      path: "/about",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">About {BRAND}</h1>
      <p>Trailkit is a gear guide for people who already know the activity and need the product that fits a constraint: budget, weight, weather, width, or trip length. It covers hiking, backpacking, and car camping in the United States, and the buy buttons go to Amazon.com.</p>
      <p>The site is organized the way a packing list is organized. A roundup answers one buying question and names one default. A comparison is two options and the job that separates them. A kit is a short list for a kind of trip. A field note is the word on the spec sheet, defined without a sales pitch. A category page is the decision, then the gear that belongs to it.</p>
      <p>We are not a lab and we do not invent test scores, star ratings, or live prices. Weights, temperature classes, and R-values are the published ones, and a model year can change them. When a comparison is illustrative, the page says so. When an Amazon listing is not verified, the button is withheld instead of sending you to a search results page.</p>
      <p>Pages are updated when the constraint or the model lineup changes, not on a content calendar for its own sake. The date shown on a roundup is its last editorial pass. Corrections are welcome through the <a href="/contact" className="font-bold text-forest underline">contact page</a>.</p>
    </main>
  ),
});
