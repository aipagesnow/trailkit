import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy",
      description: "Privacy notes for Trailkit Outdoor. Search stays in your browser session.",
      path: "/privacy",
    }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Privacy</h1>
      <p>Search and filters run in the page. Trailkit Outdoor does not ask you to create an account to read a guide.</p>
      <p>Amazon and other sites you open from a product button have their own policies. An affiliate tag tells Amazon the click came from this site. It does not give Trailkit your Amazon account.</p>
    </main>
  ),
});
