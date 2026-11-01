import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy",
      description: "What Trailkit Outdoor collects: Google Analytics 4 only if you accept the cookie banner, and Amazon's own cookies if you click through to Amazon.",
      path: "/privacy",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Privacy</h1>
      <p>Short answer: you can read everything here without an account, we don't ask for your name or email, and analytics only run if you say yes. Trailkit Outdoor is published by Aivora Digital.</p>
      <h2 className="text-2xl">Analytics (Google Analytics 4)</h2>
      <p>We use Google Analytics 4 to see which pages help people and which Amazon buttons get clicked. It's off until you choose.</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>On your first visit, a small banner asks whether you're happy with analytics cookies.</li>
        <li>If you click <strong>Reject</strong>, or ignore the banner, the Google Analytics script isn't loaded and no analytics cookies are set.</li>
        <li>If you click <strong>Accept</strong>, Google Analytics 4 loads and sets its first-party cookies, <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>, which Google keeps for up to two years by default. They tell visits apart with a random ID, not your name.</li>
        <li>With analytics on, Google receives things like the pages you view, your rough location from your IP address, your device and browser type, and Amazon button clicks (which product and link). Google processes this under its own <a className="font-bold text-forest underline" href="https://policies.google.com/privacy" rel="noopener noreferrer">privacy policy</a>. Ad features (ad storage and personalisation) stay switched off.</li>
      </ul>
      <p>Your choice is saved in your browser's local storage (key <code>site-consent</code>), not in a cookie, so the banner doesn't keep coming back. To change your mind, clear this site's data in your browser settings and the banner will ask again. You can also delete the <code>_ga</code> cookies there.</p>
      <h2 className="text-2xl">Amazon</h2>
      <p>When you click through to Amazon, you're on Amazon's site, and Amazon sets its own cookies under its own privacy notice. Our affiliate tag tells Amazon the visit came from Trailkit Outdoor so we can be paid a commission. We don't see your Amazon account, your name or what else is in your basket. Amazon only reports orders and earnings to us in total.</p>
      <h2 className="text-2xl">Everything else</h2>
      <p>Search and filters run in your browser. Fonts are hosted on this site, so no font service sees your visit. Our hosting provider keeps standard server logs, such as IP address and pages requested, to run and secure the site.</p>
      <p>If you email us, we use your address only to reply. Questions about your data go to{" "}
        <a className="font-bold text-forest" href="mailto:vora+trailkit@mail.grokbot.com">vora+trailkit@mail.grokbot.com</a>.
      </p>
    </main>
  ),
});
