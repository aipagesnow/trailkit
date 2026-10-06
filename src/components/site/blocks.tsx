import { Link } from "@tanstack/react-router";
import { amazonTag, DISCLOSURE, DISCLOSURE_SHORT, UPDATED } from "@/lib/affiliate";
import { asinFor } from "@/data/asins";
import { alternativeFor } from "@/data/amazon-alternatives";
import { getProduct, type LinkItem } from "@/data";
import type { Faq, Product } from "@/data/types";
import { Thumb } from "@/components/site/cards";
import { TkImage } from "@/components/site/tk-image";

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-display text-sm tracking-wide break-words text-muted uppercase">
      <Link to="/" className="text-forest">Home</Link>
      {items.map((item) => (
        <span key={item.label}>
          {" / "}
          {item.href ? <a href={item.href} className="text-forest">{item.label}</a> : item.label}
        </span>
      ))}
    </nav>
  );
}

export function Disclosure() {
  return (
    <p className="border-y border-line py-2 text-sm text-muted">
      {DISCLOSURE_SHORT}{" "}
      <a href="/disclosure" className="font-bold text-forest underline">Full disclosure</a>
    </p>
  );
}

export function AmazonLink({
  asin,
  trackProduct,
  label,
  variant,
  className = "",
}: {
  asin: string;
  trackProduct: string;
  label: string;
  variant: "blaze" | "outline";
  className?: string;
}) {
  const toneClass =
    variant === "blaze"
      ? "inline-flex min-h-11 max-w-full items-center justify-center bg-blaze px-3 font-display text-sm font-semibold tracking-wide text-on-amber uppercase sm:px-4 sm:text-base"
      : "inline-flex min-h-11 max-w-full items-center justify-center border border-ink bg-paper px-3 font-display text-sm font-semibold tracking-wide text-ink uppercase sm:px-4 sm:text-base";
  return (
    <a
      href={`https://www.amazon.com/dp/${asin}?tag=${amazonTag()}`}
      rel="sponsored nofollow noopener"
      target="_blank"
      className={`${toneClass} ${className}`}
      onClick={() => {
        try {
          const send = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
          if (typeof send !== "function") return;
          send("event", "amazon_click", {
            site: "trailkit",
            asin,
            product: trackProduct,
            page: window.location.pathname,
          });
        } catch {
          /* tracking must not stop the link */
        }
      }}
    >
      {label}
    </a>
  );
}

