import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { BRAND, DISCLOSURE_SHORT } from "@/lib/affiliate";
import { categories } from "@/data";

const links = [
  { to: "/best", label: "Roundups" },
  { to: "/guides", label: "Guides" },
  { to: "/learn", label: "Field notes" },
  { to: "/compare", label: "Compare" },
  { to: "/kits", label: "Kits" },
  { to: "/browse", label: "All gear" },
] as const;

function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path fill="currentColor" d="M16 2 30 16 16 30 2 16Z" />
      <path fill="#f7f6f2" d="M16 7.2 24.8 16 16 24.8 7.2 16Z" />
      <path fill="#ff5a1f" d="M16 12.2 19.2 16 16 22.4 12.4 16Z" />
    </svg>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Header />
      <div id="content">{children}</div>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-line bg-forest-deep text-on-forest">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-on-forest">
          <Mark />
          {BRAND}
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              search={item.to === "/browse" ? { q: "", cat: "" } : undefined}
              className="font-display tracking-wide text-on-forest uppercase hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/browse" search={{ q: "", cat: "" }} className="inline-flex min-h-11 items-center gap-2 border border-on-forest px-3 font-display tracking-wide text-on-forest uppercase">
            <Search className="size-4" aria-hidden />
            Search
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-on-forest text-on-forest md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-line/30 px-4 py-3 md:hidden">
          <ul className="grid gap-1">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  search={item.to === "/browse" ? { q: "", cat: "" } : undefined}
                  className="block min-h-11 py-2 font-display tracking-wide text-on-forest uppercase"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 border-t border-line/30 pt-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to="/gear/$slug" params={{ slug: cat.slug }} className="block min-h-11 py-2 text-on-forest" onClick={() => setOpen(false)}>
                  {cat.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <div className="hidden border-t border-line/30 md:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-4 gap-y-1 px-4 py-2 text-sm">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link to="/gear/$slug" params={{ slug: cat.slug }} className="font-display tracking-wide text-on-forest uppercase hover:underline">
                {cat.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-forest-deep text-on-forest">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="inline-flex items-center gap-2 font-display text-xl">
            <Mark />
            {BRAND}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-on-forest">
            {DISCLOSURE_SHORT}{" "}
            <Link to="/disclosure" className="underline">Full disclosure</Link>
          </p>
        </div>
        <div className="text-sm">
          <p className="font-display tracking-wide uppercase">Read</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/library" className="underline">Full library</Link></li>
            <li><Link to="/learn" className="underline">Field notes</Link></li>
            <li><Link to="/gear" className="underline">Categories</Link></li>
            <li><Link to="/editorial" className="underline">Editorial standards</Link></li>
            <li><Link to="/about" className="underline">About</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-display tracking-wide uppercase">Fine print</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/disclosure" className="underline">Affiliate disclosure</Link></li>
            <li><Link to="/privacy" className="underline">Privacy</Link></li>
            <li><Link to="/contact" className="underline">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
