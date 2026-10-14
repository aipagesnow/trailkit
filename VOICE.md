# VOICE.md: Trailkit Outdoor writing rails (warm voice, revised Oct 14, 2026)

A warm, chatty voice: a friendly neighbor over the fence who knows this subject well and talks to you about your trip, your pack, your feet. US English and US units throughout (en-US).

This replaces the earlier "clear reviewer" voice section for this site, at Chris's request (14 Oct 2026), following the template approved for Robot Mow Guide. Where AUDIENCE.md, the clear-reviewer-voice skill or an older VOICE file says not to aim for "a friendly person chatting", this file overrides that line for this site. The honesty limits from that skill still hold: no hype, no fake testing, no invented facts, and every technical figure kept and explained.

## Voice: a friendly neighbor over the fence

Picture the neighbor who's read every spec sheet, manual and owner thread on this subject. You lean on the fence and ask, "Would this work for me?" They think about *your* situation and tell you straight what they'd do, including the bit you won't love. Warm, chatty, honest.

**Who we're talking to:** US hikers and backpackers, from first overnight to experienced, choosing gear under real limits: budget, weight, weather and fit.

**What's on their mind:** Will it work on my kind of trip, does it fit me, and is the weight worth it?

**Their moments (use as *if* situations about the reader, never as invented stories):** your first overnight a few miles in; a wet, mild mountain weekend; a wooden tent platform or a sandy site; car camping with the family; pack straps sitting wrong on your shoulders.

### The rules
1. **Talk to "you", a lot.** Put the reader's situation (your trip, your pack, your feet) in nearly every paragraph. Never "buyers", "users" or "consumers".
2. **Say what you'd do.** Give advice as "we'd..." ("we'd measure the stand first"). "I'd" is fine now and then in an aside. Fixed disclosure wording below stays exactly as written, whatever person it uses.
3. **Contractions everywhere.** It's, doesn't, you'll, won't, there's, that's, we'd, you've. Write "does not" only for real emphasis.
4. **Chatty, but clear.** Mostly short, spoken sentences, with the odd longer one that explains *why*. Starting with And, But or So is fine. No spec-card shorthand.
5. **A natural aside now and then.** "Honestly,", "Here's the thing:", "To be fair,", "The good news is", "Worth knowing:". One or two per section at most, and never the same one twice in a row on a page.
6. **Answer first.** The first sentence of each page, card, section and FAQ answers its heading ("Short answer: ..." is fine once per page).
7. **One honest caveat, said kindly and plainly, once.** "Here's the catch: ..." Don't bury it, repeat it or stack hedges.
8. **Relatable moments, framed honestly.** Use the moments above as *if* situations about the reader. Never invent an anecdote, a person, an owner story or a statistic. Owner experiences only come from linked sources.
9. **Light warmth, no performance.** No "Great question!", "Let's dive in", jokes for their own sake, exclamation marks, emoji, "trust me" or gushing.
10. **No process or audit talk.** Don't tell the reader what was checked, re-checked, opened, left off or what "this page" or "this row" does. Say the fact, then what it means for them. Dates and sources live in source lines and method boxes. When sources disagree, say which figure you'd plan on and mention the other once.
11. **Keep every number, and say what it means.** One key figure per sentence, then what it means in plain words.
12. **No hype, no fake testing.** We haven't tested these ourselves, and it's fine to say so in a friendly way. Keep maker claims ("Meaco says...") and owner reports clearly apart.
13. **Finish when you're done.** No summary line, no sign-off.

### Search phrasing (added 14 Oct 2026)
Real search queries for each key page are listed in TARGET-QUERIES.md. Work them in only where they fit naturally: question-style H2/H3s, FAQ questions phrased the way people search, and first sentences that answer them. Never stuff keywords, and never change a title or H1 that already gets impressions.

## Site facts (kept from AUDIENCE.md and the live site)
- Words this audience uses: freestanding, trekking-pole tent, R-value, quilt vs mummy bag, torso length, toe box, zero-drop, canister stove, shell, puffy, lb and oz.
- Evidence they trust: published weight and dimensions, R-value, temperature ratings, pitch style, fit and sizing charts.
- Constraint-first guides matched to budget, weight, weather and fit. No generic top ten.
- Verified ASINs only (`src/data/asins.ts`). Unverified slugs show "Amazon listing not verified"; keep that label.
- No live prices published.
- US units (lb, oz, °F, inches) and US spelling.

## Spelling and units (locked)
- US English: color, organize, center, gray. US units (in, ft, lb, oz, °F, $) where the site already uses them. Keep `lang` as it is.
- Units, decimals and number formats stay exactly as they are on the site.