export function AmazonButton({
  product,
  onProductPage = false,
  pageSlugs,
}: {
  product: Product;
  onProductPage?: boolean;
  pageSlugs?: string[];
}) {
  const asin = asinFor(product.slug);
  if (!asin) {
    const alt = alternativeFor(product.slug);
    if (alt && product.slug !== "helium" && pageSlugs) {
      const hit = pageSlugs.findIndex((slug) => slug !== product.slug && (alt.productSlug === slug || asinFor(slug) === alt.asin));
      if (hit >= 0) {
        const other = getProduct(pageSlugs[hit] ?? "");
        return (
          <p className="mt-3 text-sm text-muted">
            Not sold on Amazon US. The closest match,{" "}
            <a href={`#${pageSlugs[hit]}`} className="font-bold text-forest underline">{other?.name ?? alt.name}</a>
            , is #{hit + 1} on this list.
          </p>
        );
      }
    }
    if (!alt) {
      if (!onProductPage) return null;
      return <p className="mt-3 text-sm text-muted">Not sold on Amazon US. Check the maker's own site.</p>;
    }
    return (
      <div className="mt-3">
        <p className="text-sm text-muted">Not sold on Amazon US.</p>
        <div className="mt-3 border-l-4 border-line pl-3 text-sm">
          <p>
            <strong>Closest on Amazon:</strong>{" "}
            {alt.productSlug ? (
              <Link to="/products/$slug" params={{ slug: alt.productSlug }} className="font-bold text-forest underline">
                {alt.name}
              </Link>
            ) : (
              alt.name
            )}
            . {alt.reason}
          </p>
          <div className="mt-2">
            <AmazonLink
              asin={alt.asin}
              trackProduct={`alt:${product.slug}`}
              label={`See ${alt.short} on Amazon`}
              variant="outline"
            />
            <p className="mt-1 text-sm text-muted">Check current price on the listing.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-3">
      <AmazonLink asin={asin} trackProduct={product.slug} label="See on Amazon" variant="blaze" />
      <p className="mt-1 text-sm text-muted">Check current price on the listing.</p>
    </div>
  );
}

/** First slug with a verified main ASIN. Never a Closest / alternative listing. */
function mainListing(slugs: string[]) {
  for (let i = 0; i < slugs.length; i++) {
    const product = getProduct(slugs[i] ?? "");
    if (product && asinFor(product.slug)) return { product, isDefault: i === 0 };
  }
  return undefined;
}

export function EarlyListingCta({ slugs, kind }: { slugs: string[]; kind: "roundup" | "kit" }) {
  const listing = mainListing(slugs);
  if (!listing) return null;
  const { product, isDefault } = listing;
  const line = kind === "kit"
    ? (isDefault ? `${product.name}, from this kit.` : `From this kit on Amazon: ${product.name}.`)
    : (isDefault ? `Start here: ${product.name}.` : `The start-here pick isn't sold on Amazon US. From this list, the ${product.name} is.`);
  return (
    <div className="border border-line bg-paper p-4">
      <p className="max-w-3xl text-sm">{line}</p>
      <AmazonButton product={product} />
    </div>
  );
}

/** Hub CTA. Sits outside card links. allowLater is for kits; roundup hubs pass false so a missing default is skipped. */
export function HubListing({
  slugs,
  allowLater = false,
  skipAsins,
}: {
  slugs: string[];
  allowLater?: boolean;
  skipAsins?: ReadonlySet<string>;
}) {
  let listing: { product: Product; isDefault: boolean } | undefined;
  if (allowLater) {
    for (let i = 0; i < slugs.length; i++) {
      const product = getProduct(slugs[i] ?? "");
      const asin = product ? asinFor(product.slug) : undefined;
      if (!product || !asin || skipAsins?.has(asin)) continue;
      listing = { product, isDefault: i === 0 };
      break;
    }
  } else {
    const product = getProduct(slugs[0] ?? "");
    if (product && asinFor(product.slug)) listing = { product, isDefault: true };
  }
  if (!listing) return null;
  const asin = asinFor(listing.product.slug);
  if (!asin) return null;
  return (
    <div className="mt-2 border border-line bg-paper p-3">
      <p className="text-sm">{listing.isDefault ? listing.product.name : `From this kit: ${listing.product.name}`}</p>
      <div className="mt-2">
        <AmazonLink asin={asin} trackProduct={listing.product.slug} label="See on Amazon" variant="blaze" />
      </div>
      <p className="mt-1 text-sm text-muted">Check current price on the listing.</p>
    </div>
  );
}

export function StickyAmazon({ slugs, kind }: { slugs: string[]; kind: "product" | "roundup" | "kit" }) {
  const listing = mainListing(slugs);
  if (!listing) return null;
  const asin = asinFor(listing.product.slug);
  if (!asin) return null;
  const { product, isDefault } = listing;
  const kicker = kind === "product" || (kind === "kit" && isDefault)
    ? product.name
    : kind === "roundup" && isDefault
      ? `Start here · ${product.name}`
      : kind === "roundup"
        ? `From this list · ${product.name}`
        : `From this kit · ${product.name}`;
  return (
    <>
      <div className="h-36 md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
        <p className="truncate text-sm">{kicker}</p>
        <div className="mt-1">
          <AmazonLink asin={asin} trackProduct={product.slug} label="See on Amazon" variant="blaze" className="w-full" />
        </div>
        <p className="mt-1 text-xs text-muted">Check current price on the listing.</p>
      </div>
    </>
  );
}

export function CompareTable({ products }: { products: Product[] }) {
  return (
    <div className="min-w-0 max-w-full">
      <p className="mb-1 font-display text-xs tracking-widest text-muted uppercase">Scroll →</p>
      <div className="max-w-full overflow-x-auto overscroll-x-contain border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm sm:min-w-[40rem]">
          <thead className="bg-forest-deep text-on-forest">
            <tr>
              <th className="sticky left-0 bg-forest-deep px-3 py-2 font-display font-semibold">Pick</th>
              <th className="px-3 py-2 font-display font-semibold">Price band</th>
              <th className="px-3 py-2 font-display font-semibold">Weight</th>
              <th className="px-3 py-2 font-display font-semibold">Best for</th>
              <th className="px-3 py-2 font-display font-semibold">Limitation</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.slug} className={index % 2 ? "border-t border-line bg-spec" : "border-t border-line"}>
                <td className="sticky left-0 bg-paper px-3 py-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <Thumb route={`/products/${p.slug}`} tone="money" />
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="min-w-0 font-bold break-words text-ink">{p.name}</Link>
                  </span>
                </td>
                <td className="px-3 py-2">{p.priceBand}</td>
                <td className="px-3 py-2 font-mono text-xs">{p.weight}</td>
                <td className="px-3 py-2">{p.bestFor}</td>
                <td className="px-3 py-2">{p.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1 text-sm text-muted">Bands are typical street ranges, not live prices.</p>
    </div>
  );
}

export function ProductSection({
  product,
  index,
  tone = "field",
  pageSlugs,
}: {
  product: Product;
  index: number;
  tone?: "field" | "money";
  pageSlugs?: string[];
}) {
  const top = index === 1;
  return (
    <section id={product.slug} className="border border-line bg-paper p-4">
      <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden border border-line">
          <TkImage route={`/products/${product.slug}`} fill sizes="280px" tone={tone} />
          <span className={`absolute top-2 left-2 inline-flex size-8 items-center justify-center border font-display text-sm font-bold ${top ? "border-blaze bg-blaze text-on-amber" : "border-ink bg-paper text-ink"}`}>
            {index}
          </span>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-widest uppercase">{product.role}</p>
          <h3 className="mt-1 text-2xl">
            <a href={`/products/${product.slug}`} className="text-ink">{product.name}</a>
          </h3>
          <p className="mt-3 max-w-3xl">{product.body}</p>
          <p className="mt-2 max-w-3xl"><span className="font-bold">Who should buy it. </span>{product.who}</p>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="border border-line bg-spec p-3">
          <h4 className="font-display text-sm tracking-wide uppercase">Pros</h4>
          <ul className="mt-1 list-disc pl-5 text-sm">{product.pros.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="border border-line p-3">
          <h4 className="font-display text-sm tracking-wide uppercase">Cons</h4>
          <ul className="mt-1 list-disc pl-5 text-sm">{product.cons.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <AmazonButton product={product} pageSlugs={pageSlugs} />
    </section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;
  return (
    <section>
      <h2 className="text-3xl">FAQ</h2>
      <div className="mt-2 divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.q} className="py-3">
            <summary className="cursor-pointer font-bold">{faq.q}</summary>
            <p className="mt-2 max-w-3xl text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Related({ links }: { links: LinkItem[] }) {
  if (!links.length) return null;
  return (
    <section>
      <h2 className="text-3xl">Related</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="block h-full border border-line bg-paper p-4 text-ink">
              <span className="font-display text-xs tracking-widest uppercase">{link.kind}</span>
              <span className="mt-1 block font-display text-xl">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Updated({ read }: { read?: string }) {
  return <p className="font-mono text-xs text-muted">Updated {UPDATED}{read ? ` · ${read}` : ""}</p>;
}

export function CardGrid({ items }: { items: { href: string; title: string; text: string; kicker?: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="flex h-full flex-col border border-line bg-paper p-4 text-ink">
            {item.kicker ? <span className="font-display text-xs tracking-widest uppercase">{item.kicker}</span> : null}
            <span className="mt-1 font-display text-xl">{item.title}</span>
            <span className="mt-2 text-sm text-muted">{item.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function FieldImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={1400}
      height={788}
      fetchPriority="high"
      className="aspect-[16/9] w-full border border-line object-cover"
    />
  );
}

export function PageToc({ links }: { links: { href: string; label: string }[] }) {
  const list = (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className="block py-1 text-ink hover:text-forest">{link.label}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <details className="border border-line bg-paper p-3 lg:hidden">
        <summary className="cursor-pointer font-display text-sm tracking-widest uppercase">On this page</summary>
        <nav className="mt-2 text-sm">{list}</nav>
      </details>
      <nav aria-label="On this page" className="hidden text-sm lg:sticky lg:top-4 lg:block lg:self-start">
        <p className="font-display text-xs tracking-widest text-muted uppercase">On this page</p>
        <div className="mt-2">{list}</div>
      </nav>
    </>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />;
}

export { DISCLOSURE };
