import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description: "How to reach Trailkit Outdoor about a correction, a broken link or a privacy question, and what we can and can't help with.",
      path: "/contact",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Contact</h1>
      <p>You can email us at{" "}
        <a className="font-bold text-forest" href="mailto:vora+trailkit@mail.grokbot.com">vora+trailkit@mail.grokbot.com</a>.
        Trailkit Outdoor is published by Aivora Digital, and this inbox goes to the people who edit the site.
      </p>
      <h2 className="text-2xl">What we can help with</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>A spec, weight or rating you think is wrong. Send us the page URL, the figure and where you saw the right one, and we'll check it against the maker's published spec and fix the page if we got it wrong.</li>
        <li>A broken link, or an Amazon button that opens the wrong product.</li>
        <li>A question about your data or this site's cookies. The <a className="font-bold text-forest underline" href="/privacy">privacy page</a> explains what's collected.</li>
      </ul>
      <h2 className="text-2xl">What we can't help with</h2>
      <p>We don't sell anything ourselves, so we can't help with an order, a delivery, a return or a warranty. For those, you'll want the store you bought from or the maker. We also can't give personal advice beyond what's on the site.</p>
      <p>We don't accept payment for a place in a ranked list, and we don't take free gear in return for coverage.</p>
      <p>We read every message, but we're a small team, so a reply can take a few working days.</p>
    </main>
  ),
});
