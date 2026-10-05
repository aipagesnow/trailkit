import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PageShell } from "@/components/site/chrome";
import { BRAND } from "@/lib/affiliate";
import appCss from "../styles.css?url";

const gaId = import.meta.env.VITE_GA_ID || import.meta.env.NEXT_PUBLIC_GA_ID || "";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${BRAND}: practical hiking and backpacking gear` },
      { name: "theme-color", content: "#0f1416" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/favicon-32.png", sizes: "32x32" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "icon", type: "image/png", href: "/icon-512.png", sizes: "512x512" },
      { rel: "icon", type: "image/png", href: "/icon-512-maskable.png", sizes: "512x512" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap",
      },
    ],
    scripts: gaId
      ? [
          { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
          {
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
          },
        ]
      : [],
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
        <p className="font-display text-sm tracking-widest uppercase">404</p>
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
