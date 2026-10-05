# Trailkit

SEO-first static site for an outdoor Amazon Associates project. No build step. HTML, one CSS file, one JS file.

## Run locally

```bash
cd artifacts
python3 -m http.server 8080
```

Open http://localhost:8080

Use a local server. Opening HTML files directly breaks root-absolute CSS and links.

## Change the brand

1. `site.config.json` — `brand`
2. `js/site.js` — `window.TRAILKIT.brand` (header logo is baked into HTML, so also re-run the generator or search-replace the name)

Regenerate after config edits:

```bash
python3 generate.py
```

If you only have this folder, search-replace `Trailkit` in the HTML and update `site.config.json`.

## Amazon tag

Set the tag in both places:

- `site.config.json` → `amazonTag` (used when pages are generated)
- `js/site.js` → `window.TRAILKIT.amazonTag` (rewrites `a.amz` links in the browser)

Links are Amazon search URLs with `rel="sponsored nofollow"`. Replace a search URL with `https://www.amazon.com/dp/ASIN?tag=yourtag-20` when you have the real ASIN. Keep the class `amz`.

Do not hard-code prices. Buttons say “Check current price on Amazon”.

## Analytics and Search Console

- GA4: set `ga4` in `js/site.js`. The snippet loads only after you replace `G-XXXXXXXXXX`.
- Search Console: set `searchConsole` in `site.config.json`, regenerate, or replace `PASTE_SEARCH_CONSOLE_TOKEN` in the templates.
- Set `siteUrl` before launch so canonicals and the sitemap match the real domain.

## Add a guide page

1. Copy `best/backpacking-tents/index.html` to `best/your-slug/index.html` or `guides/your-slug/index.html`.
2. Follow `CONTENT-CHECKLIST.md`.
3. Unique `<title>`, meta description, one H1, canonical.
4. Add the URL to `sitemap.xml`.
5. Link it from a category hub and from two related pages.
6. Add a card on `index.html` if it should be featured.

## URL map

- `/best/[topic]/`
- `/compare/[a]-vs-[b]/`
- `/guides/[slug]/`
- `/gear/[category]/`

## Ship notes

Static hosting (Netlify, Cloudflare Pages, S3, GitHub Pages) is enough. Point the host’s 404 page at `/404.html`.
