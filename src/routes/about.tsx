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
      <p>Trailkit is a gear guide for people who already know the activity and need the product that fits a constraint: budget, weight, weather, width, or trip length.</p>
      <p>We are not a lab. Pages say when a model is illustrative. We do not invent test scores. Weights and temperature classes are the published ones, and model years change them.</p>
      <p>The working name and the Amazon tag live in one config so a rebrand does not mean a rewrite of every page.</p>
    </main>
  ),
});
