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
VITE_SITE_URL=https://trailkit-gamma.vercel.app
VITE_GA_ID=
NEXT_PUBLIC_GA_ID=
VITE_GSC_VERIFICATION=
```

Leave GA and GSC empty until the properties exist. When set, the root document loads gtag and emits `google-site-verification`. Canonicals, Open Graph, and the sitemap use `VITE_SITE_URL`.

Contact copy still says `hello@trailkit.example` and is labeled **replace before launch**.

## Add a guide

1. Add the guide object in `src/data/editorial.ts` (or the expansion catalog if it belongs in the long tail) with a unique `slug`, direct answer, sections, FAQs, and related product slugs.
2. Export it through `src/data/index.ts` if it is not already on the `guides` array. The route is `/guides/$slug` — no new file per page.
3. Optional hero: drop a JPEG in `public/images/` and map the slug in `HERO` inside `src/lib/seo.ts`.
4. Run `npm run typecheck`. The sitemap route picks the guide up automatically.

Roundups (`/best/$slug`), comparisons, kits, field notes, and products follow the same data-driven pattern.

## Images

Home and priority money pages use photos in `public/images/`. Heroes are sized with `width` / `height` and `fetchpriority="high"`. Default social image: `public/images/og-default.jpg`. Do not hotlink Amazon CDN packshots.
