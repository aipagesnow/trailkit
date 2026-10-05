import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/affiliate";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: pageTitle("Privacy") },
      { name: "description", content: "Privacy notes for Trailkit. Search stays in your browser session." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-4xl">Privacy</h1>
      <p>Search and filters run in the page. Trailkit does not ask you to create an account to read a guide.</p>
      <p>Amazon and other sites you open from a product button have their own policies. An affiliate tag tells Amazon the click came from this site. It does not give Trailkit your Amazon account.</p>
    </main>
  ),
});
