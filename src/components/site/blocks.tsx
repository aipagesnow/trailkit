import { Link } from "@tanstack/react-router";
import { amazonUrl, DISCLOSURE, UPDATED } from "@/lib/affiliate";
import type { Faq, Product } from "@/data/types";
import type { LinkItem } from "@/data";

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <p className="text-sm text-muted">
      <Link to="/" className="text-muted">Home</Link>
      {items.map((item) => (
        <span key={item.label}>
          {" / "}
          {item.href ? <a href={item.href} className="text-muted">{item.label}</a> : item.label}
        </span>
      ))}
    </p>
  );
}

export function Disclosure() {
  return <p className="rounded-md border border-cream-line bg-cream px-3 py-2 text-sm text-muted">{DISCLOSURE} Check the current price before you buy.</p>;
}

export function AmazonButton({ query, label = "Check current price on Amazon" }: { query: string; label?: string }) {
  return (
    <div className="mt-3">
      <a href={amazonUrl(query)} rel="sponsored nofollow noopener" target="_blank" className="inline-flex min-h-11 items-center rounded-md bg-amber px-4 font-bold text-on-amber">
        {label}
      </a>
      <p className="mt-1 text-sm text-muted">Price is not listed here. The listing has the current price, size, and shipping.</p>
    </div>
  );
}

export function CompareTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-card">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead className="bg-forest-deep text-on-forest">
          <tr>
            <th className="px-3 py-2 font-semibold">Pick</th>
            <th className="px-3 py-2 font-semibold">Price band</th>
            <th className="px-3 py-2 font-semibold">Weight</th>
            <th className="px-3 py-2 font-semibold">Best for</th>
            <th className="px-3 py-2 font-semibold">Limitation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.slug} className="border-t border-line">
              <td className="px-3 py-2"><Link to="/products/$slug" params={{ slug: p.slug }} className="font-bold text-forest">{p.name}</Link></td>
              <td className="px-3 py-2">{p.priceBand}</td>
              <td className="px-3 py-2">{p.weight}</td>
              <td className="px-3 py-2">{p.bestFor}</td>
              <td className="px-3 py-2">{p.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-sm text-muted">Scroll sideways on a phone. Bands are typical street ranges, not live prices.</p>
    </div>
  );
}

export function ProductSection({ product, index }: { product: Product; index: number }) {
  return (
    <section id={product.slug} className="rounded-lg border border-line bg-card p-4">
      <p className="text-xs font-bold tracking-widest text-amber-deep uppercase">{product.role}</p>
      <h3 className="mt-1 text-2xl">
        <a href={`/products/${product.slug}`} className="text-ink">{index}. {product.name}</a>
      </h3>
      <p className="mt-2 max-w-3xl">{product.body}</p>
      <p className="mt-2 max-w-3xl"><span className="font-bold">Who should buy it. </span>{product.who}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold tracking-wide text-forest uppercase">Pros</h4>
          <ul className="mt-1 list-disc pl-5 text-sm">{product.pros.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-wide text-amber-deep uppercase">Cons</h4>
          <ul className="mt-1 list-disc pl-5 text-sm">{product.cons.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <AmazonButton query={product.query} />
    </section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <section>
      <h2 className="text-3xl">FAQ</h2>
      <div className="mt-2 divide-y divide-line">
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
            <a href={link.href} className="block rounded-lg border border-line bg-card p-4 text-ink">
              <span className="text-xs font-bold tracking-widest text-amber-deep uppercase">{link.kind}</span>
              <span className="mt-1 block font-serif text-xl">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Updated({ read }: { read?: string }) {
  return <p className="text-sm text-muted">Updated {UPDATED}{read ? ` · ${read}` : ""} · Trailkit editors</p>;
}

export function CardGrid({ items }: { items: { href: string; title: string; text: string; kicker?: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="flex h-full flex-col rounded-lg border border-line bg-card p-4 text-ink">
            {item.kicker ? <span className="text-xs font-bold tracking-widest text-amber-deep uppercase">{item.kicker}</span> : null}
            <span className="mt-1 font-serif text-xl">{item.title}</span>
            <span className="mt-2 text-sm text-muted">{item.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
