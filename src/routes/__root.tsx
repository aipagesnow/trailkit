import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PageShell } from "@/components/site/chrome";
import { BRAND } from "@/lib/affiliate";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${BRAND}: practical hiking and backpacking gear` },
      { name: "theme-color", content: "#10281e" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;560;650;700&family=Fraunces:opsz,wght@9..144,560;9..144,680&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: () => (
    <PageShell>
      <Outlet />
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-bold tracking-widest text-amber-deep uppercase">404</p>
        <h1 className="mt-2 text-4xl text-ink">That page is not on the map</h1>
        <p className="mt-3 text-muted">
          Try the gear library, or start from the home page. The URL may have moved when a guide was renamed.
        </p>
        <a href="/" className="mt-6 inline-block font-bold text-forest underline">
          Back to Trailkit home
        </a>
      </main>
    </PageShell>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>{children}</AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
