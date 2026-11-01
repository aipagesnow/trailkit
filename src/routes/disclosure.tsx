import { createFileRoute } from "@tanstack/react-router";
import { DISCLOSURE } from "@/lib/affiliate";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/disclosure")({
  head: () =>
    pageHead({
      title: "Affiliate disclosure",
      description: "How Trailkit Outdoor earns money: Amazon Associates affiliate links that pay a commission at no extra cost to you.",
      path: "/disclosure",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Affiliate disclosure</h1>
      <p>{DISCLOSURE}</p>
      <p>Short answer: when you click an Amazon button or link here and buy something, Amazon may pay us a small commission. It doesn't cost you anything extra. You pay the same price you'd pay going to Amazon directly.</p>
      <h2 className="text-2xl">Where the links are</h2>
      <p>Affiliate links are the "See on Amazon" buttons and Amazon links on our roundups, comparisons, kits, guides and product notes. Every page with those links carries a short disclosure line near the top, and it links back here.</p>
      <h2 className="text-2xl">What the commission doesn't change</h2>
      <p>Commission rates don't decide which gear we pick or the order it's in. We pick for a real limit on your trip, like budget, weight, weather or fit, using the maker's published specs. No brand pays for a place on a list. You can read more in our <a className="font-bold text-forest underline" href="/editorial">editorial standards</a>.</p>
      <p>Amazon is the only affiliate program we use right now. If a product isn't sold on Amazon US, we say so rather than linking a search page.</p>
      <h2 className="text-2xl">Prices and stock</h2>
      <p>We don't publish live prices. A recommendation isn't a promise of price, stock or fit, so check the current listing, including size and width, before you buy.</p>
    </main>
  ),
});
