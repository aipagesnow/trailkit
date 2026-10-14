import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial")({
  head: () =>
    pageHead({
      title: "Editorial standards",
      description: "How Trailkit Outdoor frames gear recommendations, updates pages, and handles affiliate links.",
      path: "/editorial",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Editorial standards</h1>
      <p>Trailkit Outdoor recommends gear by the constraint on your trip. A page exists to answer one job: a wide toe, a first night out, a budget under a stated band, a cold sleeper, a platform campsite, a breezy ridge. If the constraint is wrong, the pick is wrong, even if the product is popular.</p>
      <p>Roundups and comparisons start with a straight answer, a line on who it's for, a comparison, and one pick to start with. The other products are there because a different budget, trip, or fit would choose them, so they aren't ranked from best to worst. Labels such as “best freestanding” describe the job a product suits. They aren't lab awards.</p>
      <p>We don't invent trail tests, instrument scores, or star ratings. We don't publish a hard-coded price. A button says “See on Amazon” and tells you to check the current price on the listing. If the Amazon listing isn't verified for that model, the button is withheld. When the exact model isn't sold on Amazon, we may name the closest listing that is, with a line on how it differs. That listing isn't the pick, and the review above it still describes the original model. We don't fall back to a search URL.</p>
      <p>Specs are the manufacturer’s published classes: weight, temperature rating, R-value, volume, waterproof claim. Model years change those numbers. When a write-up uses an older published class, that's a limit of what we had, not a measurement we took. Illustrative comparisons are labeled as illustrative.</p>
      <p>A kit is a packing list for a kind of trip, not a bundle you have to buy together. Swap a line if the note on the kit says the assumption doesn't match you. A guide explains the decision and points you at the roundup where the buying happens. A field note defines one term the other pages assume.</p>
      <p>Affiliate links use rel sponsored nofollow and open Amazon in a new tab. A commission doesn't buy a place in a ranked list. We don't accept payment for position. The update cadence is the model lineup and the constraint, not a weekly refresh for its own sake. A visible date marks the last editorial pass.</p>
      <p>Corrections are welcome. Include the page and the spec you believe is wrong, and send it through the <a href="/contact" className="font-bold text-forest underline">contact page</a>.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Roundups and comparisons start with a straight answer, a comparison, and one pick to start with.</li>
        <li>No invented test scores. Labels such as "best freestanding" describe the job, not a lab award.</li>
        <li>Prices aren't hard-coded. Buttons say check current price.</li>
        <li>Illustrative comparisons are labeled.</li>
        <li>Affiliate links use rel sponsored nofollow.</li>
        <li>A visible date marks the last editorial pass.</li>
      </ul>
    </main>
  ),
});
