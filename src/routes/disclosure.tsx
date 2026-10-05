import { createFileRoute } from "@tanstack/react-router";
import { DISCLOSURE } from "@/lib/affiliate";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/disclosure")({
  head: () =>
    pageHead({
      title: "Affiliate disclosure",
      description: "Amazon Associates disclosure for Trailkit.",
      path: "/disclosure",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Affiliate disclosure</h1>
      <p>{DISCLOSURE}</p>
      <p>A recommendation is not a promise of price, stock, or fit. Check the current listing, including size and width.</p>
    </main>
  ),
});
