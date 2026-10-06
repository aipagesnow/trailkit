import { UPDATED } from "@/lib/affiliate";
import { asinFor } from "@/data/asins";
import { getCategory, getProduct, linksFor } from "@/data";
import type { Category, Compare, Guide, Kit, Product, Roundup } from "@/data/types";
import { TkImage } from "@/components/site/tk-image";

const UPDATED_MONO = "OCT 2026";

export function HowWePick() {
  return (
    <aside className="border border-line bg-spec p-4 text-sm">
      <p className="font-mono text-[11px] tracking-widest uppercase">How we pick</p>
      <ul className="mt-2 space-y-1">
        <li>Start from the constraint: budget, weight, weather, width, or trip length.</li>
        <li>No invented trail tests or scores. Specs are the published ones, and model years change them.</li>
        <li>One default pick is named. The other picks are for a different constraint, not a ranking ladder.</li>
      </ul>
      <a href="/editorial" className="mt-2 inline-block font-bold underline">Editorial standards</a>
      <p className="mt-2 font-mono text-[11px] text-muted">Updated {UPDATED}</p>
    </aside>
  );
}

export function HubBand({
  route,
  kicker,
  title,
  promise,
  chips,
}: {
  route: string;
  kicker: string;
  title: string;
  promise: string;
  chips: { href: string; label: string }[];
}) {
  return (
    <section className="relative isolate min-h-[220px] overflow-hidden border-b border-line md:min-h-[300px]">
      <TkImage route={route} priority fill sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-10 text-on-forest md:py-14">
        <p className="font-mono text-[11px] tracking-widest uppercase">{kicker}</p>
        <h1 className="mt-2 max-w-3xl text-4xl text-on-forest md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg">{promise}</p>
        {chips.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.href}>
                <a href={chip.href} className="inline-flex min-h-11 items-center border border-on-forest px-3 font-mono text-[11px] tracking-widest uppercase">
                  {chip.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function FieldCard({
  roundup,
  index,
  featured = false,
  priority = false,
}: {
  roundup: Roundup;
  index: string;
  featured?: boolean;
  priority?: boolean;
}) {
  const top = getProduct(roundup.productSlugs[0]);
  const tag = roundup.kicker.replace(/^Roundup · /i, "ROUNDUP · ").toUpperCase();
  return (
    <a href={`/best/${roundup.slug}`} className={`tk-card group flex h-full flex-col bg-paper text-ink ${featured ? "md:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden ${featured ? "aspect-video" : "aspect-[4/3]"}`}>
        <TkImage route={`/best/${roundup.slug}`} priority={priority} fill sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} />
        <span className="absolute top-2 left-2 bg-forest-deep px-2 py-1 font-mono text-[11px] tracking-widest text-on-forest">{tag}</span>
        <span className="absolute right-2 bottom-2 font-mono text-[11px] text-on-forest">{index}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className={`font-display leading-tight ${featured ? "text-3xl" : "text-[22px]"}`}>{roundup.h1}</span>
        <span className="line-clamp-2 text-sm text-muted">{roundup.answer}</span>
      </div>
      <p className="border-t border-line px-3 py-2 font-mono text-[11px] tracking-wide break-words text-muted uppercase">
        {roundup.productSlugs.length} picks · updated {UPDATED_MONO} · top pick <span className="text-ink">{top?.name ?? "see page"}</span>
      </p>
    </a>
  );
}

export function GuideCard({
  guide,
  featured = false,
  priority = false,
}: {
  guide: Guide;
  featured?: boolean;
  priority?: boolean;
}) {
  const money = linksFor(guide.related).find((link) => link.kind === "Roundup") ?? linksFor(guide.related)[0];
  const mins = guide.sections.length > 4 ? 8 : 6;
  if (featured) {
    return (
      <a href={`/guides/${guide.slug}`} className="tk-card group relative block aspect-video overflow-hidden text-on-forest">
        <TkImage route={`/guides/${guide.slug}`} priority={priority} fill sizes="(min-width: 1024px) 50vw, 100vw" />
        <span className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent" />
        <span className="absolute right-3 bottom-3 left-3">
          <span className="font-mono text-[11px] tracking-widest uppercase">Guide · {mins} min · {guide.kicker.replace(/^Guide · /i, "")}</span>
          <span className="mt-1 block font-display text-2xl leading-tight sm:text-3xl">{guide.h1}</span>
        </span>
      </a>
    );
  }
  return (
    <a href={`/guides/${guide.slug}`} className="tk-card group grid bg-paper text-ink sm:grid-cols-[40%_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <TkImage route={`/guides/${guide.slug}`} priority={priority} fill sizes="240px" />
      </div>
      <span className="flex flex-col gap-1 p-3">
        <span className="font-mono text-[11px] tracking-widest uppercase">Guide · {mins} min</span>
        <span className="font-display text-[22px] leading-tight">{guide.h1}</span>
        <span className="line-clamp-2 text-sm text-muted">{guide.description}</span>
        {money ? <span className="mt-auto pt-2 font-mono text-[11px] tracking-wide uppercase">Leads to → {money.label}</span> : null}
      </span>
    </a>
  );
}

const LINE: Record<string, string> = {
  tents: "SHELTER",
  sleep: "SLEEP",
  pads: "PAD",
  packs: "PACK",
  footwear: "FOOTWEAR",
  shells: "SHELL",
  stoves: "STOVE",
  lighting: "LIGHT",
  water: "WATER",
  layers: "LAYER",
  poles: "POLES",
  camp: "CAMP",
};

export function kitChips(kit: Kit) {
  const blob = `${kit.name}. ${kit.description} ${kit.forWhom} ${kit.notes.join(" ")}`;
  const chips: string[] = [];
  const nights = blob.match(/\b(one|two|three|\d+)\s+nights?\b/i);
  if (nights) chips.push(`${nights[1].toUpperCase()} NIGHTS`);
  if (/mild forecast/i.test(blob)) chips.push("MILD");
  if (/cold sleeper|sleep cold/i.test(blob)) chips.push("COLD SLEEPER");
  if (/daylight|day hike/i.test(blob)) chips.push("DAY HIKE");
  if (/campground|drive-up|car camp/i.test(blob)) chips.push("CAR CAMP");
  if (/trekking poles/i.test(blob)) chips.push("POLES");
  return chips.slice(0, 4);
}

export function KitCard({ kit, priority = false }: { kit: Kit; priority?: boolean }) {
  const picks = kit.productSlugs.map((slug) => getProduct(slug)).filter((p) => p != null).slice(0, 4);
  const chips = kitChips(kit);
  return (
    <a href={`/kits/${kit.slug}`} className="tk-card group grid bg-paper text-ink md:grid-cols-[42%_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-56">
        <TkImage route={`/kits/${kit.slug}`} priority={priority} fill sizes="(min-width: 1024px) 24vw, 100vw" />
      </div>
      <span className="flex flex-col gap-2 p-3">
        <span className="font-mono text-[11px] tracking-widest uppercase">Kit</span>
        <span className="font-display text-[22px] leading-tight">{kit.name}</span>
        <span className="line-clamp-2 text-sm text-muted">{kit.description}</span>
        {chips.length ? (
          <span className="flex flex-wrap gap-1">
            {chips.map((chip) => (
              <span key={chip} className="border border-ink px-1.5 py-0.5 font-mono text-[11px]">{chip}</span>
            ))}
          </span>
        ) : null}
        <span className="mt-1 space-y-1 border-t border-dashed border-line pt-2 font-mono text-[11px] uppercase">
          {picks.map((pick) => (
            <span key={pick.slug} className="flex min-w-0 justify-between gap-3">
              <span className="shrink-0">{LINE[pick.category] ?? pick.category}</span>
              <span className="min-w-0 truncate text-ink normal-case">{pick.name}</span>
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

export function decidesLine(compare: Compare) {
  const row = compare.rows[0];
  if (!row) return compare.answer;
  return `${row.left} vs ${row.right}`;
}

export function VersusCard({
  compare,
  featured = false,
  priority = false,
}: {
  compare: Compare;
  featured?: boolean;
  priority?: boolean;
}) {
  const left = getProduct(compare.left);
  const right = getProduct(compare.right);
  const listings = [left, right].filter((p) => p && asinFor(p.slug)).length;
  return (
    <a href={`/compare/${compare.slug}`} className={`tk-card group flex h-full flex-col bg-paper text-ink ${featured ? "md:col-span-3" : ""}`}>
      <div className="relative aspect-video overflow-hidden">
        <TkImage route={`/compare/${compare.slug}`} priority={priority} fill sizes={featured ? "100vw" : "(min-width: 1024px) 30vw, 100vw"} />
        <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-paper" aria-hidden />
        <span className="absolute top-1/2 left-1/2 grid size-[46px] -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-ink bg-paper font-display text-sm text-ink">VS</span>
      </div>
      <span className="grid grid-cols-2 border-b border-line font-mono text-[11px] tracking-wide uppercase">
        <span className="truncate px-3 py-2">{left?.name ?? compare.left}</span>
        <span className="truncate border-l border-line px-3 py-2 text-right">{right?.name ?? compare.right}</span>
      </span>
      <span className="flex flex-1 flex-col gap-1 p-3">
        <span className="font-display text-[22px] leading-tight">{compare.h1}</span>
        <span className="line-clamp-2 text-sm text-muted">{compare.answer}</span>
      </span>
      <span className="bg-spec px-3 py-2 font-mono text-[11px] tracking-wide break-words uppercase">Decides on → {decidesLine(compare)}</span>
      <span className="border-t border-line px-3 py-2 font-mono text-[11px] text-muted uppercase">{compare.rows.length} rows compared · {listings} listings</span>
    </a>
  );
}

export function CategoryTile({
  category,
  items,
  roundups,
  priority = false,
}: {
  category: Category;
  items: number;
  roundups: number;
  priority?: boolean;
}) {
  return (
    <a href={`/gear/${category.slug}`} className="tk-card group relative block aspect-[3/4] overflow-hidden text-on-forest">
      <TkImage route={`/gear/${category.slug}`} priority={priority} fill sizes="(min-width: 1280px) 18vw, 50vw" />
      <span className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/10 to-transparent" />
      <span className="absolute right-3 bottom-3 left-3">
        <span className="block font-display text-[22px] leading-tight">{category.name}</span>
        <span className="mt-1 block font-mono text-[11px] tracking-widest uppercase">{items} items · {roundups} roundups</span>
      </span>
    </a>
  );
}

export function NotePlate({
  note,
  index,
  priority = false,
}: {
  note: Guide;
  index: string;
  priority?: boolean;
}) {
  const used = linksFor(note.related)[0];
  return (
    <a href={`/learn/${note.slug}`} className="tk-card group flex h-full flex-col bg-paper text-ink">
      <div className="relative aspect-square overflow-hidden">
        <TkImage route={`/learn/${note.slug}`} priority={priority} fill sizes="(min-width: 1024px) 22vw, 50vw" />
      </div>
      <span className="flex flex-1 flex-col gap-1 p-3">
        <span className="font-mono text-[11px] tracking-widest uppercase">Field note {index}</span>
        <span className="font-display text-xl leading-tight">{note.h1}</span>
        <span className="line-clamp-2 text-sm text-muted">{note.description}</span>
        {used ? <span className="mt-auto pt-2 font-mono text-[11px] uppercase opacity-0 transition-opacity group-hover:opacity-100">Used in → {used.label}</span> : null}
      </span>
    </a>
  );
}

export function GearCard({
  product,
  priority = false,
  mini = false,
}: {
  product: Product;
  priority?: boolean;
  mini?: boolean;
}) {
  const category = getCategory(product.category);
  const spec = [product.specs[0]?.value, product.weight, product.priceBand].filter(Boolean).slice(0, 3).join(" · ");
  const live = Boolean(asinFor(product.slug));
  return (
    <a href={`/products/${product.slug}`} className="tk-card group flex h-full flex-col bg-paper text-ink">
      <div className={`relative overflow-hidden ${mini ? "aspect-[4/3]" : "aspect-[4/3]"}`}>
        <TkImage route={`/products/${product.slug}`} priority={priority} fill sizes={mini ? "180px" : "(min-width: 1024px) 22vw, 50vw"} />
      </div>
      <span className="flex flex-1 flex-col gap-1 p-3">
        <span className="font-mono text-[11px] tracking-widest uppercase">{category?.short ?? product.category}</span>
        <span className="font-display text-xl leading-tight">{product.name}</span>
        <span className="text-sm text-muted">{product.bestFor}</span>
        <span className="font-mono text-[11px] tracking-wide text-muted uppercase">{spec}</span>
      </span>
      <span className="border-t border-line px-3 py-2 font-mono text-[11px] tracking-widest uppercase">
        {live ? <span className="inline-block border border-ink px-2 py-1">On Amazon ↗</span> : <span className="text-muted">No Amazon link</span>}
      </span>
    </a>
  );
}

export function Thumb({ route, className = "size-12", tone = "field" }: { route: string; className?: string; tone?: "field" | "money" }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden border border-line ${className}`}>
      <TkImage route={route} fill sizes="48px" tone={tone} />
    </span>
  );
}
