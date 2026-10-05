import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { BRAND, DISCLOSURE } from "@/lib/affiliate";
import { categories } from "@/data";

const links = [
  { to: "/best", label: "Roundups" },
  { to: "/guides", label: "Guides" },
  { to: "/learn", label: "Field notes" },
  { to: "/compare", label: "Compare" },
  { to: "/kits", label: "Kits" },
  { to: "/browse", label: "All gear" },
] as const;

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:bg-ink focus:px-3 focus:py-2 focus:text-on-forest">
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
    <header className="border-b-4 border-amber bg-forest-deep text-on-forest">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-on-forest">
          {BRAND}
          <span className="text-amber">.</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              search={item.to === "/browse" ? { q: "", cat: "" } : undefined}
              className="text-on-forest hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/browse" search={{ q: "", cat: "" }} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-amber px-3 font-bold text-on-amber">
            <Search className="size-4" aria-hidden />
            Search
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-on-forest text-on-forest md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-forest px-4 py-3 md:hidden">
          <ul className="grid gap-1">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  search={item.to === "/browse" ? { q: "", cat: "" } : undefined}
                  className="block py-2 text-on-forest"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-3 grid grid-cols-2 gap-x-3 border-t border-forest pt-3">
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
      <div className="hidden border-t border-forest md:block">
        <ul className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-2 text-sm">
          {categories.map((cat) => (
            <li key={cat.slug} className="shrink-0">
              <Link to="/gear/$slug" params={{ slug: cat.slug }} className="text-on-forest hover:text-cream">
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
          <p className="font-serif text-xl">{BRAND}</p>
          <p className="mt-3 text-sm leading-relaxed text-on-forest">{DISCLOSURE}</p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Read</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/library" className="text-cream">Full library</Link></li>
            <li><Link to="/learn" className="text-cream">Field notes</Link></li>
            <li><Link to="/gear" className="text-cream">Categories</Link></li>
            <li><Link to="/editorial" className="text-cream">Editorial standards</Link></li>
            <li><Link to="/about" className="text-cream">About</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-bold">Fine print</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/disclosure" className="text-cream">Affiliate disclosure</Link></li>
            <li><Link to="/privacy" className="text-cream">Privacy</Link></li>
            <li><Link to="/contact" className="text-cream">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
