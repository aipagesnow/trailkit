# Trailkit

Constraint-first hiking and backpacking gear guides. US Amazon Associates only. The live app is this TanStack Start project (not the old static export in `artifacts/`).

```bash
npm install
npm run dev
```

Dev server: `http://127.0.0.1:8080`. Production build: `npm run build` (Nitro writes `.vercel/output`; do not set a static `outputDirectory`).

## Amazon tag

One tag, applied only on verified ASIN deep links:

```bash
AMAZON_ASSOCIATE_TAG=trailkit-20
VITE_AMAZON_ASSOCIATE_TAG=trailkit-20
```

`src/lib/affiliate.ts` reads those env vars and falls back to `trailkit-20`. Links look like `https://www.amazon.com/dp/{ASIN}?tag=trailkit-20`. There is no `/s?k=` search fallback.

Verified ASINs live in `src/data/asins.ts`. Unlisted product slugs render “Amazon listing not verified” instead of a guessed URL. Add a slug only after you confirm the listing on amazon.com.

## Site URL, analytics, Search Console

```bash
VITE_SITE_URL=https://www.trailkitoutdoor.com
VITE_GA_ID=
NEXT_PUBLIC_GA_ID=
VITE_GSC_VERIFICATION=
```

Leave GA and GSC empty until the properties exist. When set, the root document loads gtag and emits `google-site-verification`. Canonicals, Open Graph, and the sitemap use `VITE_SITE_URL`.

Contact copy still says `hello@trailkit.example` and is labeled **replace before launch**.

## Add a guide

1. Add the guide object in `src/data/editorial.ts` (or the expansion catalog if it belongs in the long tail) with a unique `slug`, direct answer, sections, FAQs, and related product slugs.
2. Export it through `src/data/index.ts` if it is not already on the `guides` array. The route is `/guides/$slug` — no new file per page.
3. Optional hero: drop the master at `images-src/guides/<slug>.jpg` and run the image steps below.
4. Run `npm run typecheck`. The sitemap route picks the guide up automatically.

Roundups (`/best/$slug`), comparisons, kits, field notes, and products follow the same data-driven pattern.

## Images

Every hub card and hero reads `src/data/images.ts` (generated). Missing files render a dark topo placeholder. Coverage is tracked in `IMAGES-TODO.md`.

Card meta is not typed by hand. A roundup card counts its picks, reads the updated date, and names the #1 pick. A kit card only shows trip chips the kit text already states, plus four manifest lines from its picks. A versus card’s “decides on” line is the first comparison row. A category tile counts real products and roundups. A gear card shows “On Amazon” only when `src/data/asins.ts` has a verified ASIN.

1. Drop a master JPEG at `images-src/` matching the path in `IMAGE-MANIFEST.json` (for example `images-src/best/ultralight-tents.jpg` → `/images/best/ultralight-tents.jpg`).
2. Grade it: `node scripts/grade-images.mjs --missing`. That writes two bakes under `public/images/`: a field grade (`<slug>-<w>.avif/.webp` and `<slug>.jpg`, cooler and less saturated, used on hubs) and a money grade (`<slug>-money-<w>` and `<slug>-money.jpg`, a bit more chroma and slightly warmer, used on roundup, compare, kit, and product pages). Widths are 480, 800, 1200, and 1600. `--missing` skips files that already have a card.
3. Refresh the map: `node scripts/gen-images.mjs`.
4. Rebuild Open Graph cards: `node scripts/og-cards.mjs` (also runs in `prebuild`). OG cards stay on the field-grade JPEG.

Budgets: card AVIF at 800w stays at or under 45 KB; a hero at 1600w stays at or under 120 KB. Hubs load the first card row eager and the rest lazy. Money pages request the money bake via `TkImage tone="money"` and fall back to the field bake if that file is missing. Do not hotlink Amazon CDN packshots, and do not add logos, readable text, faces, or orange props.
