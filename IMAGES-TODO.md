# IMAGES TODO

Ready: 336 of 336 manifest cards, plus the home hero. `src/data/images.ts` reports 347 routes and 337 ready. The other 10 are unused `/inline/*` figure slots with no master and no page reference. They still fall back to the dark topo placeholder.

Each ready master has two bakes:

- Field (`<slug>-<w>.avif/.webp` and `<slug>.jpg`) — cooler, less saturated. Hubs, hub cards, and Open Graph cards.
- Money (`<slug>-money-<w>` and `<slug>-money.jpg`) — same photo, a bit more chroma and slightly warmer. Roundup, compare, kit, and product pages.

Drop a new master at `images-src/` + the path under `/images/`, then run `node scripts/grade-images.mjs --missing && node scripts/gen-images.mjs && node scripts/og-cards.mjs`. `--missing` skips derivatives that already exist, so shipped roundup field files are not rewritten.

## Vetoed, then regenerated or left unused

- `gear/water` — first pass cup floated. Regenerated pouring into a cup that sits on rocks. Accepted.
- `best/budget-rain-shells` — first pass jacket floated. Regenerated draped over a branch. Accepted.
- `best/microspikes` — first pass empty boots. Regenerated on a hiker. Accepted.
- `compare/helium-vs-rainier` — first two passes jacket floated in front of a branch. Third pass laid on a log. Accepted.
- `compare/r1-vs-atom` — first pass both hoodies floated. Second pass laid on logs. Accepted.
- `kits/family-weekend` — first pass had a readable license plate. Regenerated. Accepted.
- `guides/stove-safety` — first pass had readable type on the fuel canister. Regenerated with a blank canister. Accepted.
- `guides/kids-first-trip` — first pass both boots looked adult-sized. Regenerated with a smaller boot beside an adult boot. Accepted.
- `learn/torso-length` — first pass tape had readable markings. Regenerated plain. Accepted.
- `products/aura-65` — first pass trail sign looked lettered. Regenerated. Accepted.
- `products/soto-amicus` — first pass canister had embossed type. Regenerated blank. Accepted.
- Unused logo wordmark and a sunset illustration with the word Trailkit. Not assigned.

## Still open

No manifest card is missing a master. Do not regenerate `/best` roundup photos unless one is actually broken.