## Banned or throttled (site list kept, plus the warm-voice additions)
- testing claims: "we tested", "on our last trip", "field tested", "hands-on"
- hype: ultralight beast, bombproof (unless quoting a maker), game-changer, ultimate, must-have
- safety overreach: never say gear "keeps you safe"; keep existing turnaround and weather advice as is
- stars, scores, frozen prices
- Warm-voice extras: "Great question", "Let's dive in", "Happy ...ing" sign-offs, exclamation marks in body copy, emoji, the same aside twice in a row.
- SEO filler: "in this article", "without further ado", "look no further", "the ultimate guide", "everything you need to know".
- Repeated "not X, but Y" constructions.

## Fixed microcopy and disclosure (word for word, never rewritten)
- **As an Amazon Associate we earn from qualifying purchases. Prices and availability change.** Keep the variants "...Check current price before you buy." and "...We do not publish a live price." exactly where they are.
- Tag `trailkit-20` comes from env with a fallback in `src/lib/affiliate.ts`; never touch.
- Bylines, source lines, "Updated" lines and method/research boxes keep their wording and dates.

## Before and after (real lines from the live site, Oct 14, 2026)

1. Home intro
   - Before: "Tents, sleep systems, packs, footwear, stoves, and shells matched to budget, weight, weather, and fit. Not a generic top ten."
   - After: "Tell us your budget, how much weight you'll carry, the weather you're heading into and what fits you, and we'll match you with tents, sleep systems, packs, footwear, stoves and shells. You won't find a generic top ten here."

2. /best/backpacking-tents intro
   - Before: "A backpacking tent is a pitch style first and a brand second. Freestanding tents stand before you stake them, which matters on wooden platforms, slabs, and sandy sites."
   - After: "Pick the pitch style first and the brand second. A freestanding tent stands up before you stake it, which really helps if you're camping on wooden platforms, slabs or sand."

3. Sleeping pad note
   - Before: "Thickness helps comfort. It does not replace R-value. Read both numbers on the model you are actually buying."
   - After: "A thicker pad feels comfier, sure, but it won't keep you warm on its own. That's the R-value's job, so check both numbers on the exact model you're buying."

4. Bindi lamp note
   - Before: "Bindi is a camp lamp. The flood is pleasant at a pot. The throw is not a route-finding beam. Pair it with a real lamp, or do not take it as the only light. The weight is the temptation to make it the only light. Resist that."
   - After: "Think of the Bindi as a camp lamp. Its flood is nice over a pot, but it won't light the trail ahead. It's so light you'll be tempted to make it your only light. Honestly, we wouldn't: pair it with a real headlamp."

5. Headlamps FAQ
   - Before: "Rechargeable if you have a car or a power bank. Replaceable cells if you forget to charge."
   - After: "If you've got a car or a power bank, go rechargeable. If you're the type who forgets to charge things, we'd stick with replaceable batteries."

6. /guides/pack-fit
   - Before: "Two people who are the same height can have different torsos. A pack sized for height alone often puts the shoulder straps in the wrong place, and then every feature review is irrelevant. Use the brand's size chart after you measure."
   - After: "Here's the thing: two people the same height can have quite different torsos. Size a pack by height alone and the shoulder straps often land in the wrong place, and then none of the features matter. So measure your torso first, then use the brand's size chart."

7. /best/hiking-boots-wide-feet
   - Before: "Buy the Targhee if you want a waterproof mid boot with a wide toe box and a traditional heel. Buy the Lone Peak if the pain is a pointed toe box and the trail is moderate enough for a zero-drop shoe. They solve different problems."
   - After: "If you want a waterproof mid boot with a wide toe box and a traditional heel, we'd go for the Targhee. If a pointed toe box is what hurts and your trails are moderate enough for a zero-drop shoe, the Lone Peak is the one. They're fixing different problems."

8. Tent comparison verdict
   - Before: "For most pairs on mixed platforms and dirt, buy the Copper Spur UL2. If your trips are in wet, mild mountain weather and rain is expected, not a surprise, buy the Dragonfly OSMO 2P."
   - After: "If there are two of you camping on a mix of platforms and dirt, we'd go for the Copper Spur UL2. But if your trips are in wet, mild mountain weather where you expect rain, we'd pick the Dragonfly OSMO 2P."

### Final read-aloud test
Read it aloud as if you're leaning on the fence talking to the neighbor.
- Does it sound like a friendly person who knows this subject? If it sounds like a report, rewrite it. If it sounds like an ad, calm it down.
- Is "you" in it? Is there a "we'd" where advice is given?
- Does the first sentence answer the question?
- Is the main downside there, once, kindly and plainly?
- Any aside twice in a row? Cut one.
- Any story, person or statistic not in the sources? Cut it or turn it into an "if" about the reader.
- Any "this page", "checked", "row", "listing text"? Cut it.
- Anything that sounds like we used the product?
- Every number identical to the source? Good.
