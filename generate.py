#!/usr/bin/env python3
"""Generate the Trailkit static site into /workspace/artifacts."""
import json
import html
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CFG = json.loads((Path(__file__).resolve().parent / "site.config.json").read_text())
BRAND = CFG["brand"]
TAG = CFG["amazonTag"]
SITE = CFG["siteUrl"].rstrip("/")
UPDATED = CFG["updated"]
AUTHOR = CFG["author"]

DISCLOSURE = (
    f"{BRAND} is a participant in the Amazon Services LLC Associates Program, "
    "an affiliate advertising program designed to provide a means for sites to earn "
    "advertising fees by advertising and linking to Amazon.com. As an Amazon Associate "
    "we earn from qualifying purchases. Prices and availability change."
)

NAV = [
    ("/gear/backpacking/", "Backpacking"),
    ("/gear/hiking-footwear/", "Footwear"),
    ("/gear/sleep-systems/", "Sleep"),
    ("/gear/camp-kitchen/", "Kitchen"),
    ("/gear/rain-and-layers/", "Rain"),
    ("/guides/first-overnight-hike-packing-list/", "Packing list"),
    ("/about/", "About"),
]


def e(s):
    return html.escape(s, quote=True)


def amz(query, label="Check current price on Amazon"):
    q = query.replace(" ", "+")
    href = f"https://www.amazon.com/s?k={q}&tag={TAG}"
    return (
        f'<a class="amz btn" href="{href}" rel="sponsored nofollow noopener" target="_blank">{e(label)}</a>'
        f'<p class="note">Price is not listed here. Open Amazon for the current price, size, and shipping.</p>'
    )


def crumbs(items):
    parts = ['<a href="/">Home</a>']
    for href, name in items[:-1]:
        parts.append(f'<a href="{href}">{e(name)}</a>')
    parts.append(e(items[-1][1]))
    return '<p class="crumbs">' + " / ".join(parts) + "</p>"


def schema_graph(page):
    crumbs_items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"}]
    for i, (href, name) in enumerate(page["crumbs"], start=2):
        crumbs_items.append({"@type": "ListItem", "position": i, "name": name, "item": SITE + href})
    graph = [
        {
            "@type": "BreadcrumbList",
            "itemListElement": crumbs_items,
        },
        {
            "@type": "Article",
            "headline": page["h1"],
            "dateModified": "2026-10-05",
            "datePublished": "2026-10-05",
            "author": {"@type": "Organization", "name": AUTHOR},
            "publisher": {"@type": "Organization", "name": BRAND},
            "description": page["description"],
            "mainEntityOfPage": SITE + page["path"],
        },
    ]
    if page.get("faqs"):
        graph.append({
            "@type": "FAQPage",
            "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                for q, a in page["faqs"]
            ],
        })
    if page.get("products"):
        graph.append({
            "@type": "ItemList",
            "name": page["h1"],
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": i,
                    "item": {
                        "@type": "Product",
                        "name": p["name"],
                        "description": p["best_for"],
                        "brand": {"@type": "Brand", "name": p["brand"]},
                    },
                }
                for i, p in enumerate(page["products"], start=1)
            ],
        })
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)


def head(page):
    title = page["title"]
    desc = page["description"]
    url = SITE + page["path"]
    og = page.get("og", f"{BRAND}: practical outdoor gear picks")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{e(url)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{e(url)}">
<meta property="og:site_name" content="{e(BRAND)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{e(title)}">
<meta name="twitter:description" content="{e(desc)}">
<meta name="google-site-verification" content="{e(CFG['searchConsole'])}">
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">{schema_graph(page)}</script>
</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="site">
  <div class="wrap bar">
    <a class="logo" href="/">{e(BRAND)}<span>.</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="primary" id="nav">{''.join(f'<a href="{h}">{e(n)}</a>' for h, n in NAV)}</nav>
  </div>
</header>
"""


def footer():
    return f"""
<footer class="site">
  <div class="wrap footgrid">
    <div>
      <strong>{e(BRAND)}</strong>
      <p class="fine">{e(DISCLOSURE)}</p>
    </div>
    <div>
      <a href="/about/">About</a><br>
      <a href="/editorial-standards/">Editorial standards</a><br>
      <a href="/affiliate-disclosure/">Affiliate disclosure</a><br>
      <a href="/contact/">Contact</a>
    </div>
    <div>
      <a href="/privacy/">Privacy</a><br>
      <a href="/gear/backpacking/">Backpacking hub</a><br>
      <a href="/best/backpacking-tents/">Best tents</a><br>
      <a href="/sitemap.xml">Sitemap</a>
    </div>
  </div>
</footer>
<script src="/js/site.js" defer></script>
</body>
</html>
"""


def toc(items):
    links = "".join(f'<a href="#{i}">{e(n)}</a>' for i, n in items)
    return f'<aside class="toc"><p>On this page</p>{links}</aside>'


def products_html(products):
    blocks = []
    for i, p in enumerate(products, start=1):
        pros = "".join(f"<li>{e(x)}</li>" for x in p["pros"])
        cons = "".join(f"<li>{e(x)}</li>" for x in p["cons"])
        blocks.append(f"""
<section class="product" id="p{i}">
  <p class="rank">{e(p['label'])}</p>
  <h3>{e(p['name'])}</h3>
  <p>{p['body']}</p>
  <p><strong>Who should buy it:</strong> {e(p['who'])}</p>
  <div class="proscons">
    <div class="pros"><h4>Pros</h4><ul>{pros}</ul></div>
    <div class="cons"><h4>Cons</h4><ul>{cons}</ul></div>
  </div>
  {amz(p['query'], 'Check current price on Amazon')}
</section>""")
    return "\n".join(blocks)


def table(products):
    rows = []
    for p in products:
        rows.append(
            "<tr>"
            f"<td>{e(p['name'])}</td>"
            f"<td>{e(p['price'])}</td>"
            f"<td>{e(p['weight'])}</td>"
            f"<td>{e(p['best_for'])}</td>"
            f"<td>{e(p['limit'])}</td>"
            "</tr>"
        )
    return (
        '<div class="table-wrap"><table>'
        "<thead><tr><th>Pick</th><th>Price range</th><th>Weight</th><th>Best for</th><th>Standout limitation</th></tr></thead>"
        f"<tbody>{''.join(rows)}</tbody></table></div>"
        '<p class="note">Scroll sideways on a phone. Ranges are typical street bands, not live prices.</p>'
    )


def faq_html(faqs):
    items = "".join(
        f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in faqs
    )
    return f'<section class="faq" id="faq"><h2>FAQ</h2>{items}</section>'


def related(links):
    cards = "".join(f'<a href="{h}"><strong>{e(n)}</strong><small>Related guide</small></a>' for h, n in links)
    return f'<section id="related"><h2>Related guides</h2><div class="related">{cards}</div></section>'


def render_article(page):
    toc_items = [("answer", "Direct answer"), ("compare", "Comparison"), ("picks", "Picks")]
    toc_items += [(f"p{i}", p["name"]) for i, p in enumerate(page["products"], start=1)]
    toc_items += [("one", "If you only buy one"), ("faq", "FAQ"), ("related", "Related")]
    body = f"""
<main id="content" class="wrap layout">
  {toc(toc_items)}
  <article>
    {crumbs(page['crumbs'])}
    <p class="kicker">{e(page['kicker'])}</p>
    <h1>{e(page['h1'])}</h1>
    <p class="meta-row">Updated {e(UPDATED)} · {e(page['read'])} read · {e(AUTHOR)}</p>
    <div class="answer" id="answer">{page['answer']}</div>
    <div class="who"><strong>Who this is for.</strong> {page['who']}</div>
    <div class="disclosure">{e(DISCLOSURE)} Check current price before you buy.</div>
    <h2 id="compare">Comparison</h2>
    {table(page['products'])}
    <h2 id="picks">The picks</h2>
    {products_html(page['products'])}
    <section class="pick" id="one">
      <h2>If you only buy one</h2>
      {page['one']}
    </section>
    {faq_html(page['faqs'])}
    {related(page['related'])}
    <p class="method" id="method"><strong>How we framed this.</strong> {page['method']} Models and specs are illustrative of the October 2026 market and should be rechecked before publish updates. We do not invent test scores.</p>
  </article>
</main>
"""
    return head(page) + body + footer()


def render_simple(page, inner):
    body = f"""
<main id="content" class="wrap" style="padding:1.8rem 0 3rem">
  <article class="narrow">
    {crumbs(page['crumbs'])}
    <h1>{e(page['h1'])}</h1>
    {inner}
  </article>
</main>
"""
    page = {**page, "products": page.get("products"), "faqs": page.get("faqs")}
    return head(page) + body + footer()


def P(name, brand, label, query, price, weight, best_for, limit, who, body, pros, cons):
    return dict(name=name, brand=brand, label=label, query=query, price=price, weight=weight,
                best_for=best_for, limit=limit, who=who, body=body, pros=pros, cons=cons)


pages = []

pages.append({
    "path": "/best/backpacking-tents/",
    "title": "Best Backpacking Tents (2026): Freestanding and Trekking-Pole Picks",
    "description": "Best backpacking tents for 2026, compared by pitch style, weight, and weather. Freestanding Copper Spur vs trekking-pole X-Mid, plus budget and wet-weather options.",
    "h1": "Best backpacking tents",
    "kicker": "Money page · Shelters",
    "read": "9 min",
    "crumbs": [("/gear/backpacking/", "Backpacking"), ("/best/backpacking-tents/", "Best backpacking tents")],
    "answer": "<p>For most two-person backpacking trips, buy a freestanding double-wall tent if you camp on platforms or rock, and a trekking-pole tent if you already carry poles and want less weight. The Big Agnes Copper Spur UL2 is the default freestanding pick. The Durston X-Mid 2 is the default trekking-pole pick. If you mostly car-camp and only sometimes walk in, skip both and use a roomier crossover from the <a href=\"/guides/car-camping-kitchen-setup/\">car camping setup guide</a>.</p>",
    "who": "<p>Beginners who want a tent that stands before it is staked, and experienced hikers shaving ounces on a 2–5 night route. Not for winter mountaineering or four-season storms.</p>",
    "products": [
        P("Big Agnes Copper Spur UL2", "Big Agnes", "Best freestanding for most people", "Big Agnes Copper Spur UL2", "Upper mid", "About 2.5–3 lb packed", "Pairs who pitch on pads, slabs, and mixed sites", "Price sits well above budget tents",
          "You want two doors, two vestibules, and a tent that stands on its own poles.",
          "<p>The Copper Spur line keeps showing up as the livable ultralight freestanding tent in 2026 roundups because the walls stay usable and the pitch is color-coded. You pay for DAC poles and a light fabric, not for four-season fabric.</p>",
          ["Freestanding pitch on platforms", "Two doors and vestibules", "Familiar setup for new backpackers"],
          ["Not a budget tent", "Light fabrics need a footprint on granite"]),
        P("Durston X-Mid 2", "Durston", "Best trekking-pole shelter", "Durston X-Mid 2 tent", "Mid", "About 2 lb complete", "Hikers who already carry two trekking poles", "Needs stakes and a pitch you practice once at home",
          "You care more about weight and floor area than a freestanding structure.",
          "<p>The X-Mid 2 is a double-wall, two-pole shelter with a large floor for the weight. Fly-first pitching keeps the inner drier in rain. It is the wrong tent if your campsites are wooden platforms where stakes will not hold.</p>",
          ["Strong space-to-weight", "Double wall cuts condensation", "Lower price than DCF shelters"],
          ["Not freestanding", "Stake-out pitch takes a practice run"]),
        P("NEMO Dragonfly OSMO 2P", "NEMO", "Best wet-weather freestanding", "NEMO Dragonfly OSMO 2P", "Upper mid", "A bit over 2.5 lb", "Wet climates where nylon sag ruins the pitch", "Still a light tent, not a bombproof four-season",
          "You hike in rain and want a freestanding tent that holds shape when wet.",
          "<p>OSMO fabric is the reason to look at the Dragonfly: it sags less when soaked than classic nylon, so the pitch stays taut on a Pacific Northwest weekend. Volume is honest for two people who pack carefully.</p>",
          ["Better wet sag behavior", "Freestanding", "Usable peak height"],
          ["Premium price", "Not the lightest two-person"]),
        P("REI Co-op Half Dome 2 Plus", "REI", "Best livable value", "REI Half Dome 2 Plus tent", "Mid", "Heavier than UL tents", "First backpacking tent, or trips where comfort beats ounces", "You will feel the weight on long climbs",
          "You are buying your first backpacking tent and will not count every ounce.",
          "<p>The Half Dome 2 Plus trades weight for a door you can sit in and a price that does not require a second mortgage. It is the right answer for weekend trips under 8 miles, not for a thru-hike base weight.</p>",
          ["Room to sit out a storm", "Easier on a first budget", "Widely available"],
          ["Heavier packed", "Less refined pole hardware"]),
        P("Six Moon Designs Lunar Solo", "Six Moon Designs", "Best budget solo", "Six Moon Designs Lunar Solo", "Lower mid", "Under 2 lb", "Solo hikers who can use a trekking pole", "Single wall means condensation management",
          "You hike alone and want a real shelter without a $500 freestanding tent.",
          "<p>The Lunar Solo is a single-wall, one-pole tent. Vent it. Do not seal every zipper on a humid night and then blame the fabric. It is a budget solo shelter, not a couple’s tent.</p>",
          ["Low cost for the weight", "Simple pitch", "Enough floor for one plus a pack"],
          ["Single wall condensation", "Not for two sleepers"]),
        P("MSR Hubba Hubba 2", "MSR", "Best shoulder-season default", "MSR Hubba Hubba 2 tent", "Upper mid", "Around 3 lb", "Windier three-season trips and late fall weekends", "Heavier than the Copper Spur class",
          "You expect wind and want a tent with a long field reputation.",
          "<p>The Hubba Hubba is the conservative pick: freestanding, two doors, and a structure people trust when a front moves through. Buy it when forecast risk matters more than a few ounces.</p>",
          ["Strong weather reputation", "Freestanding", "Two vestibules"],
          ["Not the lightest", "Price overlaps true UL tents"]),
    ],
    "one": "<p>Buy the <strong>Copper Spur UL2</strong> if you want one tent that works on platforms and dirt. Buy the <strong>X-Mid 2</strong> only if you already use trekking poles and will practice the pitch. Weight-first readers should continue to the <a href=\"/guides/ultralight-backpacking-shelter/\">ultralight shelter guide</a>.</p>",
    "faqs": [
        ("Is a freestanding tent worth the weight?", "Yes if you use platforms, slabs, or established sites where stakes fail. No if every camp is soft soil and you already carry poles."),
        ("What tent fits a first overnight?", "A livable two-person freestanding tent, even for one person. See the first overnight packing list for the rest of the kit."),
        ("Do I need a footprint?", "On abrasive rock and sandy sites, yes. On a thick duff pad, a polycryo sheet is optional insurance, not a requirement."),
        ("Can two people share a one-person tent?", "Only if both accept a tight floor and one vestibule. Most pairs should start at a two-person floor."),
    ],
    "related": [("/guides/ultralight-backpacking-shelter/", "Ultralight backpacking shelter guide"), ("/guides/first-overnight-hike-packing-list/", "First overnight hike packing list"), ("/best/sleeping-bags-backpacking/", "Best sleeping bags for backpacking")],
    "method": "Picks are framed by pitch style, packed weight class, and site type, using widely published 2026 model specs. We did not run a private wind-tunnel test for this seed page.",
})

pages.append({
    "path": "/best/sleeping-bags-backpacking/",
    "title": "Best Sleeping Bags for Backpacking: Temperature, Fill, and Quilts",
    "description": "Best sleeping bags for backpacking by temperature rating, fill, and pack size. Down bags, synthetic backups, and when a quilt beats a bag.",
    "h1": "Best sleeping bags for backpacking",
    "kicker": "Money page · Sleep",
    "read": "8 min",
    "crumbs": [("/gear/sleep-systems/", "Sleep systems"), ("/best/sleeping-bags-backpacking/", "Best sleeping bags")],
    "answer": "<p>Match the bag to the coldest night you will actually sleep, then subtract nothing for optimism. A 20°F down mummy is the default three-season backpacking bag. A quilt wins only if you sleep warm and will not kick the draft collar open at 2 a.m. Pair any of these with a pad that has a real R-value — the bag is not the pad. Start with <a href=\"/guides/how-to-choose-a-sleeping-pad/\">how to choose a sleeping pad</a> if you do not know your R-value yet.</p>",
    "who": "<p>Backpackers building a sleep system for 3-season trips, including cold sleepers who need a lower rating than the forecast suggests. Not a winter expedition bag guide.</p>",
    "products": [
        P("REI Co-op Magma 15", "REI", "Best default down bag", "REI Magma 15 sleeping bag", "Mid to upper", "Light for a 15°F bag", "Most backpackers who want a shoppable 15–20°F down bag", "Retail down is not Western Mountaineering fill power",
          "You want a rated bag you can try on and return.",
          "<p>The Magma is the practical 15°F down bag: light enough for a weekend pack, warm enough for a surprise frost, and sold where you can lie in it. Cold sleepers should still treat 15°F as a limit, not a comfort promise.</p>",
          ["Usable warmth-to-weight", "Easy to inspect in person", "Hood that actually cinches"],
          ["Not the lightest ounce-per-dollar at the top end", "Slim mummy feel"]),
        P("Western Mountaineering UltraLite", "Western Mountaineering", "Best premium down", "Western Mountaineering UltraLite sleeping bag", "High", "Very light for the rating", "Gram-focused hikers who sleep in the bag for years", "Price and a tighter fit",
          "You already know your sleep temperature and will pay for fill quality.",
          "<p>Western Mountaineering bags are the long-ownership pick. The UltraLite is a 20°F-class bag with a reputation for honest fill, not marketing fill. Buy the length and girth you measured, not the one that looks compact on a page.</p>",
          ["Excellent down for the weight", "Durable build for the category", "Honest temperature culture"],
          ["Expensive", "Less room to thrash"]),
        P("Enlightened Equipment Revelation", "Enlightened Equipment", "Best quilt alternative", "Enlightened Equipment Revelation quilt", "Mid to upper", "Lighter than a comparable bag", "Warm sleepers and side sleepers who hate mummies", "Drafts if you toss the pad attachment",
          "You sleep hot, move a lot, and will use the pad straps.",
          "<p>A quilt is not a cheaper bag. It is an open-back design that only works with a pad of enough R-value and a strap or sheet that keeps it closed. The Revelation is the common custom quilt people actually finish hikes in.</p>",
          ["Venting on mild nights", "Lower weight", "Side-sleeper friendly"],
          ["Drafts without discipline", "No hood"]),
        P("Marmot Trestles Elite Eco 30", "Marmot", "Best synthetic backup", "Marmot Trestles Elite Eco 30", "Lower mid", "Heavier than down", "Wet climates and rental-cabin damp", "Bulk in the pack",
          "You expect rain, boat spray, or a bag that may get wet.",
          "<p>Synthetic fill still works when damp. That is the whole case. If your trips are dry alpine, down is lighter. If your trips are coastal fog and river crossings, this class of bag is the rational one.</p>",
          ["Insulates when damp", "Easier care", "Lower price than premium down"],
          ["Packs larger", "Heavier for the rating"]),
        P("NEMO Disco 15", "NEMO", "Best for active sleepers", "NEMO Disco 15 sleeping bag", "Upper mid", "Moderate", "People who hate mummy coffins", "Spoon shape is still a bag, not a blanket",
          "You wake up because traditional mummies bind your knees.",
          "<p>The Disco’s spoon shape gives knees and elbows room without jumping to a quilt. You still need a pad. You still need to vent the hood on a 50°F night.</p>",
          ["More shoulder and knee room", "Solid 15°F class", "Useful thermo gills"],
          ["Not the smallest pack size", "Premium price"]),
        P("Sea to Summit Spark", "Sea to Summit", "Best ultralight mummy", "Sea to Summit Spark sleeping bag", "High", "Very low", "Fast-and-light hikers with a warm sleep tendency", "Very slim cut",
          "Your base weight is already low and you sleep warm.",
          "<p>Spark bags are for people who have already cut the tent and the cook kit. If you sleep cold, buy a lower rating instead of a lighter shell.</p>",
          ["Exceptional pack size", "Light", "Good hood engineering"],
          ["Narrow fit", "High price per degree"]),
    ],
    "one": "<p>Buy a <strong>15°F or 20°F down mummy you can return</strong> — the Magma 15 is the default — unless you already know you sleep warm and will manage a quilt. Then read the pad guide before you spend more on fill.</p>",
    "faqs": [
        ("Are temperature ratings comfort or limit?", "Treat published ratings as survival-adjacent limits unless the brand states EN/ISO comfort. Cold sleepers should buy 10°F warmer than the forecast low."),
        ("Down or synthetic?", "Down for dry trips and pack size. Synthetic if the bag may get wet."),
        ("Bag or quilt?", "Bag if you are new or sleep cold. Quilt if you sleep warm and will attach it to the pad."),
        ("What about a liner?", "A liner adds a few degrees and keeps the bag cleaner. It does not turn a 40°F bag into a 20°F bag."),
    ],
    "related": [("/guides/how-to-choose-a-sleeping-pad/", "How to choose a sleeping pad"), ("/best/backpacking-tents/", "Best backpacking tents"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list")],
    "method": "Selections split by fill type, cut, and who actually sleeps cold. Ratings are manufacturer classes, not Trailkit lab scores.",
})

pages.append({
    "path": "/best/hiking-boots-wide-feet/",
    "title": "Best Hiking Boots for Wide Feet: Width, Last, and Toe Box",
    "description": "Best hiking boots for wide feet in 2026. True wide sizes versus wide toe boxes from KEEN, Altra, Lowa, Oboz, and Merrell — without sizing up.",
    "h1": "Best hiking boots for wide feet",
    "kicker": "Money page · Footwear",
    "read": "8 min",
    "crumbs": [("/gear/hiking-footwear/", "Hiking footwear"), ("/best/hiking-boots-wide-feet/", "Wide-feet boots")],
    "answer": "<p>Wide feet need a wider last or a labeled 2E/4E, not a longer boot. Sizing up lets the heel slip and creates blisters in a new place. Start with a KEEN Targhee if you want a traditional wide toe box and a waterproof mid, or an Altra Lone Peak if your issue is toe splay and you can handle zero drop. Measure both feet at the end of the day. If one is wider, fit the wider foot.</p>",
    "who": "<p>Hikers who blow out the sides of standard D-width boots, or who get numb toes in a tapered toe box. Includes day hikers and overnight backpackers. Not a mountaineering-boot guide.</p>",
    "products": [
        P("KEEN Targhee IV WP Mid", "KEEN", "Best traditional wide toe box", "KEEN Targhee IV waterproof mid hiking boot", "Mid", "About 2 lb a pair", "Wide forefeet that still want a hiking-boot heel", "Not a performance narrow-trail racer",
          "You want a waterproof mid with a visibly wider toe box.",
          "<p>KEEN’s toe box is the reason this boot stays on wide-foot lists. The mid height helps if your ankles roll on loose trail. Try the wide if the standard still kisses your metatarsals.</p>",
          ["Roomy toe box", "Waterproof membrane", "Stable heel for a wide boot"],
          ["Heavier than trail runners", "Membrane can feel warm"]),
        P("Altra Lone Peak", "Altra", "Best foot-shaped toe box", "Altra Lone Peak hiking shoe wide", "Mid", "Light", "Wide or flat feet on non-technical trail", "Zero drop needs a break-in period",
          "Your pain is a pointed toe box, not a lack of ankle support.",
          "<p>Lone Peak uses a foot-shaped last. It is often a shoe, not a boot — listed here because many wide-foot hikers should stop forcing a boot. Give zero drop two easy weeks before a long day.</p>",
          ["Widest natural toe box in the set", "Light", "Foot-shaped last"],
          ["Zero-drop transition", "Less rock protection than a boot"]),
        P("Lowa Renegade GTX Wide", "Lowa", "Best leather wide", "Lowa Renegade GTX Mid wide", "High", "Heavier", "Wide feet that want a leather boot and real widths", "Price and break-in",
          "You will wear one pair for years and can try widths in a shop.",
          "<p>Renegade is sold in multiple widths. That is rarer than marketing claims of a roomy toe. Leather holds up. It is overkill for smooth summer trail.</p>",
          ["Actual wide widths", "Leather durability", "Gore-Tex membrane"],
          ["Expensive", "Heavier and warmer"]),
        P("Oboz Bridger Mid B-Dry Wide", "Oboz", "Best support for wide feet", "Oboz Bridger Mid Waterproof wide", "Mid to upper", "Moderate", "Wide feet that also need arch support", "Firmer underfoot",
          "You overpronate or want a shank, and standard wides collapse.",
          "<p>Oboz is the support pick. Wide plus a firmer midsole beats a soft wide shoe if your feet ache by mile six, not at the toe.</p>",
          ["Supportive midsole", "Wide options", "Solid lugs"],
          ["Less plush", "Not ultralight"]),
        P("Merrell Moab 3 Mid Wide", "Merrell", "Best easy wide boot", "Merrell Moab 3 Mid Wide waterproof", "Lower mid", "Moderate", "First wide boot, day hikes, light overnights", "Outsole wears faster than leather boots",
          "You want a labeled wide at a normal price.",
          "<p>The Moab wide is the available answer. It will not outlast a Lowa. It will get a wide foot on the trail this weekend without a specialty shop.</p>",
          ["True wide sizing", "Easy to find", "Familiar fit"],
          ["Average durability", "Less precise on steep dirt"]),
        P("Salomon X Ultra Wide GTX", "Salomon", "Best quick wide mid", "Salomon X Ultra Mid Wide GTX", "Mid to upper", "Lighter", "Wide forefoot hikers who still want a quick lace", "Wide is not the same as Altra-wide",
          "You like Salomon speed and have been sized out of the standard.",
          "<p>Salomon wide versions exist and are narrower than KEEN or Altra. Try them on. Do not order blind if your foot is genuinely 4E.</p>",
          ["Quicklace", "Lighter chassis", "Gore-Tex"],
          ["Wide is still relatively narrow", "Lace housing can annoy some feet"]),
    ],
    "one": "<p>If you can try one pair on today, try the <strong>KEEN Targhee in a wide</strong>. If the pain is only the toe box and you hike moderate trail, try the <strong>Lone Peak</strong> and keep a stable boot for scree. Footwear hubs and rain layers are separate problems — a wet boot is a <a href=\"/best/rain-jackets-under-150/\">rain layer</a> issue too.</p>",
    "faqs": [
        ("Should I size up for wide feet?", "No. Size the length to your longer foot and the width to your wider foot."),
        ("Boot or shoe?", "Shoe if the trail is moderate and your ankles are fine. Boot if you roll ankles or carry a heavy pack."),
        ("Are wide toe boxes the same as 2E?", "No. A foot-shaped last can feel wider at the toes and still be narrow at the heel."),
        ("How long is break-in?", "Leather: several short walks. Zero drop: two to three easy weeks. Do not inaugurate either on a 14-mile day."),
    ],
    "related": [("/guides/first-overnight-hike-packing-list/", "First overnight packing list"), ("/best/rain-jackets-under-150/", "Best rain jackets under $150"), ("/gear/hiking-footwear/", "Hiking footwear hub")],
    "method": "Ranked by fit problem (toe box vs labeled width vs support), not by a single lab width measurement.",
})

pages.append({
    "path": "/best/camping-stoves/",
    "title": "Best Camping Stoves: Canister, Integrated, and Budget Picks",
    "description": "Best camping stoves for backpacking and car camping. Canister stoves, wind performance, integrated systems, and a honest sub-$30 option.",
    "h1": "Best camping stoves",
    "kicker": "Money page · Kitchen",
    "read": "8 min",
    "crumbs": [("/gear/camp-kitchen/", "Camp kitchen"), ("/best/camping-stoves/", "Best camping stoves")],
    "answer": "<p>For backpacking, a remote-canister or well-shielded upright canister stove beats a fancy integrated system unless you only boil water. The Soto WindMaster is the wind-aware upright pick. The Jetboil MiniMo is the boil-and-eat system. For car camping, ignore ounces and use a two-burner — that setup lives in the <a href=\"/guides/car-camping-kitchen-setup/\">car camping kitchen guide</a>. Never run a stove in a tent.</p>",
    "who": "<p>Backpackers cooking for one or two, and car campers who want a clear split between trail stoves and camp stoves. Not a white-gas expedition manual.</p>",
    "products": [
        P("Soto WindMaster", "Soto", "Best wind-aware canister stove", "Soto WindMaster stove", "Mid", "Very light", "Three-season backpacking in breeze", "Still needs a windscreen strategy in a gale",
          "You cook real meals and hate flameouts.",
          "<p>The WindMaster’s inverted canister option and burner head are why it keeps beating basic upright stoves in wind. It is still a canister stove: cold-soak performance has limits below freezing.</p>",
          ["Better wind performance", "Light", "Simmer is usable"],
          ["Canister fuel only", "Pot support is not a griddle"]),
        P("MSR PocketRocket Deluxe", "MSR", "Best simple upright stove", "MSR PocketRocket Deluxe", "Lower mid", "Very light", "Fair-weather boils and simple meals", "Poor in wind without a shield",
          "You want a tiny stove and mostly cook in calm weather.",
          "<p>PocketRocket is the known upright stove. Deluxe adds a better igniter and regulator. It is not a wind stove. A foil windscreen used badly can melt a canister — read the manual.</p>",
          ["Tiny pack size", "Easy ignition", "Cheap fuel canisters everywhere"],
          ["Wind sensitive", "Small pot support"]),
        P("Jetboil MiniMo", "Jetboil", "Best integrated cooker", "Jetboil MiniMo cooking system", "Upper mid", "Heavier as a system", "People who boil water and rehydrate", "Poor for frying",
          "Your menu is coffee and freezer-bag meals.",
          "<p>Integrated systems win on boil time and lose on frying eggs. MiniMo is the one that can almost simmer. If you cook, buy a stove and a pot instead.</p>",
          ["Fast boils", "Pot and stove in one", "Decent simmer for the category"],
          ["Heavier", "Fuel inefficient if you fry"]),
        P("BRS-3000T", "BRS", "Best ultracheap backup", "BRS-3000T camping stove", "Budget", "Extremely light", "A second stove or fair-weather gram counters", "Fragile and wind-prone",
          "You need a $20 stove and will not depend on it in a storm.",
          "<p>The BRS is light and cheap and flexes under a full pot. Fine as a backup. A bad primary if dinner matters. See also the <a href=\"/best/budget-camping-gear-under-50/\">under-$50 gear list</a>.</p>",
          ["Very cheap", "Tiny", "Works in calm air"],
          ["Pot supports bend", "Useless in wind"]),
        P("MSR WhisperLite Universal", "MSR", "Best liquid-fuel option", "MSR WhisperLite Universal stove", "Upper mid", "Heavier", "Cold trips and international fuel uncertainty", "Pump, maintenance, and weight",
          "You camp below freezing or cannot count on canisters.",
          "<p>Liquid fuel is the cold-weather and travel answer. It is the wrong stove for a July weekend if canisters are at the trailhead store.</p>",
          ["Works in cold", "Field-maintainable", "Multi-fuel versions exist"],
          ["Heavier", "More steps to cook"]),
        P("Coleman Classic two-burner", "Coleman", "Best car-camping stove", "Coleman two burner camp stove", "Mid", "Not a backpacking item", "Car camping meals for a group", "Do not carry it in",
          "The car is 30 feet away.",
          "<p>Two burners change the meal. Pancakes and coffee at once. Keep it for drive-up sites and use a canister stove on the trail.</p>",
          ["Two burners", "Familiar", "Enough power for a group"],
          ["Heavy", "Not for a backpack"]),
    ],
    "one": "<p>Buy the <strong>Soto WindMaster</strong> and a simple pot if you backpack. Buy a two-burner if you only car camp. Do not buy an integrated system unless your menu is boiling water.</p>",
    "faqs": [
        ("Canister or liquid fuel?", "Canister for three-season convenience. Liquid fuel for cold and uncertain fuel supply."),
        ("Is a windscreen safe?", "Only the one the stove maker allows. Trapping heat against a canister can be dangerous."),
        ("How much fuel for a weekend?", "About one small canister for two people boiling water twice a day. Real cooking uses more."),
        ("Can I cook in the vestibule?", "Only with full ventilation and a stove designed for it. Carbon monoxide is not a draft you sleep through."),
    ],
    "related": [("/guides/car-camping-kitchen-setup/", "Car camping kitchen setup"), ("/best/budget-camping-gear-under-50/", "Best budget camping gear under $50"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list")],
    "method": "Split by fuel type and meal style. No timed boil test was run for this seed page.",
})

pages.append({
    "path": "/best/rain-jackets-under-150/",
    "title": "Best Rain Jackets Under $150 for Hiking",
    "description": "Best rain jackets under $150 for hiking and backpacking. Waterproof membranes, pit zips, packability, and what a $150 shell will not do.",
    "h1": "Best rain jackets under $150",
    "kicker": "Money page · Layers",
    "read": "7 min",
    "crumbs": [("/gear/rain-and-layers/", "Rain and layers"), ("/best/rain-jackets-under-150/", "Rain jackets under $150")],
    "answer": "<p>Under $150, buy a shell that keeps a day of rain out and accept that it will wet out sooner than a $300 jacket. Look for a helmet-compatible hood, pit zips, and a packable stuff sack. The Outdoor Research Helium and REI Rainier class are the usual answers. A rain jacket is not insulation — wear a fleece under it. Pair it with footwear that can get wet from the <a href=\"/best/hiking-boots-wide-feet/\">wide-feet boot guide</a> if splash, not just sky water, is the problem.</p>",
    "who": "<p>Hikers and backpackers who need a real rain layer without a premium shell budget. Not a ski or sailing jacket roundup.</p>",
    "products": [
        P("Outdoor Research Helium", "Outdoor Research", "Best packable under $150", "Outdoor Research Helium rain jacket", "Under $150", "Very light", "Backpacking, where the jacket lives in the lid", "Less durable face fabric",
          "You will carry the jacket more days than you wear it.",
          "<p>Helium is the packable answer. The face fabric is thin. It is a rain layer, not a bushwhack layer. Seam tape matters more than the logo.</p>",
          ["Stuffs small", "Light", "Usable hood"],
          ["Thin fabric", "Can feel clammy without pit zips on older versions"]),
        P("REI Co-op Rainier", "REI", "Best featured trail shell", "REI Rainier rain jacket", "Under $150", "Moderate", "Day hikes and weekend packs", "Not an alpine hardshell",
          "You want pit zips and a shop you can return to.",
          "<p>Rainier-class REI shells are the try-on pick. Check the current season’s pit zips before you buy. A shell without pit zips fails on a climb.</p>",
          ["Often has pit zips", "Returnable", "Trail cut"],
          ["Heavier than Helium", "Waterproofing is three-season, not storm-day alpine"]),
        P("Marmot PreCip Eco", "Marmot", "Best recycled budget shell", "Marmot PreCip Eco rain jacket", "Under $150", "Light", "Travel and trail", "DWR wears off",
          "You want a known name under the cap.",
          "<p>PreCip is a long-running budget shell. Re-proof the DWR when water stops beading. Wetting out is not the same as leaking seams.</p>",
          ["Widely reviewed", "Packable", "Often on sale under the cap"],
          ["Average breathability", "DWR maintenance"]),
        P("Columbia Watertight II", "Columbia", "Best everyday rain jacket", "Columbia Watertight II jacket", "Budget", "Heavier", "Car camping and town-to-trail", "Bulkier in a pack",
          "The jacket also has to work for a wet commute.",
          "<p>This is a raincoat that can hike, not a hike shell that can commute. Fine at the trailhead. Less fine at ounce 14 of a lid pocket.</p>",
          ["Low price", "Simple waterproof claim", "Easy sizing"],
          ["Bulk", "Generic hood"]),
        P("Black Diamond StormLine", "Black Diamond", "Best stretchy budget shell", "Black Diamond StormLine rain shell", "Under $150", "Light", "Active hiking with arm swing", "Not a burly shell",
          "You run warm and want the jacket to move.",
          "<p>Stretch matters when you pole. StormLine is a fair under-$150 active shell. It will not replace a ski shell in wet snow.</p>",
          ["Mobility", "Light", "Climbing-brand cut"],
          ["Thin", "Hood is basic"]),
        P("Frogg Toggs Ultra-Lite", "Frogg Toggs", "Best emergency layer", "Frogg Toggs Ultra-Lite rain jacket", "Budget", "Light", "A backup in the pack", "Looks and feels like a backup",
          "You already have a shell and want a loaner.",
          "<p>Frogg Toggs works and shreds in brush. Keep one in the car. Do not make it your only jacket for a week on the trail.</p>",
          ["Cheap", "Surprisingly dry", "Light"],
          ["Fragile", "No serious hood engineering"]),
    ],
    "one": "<p>Buy the <strong>Helium</strong> if pack size matters, or the <strong>Rainier</strong> if you can try it on and want pit zips. Re-proof either when rain sheets off in dark patches instead of beads.</p>",
    "faqs": [
        ("Is under $150 actually waterproof?", "Seam-taped budget shells are waterproof until the DWR wets out or tape fails. They are not as breathable as expensive shells."),
        ("Do I need pit zips?", "Yes if you hike uphill in rain. No if the jacket only covers camp chores."),
        ("Hard shell or soft shell?", "Hard shell for rain. Soft shell for wind and light drizzle."),
        ("What size?", "Large enough for a fleece underneath, not so large the hem scoops rain."),
    ],
    "related": [("/gear/rain-and-layers/", "Rain and layers hub"), ("/best/hiking-boots-wide-feet/", "Best hiking boots for wide feet"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list")],
    "method": "Capped at a $150 typical street price. Current Amazon prices move; the button is there so you can check.",
})

pages.append({
    "path": "/best/headlamps/",
    "title": "Best Headlamps for Hiking and Camp: Lumens, Runtime, and Red Light",
    "description": "Best headlamps for camping and backpacking. What lumens actually mean at camp, rechargeable vs AAA, and a low-weight pick.",
    "h1": "Best headlamps",
    "kicker": "Money page · Lighting",
    "read": "7 min",
    "crumbs": [("/gear/lighting-and-navigation/", "Lighting and navigation"), ("/best/headlamps/", "Best headlamps")],
    "answer": "<p>Buy a headlamp with a stable low mode around 5–30 lumens and a lock so it does not turn on in the pack. High lumens are for trail-finding, not for cooking. The Petzl Actik Core and Black Diamond Spot are the default rechargeable picks. The Nitecore NU25 is the weight pick. Carry a small backup on any overnight — see the <a href=\"/guides/first-overnight-hike-packing-list/\">packing list</a>.</p>",
    "who": "<p>Campers and hikers who walk after dusk or cook in the dark. Not a caving or search-and-rescue lamp guide.</p>",
    "products": [
        P("Petzl Actik Core", "Petzl", "Best rechargeable default", "Petzl Actik Core headlamp", "Mid", "Light", "Most hikers who want USB charging and a hybrid backup", "Core battery is proprietary",
          "You want one lamp for weekends and will recharge it in the car.",
          "<p>Actik Core is bright enough and has a red mode that does not wreck night vision at camp. Hybrid CORE battery means you are not stuck if you forget the cable, depending on the exact version — check the cell format on the current box.</p>",
          ["Useful low modes", "Rechargeable", "Stable beam"],
          ["Proprietary battery details", "Not the lightest"]),
        P("Black Diamond Spot 400-R", "Black Diamond", "Best settings you will actually use", "Black Diamond Spot 400-R headlamp", "Mid", "Light", "Camp chores and night hiking", "PowerTap is easy to bump",
          "You want memory modes and a red night mode.",
          "<p>Spot is the other default. PowerTap is handy and also the reason it turns on in a stuff sack. Use the lock.</p>",
          ["Red mode", "Rechargeable options", "IPX rating on current models"],
          ["Can switch on in the pack", "Band wears out"]),
        P("Nitecore NU25", "Nitecore", "Best lightweight", "Nitecore NU25 UL headlamp", "Lower mid", "Very light", "Gram counters", "Tiny buttons, tiny battery",
          "The lamp is on your list because of weight.",
          "<p>NU25 UL is a known light headlamp. Runtime on high is short. That is fine if high is for ten minutes of trail, not an hour of camp cleanup.</p>",
          ["Very light", "USB-C on recent versions", "Multiple modes"],
          ["Small battery", "Easier to lose"]),
        P("BioLite HeadLamp 330", "BioLite", "Best rear light", "BioLite HeadLamp 330", "Mid", "Moderate", "Road walks and group camps", "Heavier",
          "You walk roads at dusk and want to be seen from behind.",
          "<p>The rear red light is the feature. If you never leave the trail, you do not need it. If you shuttle on a shoulder, you do.</p>",
          ["Rear visibility", "Rechargeable", "Decent flood"],
          ["Heavier", "More than camp needs"]),
        P("Petzl Bindi", "Petzl", "Best camp-only lamp", "Petzl Bindi headlamp", "Lower mid", "Very light", "In-camp tasks, not night hiking", "Not enough throw for trail",
          "You cook and read and do not night-hike.",
          "<p>Bindi is a camp lamp. Do not buy it as your only light on a route that might run late.</p>",
          ["Tiny", "Rechargeable", "Good flood for chores"],
          ["Limited throw", "Short high runtime"]),
    ],
    "one": "<p>Buy the <strong>Actik Core</strong> or <strong>Spot 400-R</strong>, learn the lock, and put a second small light in the hip belt. Lumens on the box are not hours of camp light.</p>",
    "faqs": [
        ("How many lumens do I need?", "30 lumens cooks dinner. 200-plus finds the trail. A 1000-lumen claim is mostly marketing for this use."),
        ("Rechargeable or AAA?", "Rechargeable if you have a car or a power bank. AAA if you might forget to charge."),
        ("Is red light necessary?", "Useful in camp so you do not blind everyone. Not required for safety."),
        ("What about a lantern?", "A lantern is nicer at a picnic table. A headlamp keeps your hands free. Car campers can own both."),
    ],
    "related": [("/gear/lighting-and-navigation/", "Lighting hub"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list"), ("/best/budget-camping-gear-under-50/", "Budget gear under $50")],
    "method": "Chosen for low-mode usability, lockout, and weight class. Beam shots were not lab-measured for this seed page.",
})

pages.append({
    "path": "/guides/ultralight-backpacking-shelter/",
    "title": "Ultralight Backpacking Shelter Guide: Tent, Tarp, or Trekking-Pole",
    "description": "How to choose an ultralight backpacking shelter: trekking-pole tents, tarps, and when a freestanding tent is still lighter on your actual trip.",
    "h1": "Ultralight backpacking shelter guide",
    "kicker": "Guide · Shelters",
    "read": "8 min",
    "crumbs": [("/gear/backpacking/", "Backpacking"), ("/guides/ultralight-backpacking-shelter/", "Ultralight shelters")],
    "answer": "<p>An ultralight shelter is the lightest shelter that still matches your sites and your weather, not the lightest shelter on the internet. Trekking-pole tents such as the Durston X-Mid win when you already carry poles and can stake. A freestanding tent can be the lighter system if a non-freestanding shelter forces you to carry extra poles. DCF is a weight buy, not a value buy. Compare specific models on the <a href=\"/best/backpacking-tents/\">best backpacking tents</a> page before you cut the inner tent.</p>",
    "who": "<p>Hikers already under a reasonable pack weight who want the next cut to be the shelter, and beginners who have been told to buy a DCF tent first. The second group should not.</p>",
    "products": [
        P("Durston X-Mid 1", "Durston", "Best solo UL shelter", "Durston X-Mid 1", "Mid", "About 1.4 lb", "Solo hikers with poles", "Stake pitch",
          "You hike alone and will practice once.",
          "<p>The one-person X-Mid is the usual solo recommendation when forums argue about value ultralight tents. Floor area is the point. Condensation still happens.</p>",
          ["Low weight", "Double wall", "Fair price versus DCF"],
          ["Not freestanding", "Needs good stakes"]),
        P("Zpacks Duplex", "Zpacks", "Lightest common two-person", "Zpacks Duplex tent", "High", "Very low", "Long trails where ounces compound", "DCF cost and single-wall condensation",
          "You are thru-hiking or counting every ounce and accept the price.",
          "<p>Duplex-class DCF tents are light because the fabric is light, not because the design is magic. Budget for repairs and for a pad that handles the floor.</p>",
          ["Extremely light", "Two-person capable", "Fast pitch once learned"],
          ["Expensive", "Single wall"]),
        P("Gossamer Gear The One", "Gossamer Gear", "Best single-pole solo", "Gossamer Gear The One tent", "Mid", "Low", "Solo hikers with one pole", "Condensation",
          "You carry one pole and want a known solo tent.",
          "<p>The One is a single-wall, single-pole tent with a long trail resume. Vent it. A single wall in still, wet air will drip.</p>",
          ["Simple", "Light", "Affordable versus DCF"],
          ["Single wall", "One pole dependency"]),
        P("Big Agnes Copper Spur UL1", "Big Agnes", "Lightest reason to stay freestanding", "Big Agnes Copper Spur UL1", "High", "Low for freestanding", "Solo hikers on platforms", "Price",
          "Your sites are platforms and you refuse a stake-out tent.",
          "<p>If the itinerary includes wooden pads, a light freestanding solo tent can beat a lighter tent you cannot pitch. This is that argument.</p>",
          ["Freestanding", "Light for the type", "Two-vestibule usability on some versions"],
          ["Costs more", "Still not tarp-light"]),
        P("Polycro tarp and bivy", "Various", "Lightest skilled setup", "polycryo groundsheet tarp bivy", "Budget to mid", "Very low", "Dry climates and skilled campers", "Skill and exposure",
          "You have slept under a tarp already.",
          "<p>A tarp is light and unforgiving. Do not make a first overnight a tarp overnight. Use the <a href=\"/guides/first-overnight-hike-packing-list/\">packing list</a> shelter instead.</p>",
          ["Lowest weight and cost", "Versatile pitch", "Easy to replace"],
          ["No bug protection unless you add it", "Weather skill required"]),
    ],
    "one": "<p>If you are new to ultralight, buy the <strong>X-Mid 1 or 2</strong> and learn the pitch at home. Buy DCF only after you know you will use the weight savings.</p>",
    "faqs": [
        ("Is a tarp ultralight?", "Yes, and it is a skill purchase. Bugs and sideways rain are the failure modes."),
        ("Does DCF last?", "It is strong for the weight and expensive to replace. It is not a lifetime car-camping tent."),
        ("What stakes?", "Shepherd-hook stakes are why ultralight pitches fail. Use the stakes the shelter maker recommends for your soil."),
        ("Inner or fly first?", "Fly first in rain. Learn both at home."),
    ],
    "related": [("/best/backpacking-tents/", "Best backpacking tents"), ("/best/sleeping-bags-backpacking/", "Best sleeping bags"), ("/guides/how-to-choose-a-sleeping-pad/", "How to choose a sleeping pad")],
    "method": "Framed as a decision guide. Weights are class estimates from published specs, marked illustrative.",
})

pages.append({
    "path": "/guides/car-camping-kitchen-setup/",
    "title": "Car Camping Kitchen Setup: Stove, Table, and What to Leave Home",
    "description": "A practical car camping kitchen setup: two-burner stove, wash station, cooler logic, and the few items worth buying instead of raiding the house.",
    "h1": "Car camping kitchen setup",
    "kicker": "Guide · Camp kitchen",
    "read": "8 min",
    "crumbs": [("/gear/family-car-camping/", "Family and car camping"), ("/guides/car-camping-kitchen-setup/", "Car camping kitchen")],
    "answer": "<p>A car camping kitchen is a two-burner stove, a table at standing height, a wash bin, and a cooler you actually drain. Do not pack the backpacking stove as the main cooker. Do not buy a full chuck-box before you have cooked two weekends. The trail stove comparison lives on <a href=\"/best/camping-stoves/\">best camping stoves</a>. This page is the drive-up version.</p>",
    "who": "<p>Families and friends who camp within walking distance of the car, including first-time campground users. Not a backcountry kitchen.</p>",
    "products": [
        P("Coleman two-burner stove", "Coleman", "Core cooker", "Coleman classic two burner propane camp stove", "Mid", "Car weight", "Group breakfasts", "Needs propane bottles and a level table",
          "You cook for more than one person.",
          "<p>Two burners are the difference between camping and waiting. Bring a spare propane cylinder. Check the regulator before a holiday weekend.</p>",
          ["Two burners", "Available everywhere", "Enough heat"],
          ["Heavy", "Wind still matters"]),
        P("Roll-up camp table", "Generic", "Standing work surface", "aluminum roll top camp table", "Mid", "Car weight", "Prep and serving", "Flimsy cheap tables fold under a stove",
          "The picnic table is already claimed by another family.",
          "<p>Put the stove on a table rated for it, not on a folding tv-tray. Height saves your back. That is the feature.</p>",
          ["Back-saving height", "Extra prep space", "Packs in the car"],
          ["Cheap tables wobble", "Takes floor space in a small tent site"]),
        P("Nesting wash bins", "Generic", "Dish system", "collapsible camping wash basin 3 pack", "Budget", "Light", "Wash, rinse, sanitize", "You must actually do the steps",
          "You are tired of dirty plates in a single bucket.",
          "<p>Three bins: wash, rinse, bleach-or-tablets sanitize. Strain food scraps. A bear site is not a place for a dirty cooler.</p>",
          ["Cheap", "Collapsible", "Solves the real chore"],
          ["Needs a routine", "Not exciting gear"]),
        P("Hard cooler, 45–65 qt", "YETI or a mid-tier rotomold", "Ice that lasts", "rotomolded cooler 45 quart", "Wide range", "Heavy", "Weekends where ice matters", "Price jumps fast",
          "You are tired of replacing ice daily.",
          "<p>A decent rotomolded cooler holds ice. A $30 cooler is a lunchbox. Pre-chill food. A cooler full of warm drinks on Friday will be water by Saturday.</p>",
          ["Ice retention", "Seat or table in camp", "Fewer store runs"],
          ["Heavy", "Premium brands are a luxury buy"]),
        P("Enamel or steel skillet", "Lodge", "The one pan", "Lodge cast iron or carbon steel camp skillet", "Budget to mid", "Heavy, and that is fine", "Breakfast and one-pan dinners", "Cast iron is silly in a backpack",
          "The car is carrying it.",
          "<p>One real pan beats a nested backpacking set at a picnic table. Cast iron stays home if the site is a long carry from the lot.</p>",
          ["Even heat", "No nonstick anxiety", "Cheap"],
          ["Heavy", "Needs a little care"]),
        P("Headlamp per cook", "Petzl or Black Diamond", "Night kitchen light", "rechargeable camping headlamp", "Mid", "Light", "Cooking after sunset", "One lamp is not enough for a family",
          "Dinner happens after dark.",
          "<p>A lantern lights the table. Headlamps light the hands. See <a href=\"/best/headlamps/\">best headlamps</a> for the specific picks.</p>",
          ["Hands free", "Cheap insurance", "Doubles as a hike light"],
          ["Easy to leave in the tent"]),
    ],
    "one": "<p>Buy the <strong>two-burner and three wash bins</strong> before any gadget. A kitchen fails on dishes and heat, not on a spice rack.</p>",
    "faqs": [
        ("Propane or white gas for car camping?", "Propane. White gas is a backcountry and cold-weather tool."),
        ("Do I need a camp kitchen box?", "After three trips, build one from a bin you already own. Not before."),
        ("How do I handle food smells?", "Cook and store food away from the tent. Use the site’s box or a canister if required."),
        ("Is a backpacking stove enough for a family?", "No. It is a backup for coffee if the two-burner fails."),
    ],
    "related": [("/best/camping-stoves/", "Best camping stoves"), ("/best/headlamps/", "Best headlamps"), ("/best/budget-camping-gear-under-50/", "Budget gear under $50")],
    "method": "Built around chores (heat, surface, wash, cold) rather than a gadget list.",
})

pages.append({
    "path": "/compare/osprey-vs-gregory-backpack/",
    "title": "Osprey vs Gregory Backpack: Atmos AG 65 vs Baltoro 65",
    "description": "Osprey Atmos AG 65 vs Gregory Baltoro 65: ventilation, organization, fit, and who should buy which. Illustrative 2026 comparison, not a lab test.",
    "h1": "Osprey vs Gregory backpack",
    "kicker": "Comparison · Illustrative models",
    "read": "8 min",
    "crumbs": [("/gear/backpacking/", "Backpacking"), ("/compare/osprey-vs-gregory-backpack/", "Osprey vs Gregory")],
    "answer": "<p>These picks are illustrative, not a claim that one current colorway won a lab test. For hot miles and a load you can keep honest, the Osprey Atmos AG 65 is the usual ventilation pick. For a pack you live out of — lid, pockets, winter bulk — the Gregory Baltoro 65 is the usual organization pick. Fit the torso first. A 65-liter pack is the wrong answer for a day hike and the wrong answer for a first overnight under 8 miles. That trip is on the <a href=\"/guides/first-overnight-hike-packing-list/\">packing list</a>.</p>",
    "who": "<p>Hikers choosing a first serious 60–65 liter pack for multi-day trips. Women’s fits are Aura AG and Deva, not these men’s model names. Marked illustrative.</p>",
    "products": [
        P("Osprey Atmos AG 65 (illustrative)", "Osprey", "Ventilation pick", "Osprey Atmos AG 65", "Mid to upper", "Moderate for a 65", "Hot-weather miles, Anti-Gravity back panel", "Fewer small pockets than a Baltoro",
          "Your back sweats and your load is a normal multi-day kit.",
          "<p>Illustrative example: the Atmos AG uses a suspended mesh panel. That gap is the product. Osprey’s All Mighty Guarantee is broader than a defect-only warranty, which matters over a decade. Fit the torso length in a shop if you can.</p>",
          ["Back ventilation", "Strong warranty reputation", "Included rain cover on many versions"],
          ["Less pocketed", "Mesh panel is one more thing to fit"]),
        P("Gregory Baltoro 65 (illustrative)", "Gregory", "Organization pick", "Gregory Baltoro 65", "Mid to upper", "Similar class", "Heavier weeks, winter bulk, lid lovers", "Can feel warmer on the back",
          "You unpack at camp and want a place for every small item.",
          "<p>Illustrative example: the Baltoro is the pocketed, load-hauling reputation pack. People who like a lid and a real hip-belt organization tend to land here. Ventilation claims vary by year — try it loaded.</p>",
          ["Organization", "Stable carry reputation", "Lid and pocket layout"],
          ["Can run warmer", "Warranty is typically defect-focused"]),
        P("Osprey Exos / Eja (illustrative light alternative)", "Osprey", "If 65 is too much pack", "Osprey Exos 58 backpack", "Mid", "Lighter", "Ultralight-leaning kits", "Less padding, less organization",
          "Your base weight is already low.",
          "<p>If the argument is really about weight, step down in volume. A feature-packed 65 is the wrong fight. Exos-class packs are the lighter Osprey branch.</p>",
          ["Lighter", "Still a framed pack", "Ventilated trampoline on many years"],
          ["Carries heavy loads less kindly", "Fewer pockets"]),
        P("Gregory Maven / Paragon class (illustrative day-to-overnight)", "Gregory", "If you do not need 65 liters", "Gregory Paragon backpack", "Mid", "Daypack class", "Overnights with a disciplined kit", "Not a week-long winter pack",
          "You are about to overbuy.",
          "<p>Most first overnights do not need 65 liters. Extra volume becomes extra gear. This slot is the reminder, not a second 65.</p>",
          ["Right size for many trips", "Easier to lift", "Less expensive"],
          ["You will outgrow it if you pack bulky sleep systems"]),
    ],
    "one": "<p>Try both loaded with 25 pounds. Buy the <strong>Atmos AG</strong> if the mesh gap feels like relief. Buy the <strong>Baltoro</strong> if you keep reaching for pockets the Atmos does not have. Ignore either if the torso length is wrong.</p>",
    "faqs": [
        ("Atmos or Baltoro for the AT in summer?", "Atmos-style ventilation is the usual hot-weather answer, if the fit is right."),
        ("Which has the better warranty?", "Osprey’s All Mighty Guarantee is broader. Gregory typically covers defects. Read the current policy."),
        ("What size for a first overnight?", "Often 40–50 liters if the sleep system is compact. 65 if the kit is bulky."),
        ("Are these current models?", "Illustrative 2026 examples. Confirm the year’s harness before you order."),
    ],
    "related": [("/guides/first-overnight-hike-packing-list/", "First overnight packing list"), ("/best/backpacking-tents/", "Best backpacking tents"), ("/gear/backpacking/", "Backpacking hub")],
    "method": "Illustrative comparison of two popular 65-liter lines using publicly discussed fit differences. Not a Trailkit load-carriage lab test.",
})

pages.append({
    "path": "/guides/first-overnight-hike-packing-list/",
    "title": "First Overnight Hike Packing List: What to Bring and What to Leave",
    "description": "First overnight hike packing list with a shelter, sleep, kitchen, and clothing core. Built for a fair-weather one-night trip, with links to the gear pages.",
    "h1": "First overnight hike packing list",
    "kicker": "Guide · Planning",
    "read": "8 min",
    "crumbs": [("/gear/backpacking/", "Backpacking"), ("/guides/first-overnight-hike-packing-list/", "Overnight packing list")],
    "answer": "<p>A first overnight needs a shelter you can pitch, a sleep system rated for the real low, a way to boil water, a rain layer, and a headlamp with spare light. It does not need a 65-liter pack full of extras. Use a two-person freestanding tent even if you hike alone, a 20°F-class bag if nights drop near freezing, and the stove you practiced at home. Specific buys are on the <a href=\"/best/backpacking-tents/\">tent</a>, <a href=\"/best/sleeping-bags-backpacking/\">bag</a>, and <a href=\"/best/camping-stoves/\">stove</a> pages.</p>",
    "who": "<p>Someone whose longest hike so far is a day hike, planning one fair-weather night within a few miles of the trailhead. Not a first winter camp.</p>",
    "products": [
        P("Shelter: freestanding 2-person tent", "Various", "Do not improvise shelter", "freestanding 2 person backpacking tent", "Mid", "3 lb class is fine", "A first night you might arrive late", "Heavier than a tarp",
          "You have never pitched in wind.",
          "<p>Pitch it in the yard first. A late arrival is a bad time to learn pole order. The tent page ranks current options.</p>",
          ["Stands before staking", "Room for a wet pack", "Forgiving"],
          ["Heavier than UL shelters"]),
        P("Sleep: bag plus pad", "Various", "The warmth is the system", "backpacking sleeping bag and pad", "Mid", "The bulky items", "The forecast low, plus a margin if you sleep cold", "Bulk",
          "You do not yet know if you sleep cold.",
          "<p>Rent or borrow the first bag if you can. Buy the pad with an R-value, not a picture of thickness. The pad guide explains R-value.</p>",
          ["Warmth", "The actual point of the night", "Borrowable"],
          ["Takes the most pack space"]),
        P("Kitchen: stove, pot, spoon, filter", "Various", "Eat and drink", "canister camping stove and water filter", "Lower mid", "Light", "One hot meal and safe water", "Fuel is a separate purchase",
          "You will not forage a dinner.",
          "<p>One pot, one stove, one spoon, a filter or tablets you trust. Cook before you leave so the igniter is not a mystery.</p>",
          ["Simple", "Light", "Redundant water treatment if you add tablets"],
          ["Cold-soak only if you practiced that too"]),
        P("Rain jacket and extra layer", "Various", "Weather is the risk", "packable hiking rain jacket", "Under $150 possible", "Light", "A forecast that is wrong", "Not insulation by itself",
          "The afternoon looks clear.",
          "<p>Pack the jacket anyway. Add a fleece. Cotton hoodie stays in the car.</p>",
          ["Small insurance", "Doubles as camp warmth with a fleece", "Under-$150 options exist"],
          ["You will be tempted to leave it"]),
        P("Headlamp and a backup", "Petzl or Black Diamond", "See the camp", "hiking headlamp", "Mid", "Light", "Cooking and a trail that ran long", "Dead battery",
          "Sunset is a plan, not a guarantee.",
          "<p>Lock the lamp so it dies in the pack before the trip. A second light can be a tiny clip light.</p>",
          ["Required", "Cheap", "Backup is small"],
          ["Easy to forget the lock"]),
        P("Ten essentials extras", "Various", "The unglamorous kit", "backpack first aid kit and navigation", "Budget", "Light", "Blisters, route, fire rules", "Not a substitute for turning around",
          "You are optimizing the fun gear first.",
          "<p>Map or offline map, repair tape, blister care, whistle, the permit, and a battery pack if the map is a phone. Tell someone the plan.</p>",
          ["Small", "High consequence if missing", "Mostly cheap"],
          ["Boring to pack"]),
    ],
    "one": "<p>Practice the tent pitch and one stove meal at home. If those two work, the night will work. Leave the camp chair.</p>",
    "faqs": [
        ("How far should the first overnight be?", "A few miles, with daylight to spare. Distance is not the achievement."),
        ("What pack size?", "40–50 liters if you are disciplined. More only if the sleep system is bulky."),
        ("Can I use a hammock?", "Only with an underquilt you have slept in. A first night is a bad insulation experiment."),
        ("What food?", "One no-cook lunch, one hot dinner you have eaten before, breakfast that does not need a project."),
    ],
    "related": [("/best/backpacking-tents/", "Best backpacking tents"), ("/best/camping-stoves/", "Best camping stoves"), ("/best/headlamps/", "Best headlamps")],
    "method": "A constraint list for one fair-weather night, linked to money pages rather than a 40-item gadget dump.",
})

pages.append({
    "path": "/guides/how-to-choose-a-sleeping-pad/",
    "title": "How to Choose a Sleeping Pad: R-Value, Width, and Pad Type",
    "description": "How to choose a sleeping pad using R-value, width, and inflation type. Air, foam, and what a thick pad still gets wrong.",
    "h1": "How to choose a sleeping pad",
    "kicker": "Guide · Sleep",
    "read": "7 min",
    "crumbs": [("/gear/sleep-systems/", "Sleep systems"), ("/guides/how-to-choose-a-sleeping-pad/", "Choose a sleeping pad")],
    "answer": "<p>Choose a sleeping pad by R-value first, width second, weight third. R-value is insulation from the ground. Thickness is not R-value. A 3-season backpacking pad should be around R 3–4 for most sleepers, and R 5 or higher if you sleep cold or camp on snow-adjacent ground. An air pad is the backpacking default. Closed-cell foam is the backup and the winter supplement. The bag on top is a separate choice — see <a href=\"/best/sleeping-bags-backpacking/\">sleeping bags</a>.</p>",
    "who": "<p>Anyone buying a first backpacking pad, or replacing a thick pad that was still cold. Includes side sleepers who need width more than they need a marketing R-value.</p>",
    "products": [
        P("Therm-a-Rest NeoAir XLite NXT", "Therm-a-Rest", "Best warmth-to-weight air pad", "Therm-a-Rest NeoAir XLite NXT", "Upper mid", "Low", "3-season backpacking", "Crinkle noise on some versions",
          "You want a light pad with a real R-value.",
          "<p>XLite is the common backpacking air pad because the R-value is in the right band for the weight. Wide versions exist for side sleepers. They are worth the grams.</p>",
          ["Strong R-value for the weight", "Packs small", "Wide option"],
          ["Price", "Can be noisy"]),
        P("NEMO Tensor", "NEMO", "Best quieter air pad", "NEMO Tensor sleeping pad", "Upper mid", "Low", "People who hate crinkly pads", "Still an air pad that can puncture",
          "Noise kept you awake on the last air pad.",
          "<p>Tensor-class pads trade a little of the XLite’s fame for a quieter lay. Check the current R-value on the spec sheet, not a review from two versions ago.</p>",
          ["Quieter", "Comfortable baffle shapes", "Light"],
          ["Puncture risk like any air pad", "Premium price"]),
        P("Exped Ultra pad", "Exped", "Best thicker comfort", "Exped Ultra sleeping pad", "Mid to upper", "A bit heavier", "Side sleepers who want thickness", "Weight",
          "Your hips hurt on thin pads.",
          "<p>Thickness helps comfort. It does not replace R-value. Read both numbers. A thick summer pad on cold ground is still cold.</p>",
          ["Comfort", "Stable feel", "Clear R-value publishing"],
          ["Heavier", "Bulkier"]),
        P("Therm-a-Rest Z Lite Sol", "Therm-a-Rest", "Best foam backup", "Therm-a-Rest Z Lite Sol", "Lower mid", "Light for foam", "Backup under an air pad, or hot-weather minimalists", "Low R-value alone for cold nights",
          "You want a pad that cannot puncture.",
          "<p>Closed-cell foam is the reliability pad. Alone, it is a summer pad. Under an air pad, it is insurance and extra R-value.</p>",
          ["No puncture", "Sits under you at lunch", "Cheap insurance"],
          ["Bulky", "Low R-value alone"]),
        P("Wide rectangular car-camp pad", "Various", "Best drive-up pad", "wide camping sleeping pad", "Wide range", "Irrelevant", "Car camping", "Do not backpack it",
          "The car is carrying the bed.",
          "<p>If you never leave the trailhead, buy comfort. This is not the backpacking answer. The kitchen for that trip is a different page.</p>",
          ["Sleep", "Width", "No ounce guilt"],
          ["Huge packed size"]),
    ],
    "one": "<p>Buy an <strong>insulated air pad around R 3.5 or higher in the wide</strong> if you side-sleep. Add a short foam pad only if you are puncture-anxious or camping colder than the air pad’s rating.</p>",
    "faqs": [
        ("What R-value for summer?", "Around 2–3 if you sleep warm. Cold sleepers should still start near 3.5."),
        ("What R-value for winter?", "Often 5 or more, sometimes foam plus air. This page is not a full winter system."),
        ("Does a higher R-value sleep hotter in July?", "You can vent the bag. You cannot add ground insulation you did not bring."),
        ("Mummy pad or rectangular?", "Mummy saves weight. Rectangular saves arguments with your elbows."),
    ],
    "related": [("/best/sleeping-bags-backpacking/", "Best sleeping bags for backpacking"), ("/guides/ultralight-backpacking-shelter/", "Ultralight shelter guide"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list")],
    "method": "Decision order is R-value, width, weight. Example pads are illustrative of those roles.",
})

pages.append({
    "path": "/best/budget-camping-gear-under-50/",
    "title": "Best Budget Camping Gear Under $50 That Is Actually Useful",
    "description": "Best budget camping gear under $50: the items worth buying cheap, and the items that fail when you cheap out. Stoves, lights, dry bags, and repair kits.",
    "h1": "Best budget camping gear under $50",
    "kicker": "Money page · Budget",
    "read": "7 min",
    "crumbs": [("/gear/family-car-camping/", "Family and car camping"), ("/best/budget-camping-gear-under-50/", "Budget gear under $50")],
    "answer": "<p>Spend under $50 on things that are simple: a backup stove, a dry bag, a sit pad, a repair kit, a picnic wash bin. Do not spend under $50 expecting a backpacking tent or a winter bag. Those categories fail in predictable ways. The BRS stove is a fair cheap backup. A headlamp under $50 is fine if it has a lock and a low mode. For the real shelter, use the <a href=\"/best/backpacking-tents/\">tent guide</a> and buy once.</p>",
    "who": "<p>Car campers filling gaps and backpackers who need a cheap spare, not a full kit from a single discount aisle.</p>",
    "products": [
        P("BRS-3000T stove", "BRS", "Best under-$20 stove backup", "BRS-3000T stove", "Under $20", "Negligible", "Calm-weather backup", "Bends under heavy pots",
          "You already own a better stove, or you only boil water in campgrounds.",
          "<p>Useful, fragile, wind-prone. A good spare. A bad only stove on an exposed ridge.</p>",
          ["Cheap", "Light", "Works"],
          ["Fragile", "Wind"]),
        P("Dry bags, 10–20 L", "Generic", "Best cheap organization", "lightweight dry bag 10 liter", "Under $20", "Light", "Keeping a sleeping bag dry", "Roll-tops fail if you pack them open",
          "Your pack is not fully waterproof.",
          "<p>A cheap dry bag around the sleep system prevents the most expensive mistake. Test the roll at home.</p>",
          ["Protects the bag", "Cheap", "Also a stuff sack"],
          ["Seams on no-name bags vary"]),
        P("Closed-cell sit pad", "Generic", "Best cheap comfort", "closed cell foam sit pad", "Under $20", "Light", "Breaks and cold ground", "Not a sleep system",
          "You sit on wet logs.",
          "<p>A sit pad is a seat, a kneeling pad, and a tiny bit of extra insulation under a hip. It is not a bed.</p>",
          ["Cheap", "Multi-use", "Cannot puncture"],
          ["Not a mattress"]),
        P("Tenacious Tape and a patch kit", "Gear Aid", "Best cheap insurance", "Gear Aid Tenacious Tape repair", "Under $15", "Nothing", "Air pads and jackets", "Does not fix a broken pole by itself",
          "You own an air pad.",
          "<p>The repair kit is the budget item that saves the expensive item. Put it in the lid pocket.</p>",
          ["Actually useful", "Tiny", "Cheap"],
          ["You have to remember it"]),
        P("Collapsible wash bin", "Generic", "Best car-camp chore tool", "collapsible wash basin camping", "Under $20", "Car", "Dishes", "One bin is not a full wash system",
          "Dishes are happening in the pot.",
          "<p>Buy two or three. The kitchen page explains the wash-rinse-sanitize order.</p>",
          ["Cheap", "Solves a real problem", "Packs flat"],
          ["Needs a routine"]),
        P("Clip backup light", "Generic", "Best second light", "clip on camping backup light", "Under $20", "Light", "When the headlamp dies", "Not a primary",
          "You own one headlamp.",
          "<p>A second light under $20 is the right budget. A primary headlamp should still come from the headlamp page if you can stretch.</p>",
          ["Redundant", "Cheap", "Clips to a brim"],
          ["Weak beam"]),
    ],
    "one": "<p>Buy the <strong>dry bag, the tape, and the backup light</strong>. Skip the $40 tent.</p>",
    "faqs": [
        ("What should I never cheap out on?", "Shelter in bad weather, a sleep system for the real temperature, and footwear."),
        ("Are Amazon basics stoves safe?", "A canister stove used as directed, outside, is a normal tool. A stove used in a tent is not."),
        ("Is a $50 sleeping bag enough?", "For a warm summer car camp, maybe. For backpacking near freezing, no."),
        ("Where do real buys live?", "On the tents, bags, boots, and stove pages, where the constraint is not a price cap."),
    ],
    "related": [("/best/camping-stoves/", "Best camping stoves"), ("/guides/car-camping-kitchen-setup/", "Car camping kitchen"), ("/best/headlamps/", "Best headlamps")],
    "method": "Included only items whose failure mode is acceptable. Excluded budget shelters and budget winter bags on purpose.",
})

# write articles
urls = []
for page in pages:
    page.setdefault("faqs", [])
    dest = ROOT / page["path"].strip("/") / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(render_article(page), encoding="utf-8")
    urls.append((page["path"], page["title"]))

hubs = [
    ("/gear/backpacking/", "Backpacking gear hub", "Backpacking guides and tent, pack, and kit pages.",
     [("/best/backpacking-tents/", "Best backpacking tents"), ("/guides/ultralight-backpacking-shelter/", "Ultralight shelter guide"), ("/compare/osprey-vs-gregory-backpack/", "Osprey vs Gregory"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list")]),
    ("/gear/hiking-footwear/", "Hiking footwear hub", "Boots and shoes chosen for a constraint, starting with width.",
     [("/best/hiking-boots-wide-feet/", "Best hiking boots for wide feet"), ("/guides/first-overnight-hike-packing-list/", "First overnight packing list")]),
    ("/gear/camp-kitchen/", "Camp kitchen hub", "Stoves and drive-up kitchens.",
     [("/best/camping-stoves/", "Best camping stoves"), ("/guides/car-camping-kitchen-setup/", "Car camping kitchen setup"), ("/best/budget-camping-gear-under-50/", "Budget gear under $50")]),
    ("/gear/sleep-systems/", "Sleep systems hub", "Bags, quilts, and pads.",
     [("/best/sleeping-bags-backpacking/", "Best sleeping bags"), ("/guides/how-to-choose-a-sleeping-pad/", "How to choose a sleeping pad")]),
    ("/gear/rain-and-layers/", "Rain and layers hub", "Shells that match a real budget.",
     [("/best/rain-jackets-under-150/", "Best rain jackets under $150"), ("/best/hiking-boots-wide-feet/", "Wide-feet boots")]),
    ("/gear/lighting-and-navigation/", "Lighting and navigation hub", "Headlamps and the backup light.",
     [("/best/headlamps/", "Best headlamps"), ("/guides/first-overnight-hike-packing-list/", "Packing list")]),
    ("/gear/family-car-camping/", "Family and car camping hub", "Gear that stays near the car.",
     [("/guides/car-camping-kitchen-setup/", "Car camping kitchen"), ("/best/budget-camping-gear-under-50/", "Budget gear under $50"), ("/best/camping-stoves/", "Stoves")]),
]

for path, h1, desc, links in hubs:
    page = {
        "path": path, "title": f"{h1} | {BRAND}", "description": desc, "h1": h1,
        "crumbs": [(path, h1)], "faqs": [], "products": None,
    }
    cards = "".join(f'<a class="card" href="{h}"><strong>{e(n)}</strong><small>Open guide</small></a>' for h, n in links)
    inner = f"<p class='lede'>{e(desc)}</p><div class='cards'>{cards}</div><p>Each linked page has a comparison table, a single best pick, and an affiliate disclosure next to the product links.</p>"
    dest = ROOT / path.strip("/") / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(render_simple(page, inner), encoding="utf-8")
    urls.append((path, h1))

util = []

def util_page(path, title, h1, desc, inner):
    page = {"path": path, "title": title, "description": desc, "h1": h1, "crumbs": [(path, h1)], "faqs": [], "products": None}
    dest = ROOT / path.strip("/") / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(render_simple(page, inner), encoding="utf-8")
    urls.append((path, h1))

util_page("/about/", f"About {BRAND}", f"About {BRAND}",
          f"{BRAND} publishes practical outdoor gear recommendations for hiking, backpacking, and car camping.",
          f"<p>{BRAND} is a gear guide for people who already know the activity and need the product that fits a constraint: budget, weight, weather, width, or trip length.</p><p>We are not a lab. Seed pages name that limit. When a model is illustrative, the page says so.</p><p>The working name lives in <code>site.config.json</code> and <code>js/site.js</code>.</p>")

util_page("/editorial-standards/", f"Editorial standards | {BRAND}", "Editorial standards",
          "How Trailkit frames gear recommendations, updates pages, and handles affiliate links.",
          "<p>Commercial pages lead with a direct answer, a who-it-is-for line, a comparison table, and a single default pick.</p><ul><li>No invented test scores.</li><li>Prices are not hard-coded. Buttons say check current price.</li><li>Illustrative comparisons are labeled.</li><li>Each money page links to at least two related guides.</li><li>Affiliate links use rel=\"sponsored nofollow\".</li><li>Update the visible date when specs change.</li></ul>")

util_page("/affiliate-disclosure/", f"Affiliate disclosure | {BRAND}", "Affiliate disclosure",
          "Amazon Associates disclosure for Trailkit.",
          f"<p>{e(DISCLOSURE)}</p><p>Product links use rel=\"sponsored nofollow\". A recommendation is not a promise of price, stock, or fit. Check the current listing, including size and width.</p>")

util_page("/contact/", f"Contact | {BRAND}", "Contact",
          "Contact Trailkit about corrections and partnerships.",
          "<p>Email corrections to <a href=\"mailto:hello@trailkit.example\">hello@trailkit.example</a>. Include the page URL and the spec you believe is wrong.</p><p>We do not accept payment for placement in a ranked list.</p>")

util_page("/privacy/", f"Privacy | {BRAND}", "Privacy",
          "Privacy notes for Trailkit, including analytics that stay off until configured.",
          "<p>This static site does not run advertising cookies by default. Google Analytics 4 loads only after you replace the placeholder measurement ID in <code>js/site.js</code>.</p><p>Amazon and other outbound sites have their own policies once you leave.</p><p>Search Console verification is a meta tag in each page head. Replace the token in <code>site.config.json</code> and regenerate, or edit the template.</p>")

# home
home_cards = [
    ("/best/backpacking-tents/", "Best backpacking tents", "Freestanding vs trekking-pole"),
    ("/best/hiking-boots-wide-feet/", "Hiking boots for wide feet", "Width, not a longer size"),
    ("/best/sleeping-bags-backpacking/", "Sleeping bags", "Bag vs quilt, by sleeper"),
    ("/best/camping-stoves/", "Camping stoves", "Wind, fuel, and car camp"),
    ("/best/rain-jackets-under-150/", "Rain jackets under $150", "What the cap can buy"),
    ("/compare/osprey-vs-gregory-backpack/", "Osprey vs Gregory", "Illustrative 65-liter matchup"),
    ("/guides/first-overnight-hike-packing-list/", "First overnight list", "What to bring once"),
    ("/best/budget-camping-gear-under-50/", "Gear under $50", "Cheap items that should be cheap"),
]
cards = "".join(f'<a class="card" href="{h}"><strong>{e(n)}</strong><small>{e(s)}</small></a>' for h, n, s in home_cards)
hub_cards = "".join(
    f'<a class="card" href="{h}"><strong>{e(n)}</strong><small>Category hub</small></a>'
    for h, n in [
        ("/gear/backpacking/", "Backpacking"),
        ("/gear/hiking-footwear/", "Hiking footwear"),
        ("/gear/camp-kitchen/", "Camp kitchen"),
        ("/gear/sleep-systems/", "Sleep systems"),
        ("/gear/rain-and-layers/", "Rain and layers"),
        ("/gear/lighting-and-navigation/", "Lighting and navigation"),
        ("/gear/family-car-camping/", "Family and car camping"),
    ]
)
home = {
    "path": "/",
    "title": f"{BRAND}: practical hiking and backpacking gear picks",
    "description": "Trailkit ranks backpacking tents, wide-foot hiking boots, sleep systems, stoves, and rain layers for the constraint you actually have.",
    "h1": "Gear picks for the trip you are actually taking",
    "crumbs": [("/", "Home")],
    "faqs": [],
    "products": None,
}
home_inner = f"""
<p class="lede">Specific recommendations for hiking, backpacking, and car camping. Budget, weight, weather, and fit — not a generic top-ten.</p>
<p class="meta-row">Updated {e(UPDATED)}</p>
<div class="disclosure">{e(DISCLOSURE)}</div>
<h2>Start here</h2>
<div class="cards">{cards}</div>
<h2>Category hubs</h2>
<div class="cards">{hub_cards}</div>
<h2>Latest updates</h2>
<ul>
  <li>October 5, 2026 — Seed library: tents, bags, wide boots, stoves, rain shells, headlamps, shelter guide, car kitchen, Osprey vs Gregory, packing list, pad guide, budget list.</li>
</ul>
"""
# custom home with hero
home_html = head(home) + f"""
<section class="hero">
  <div class="wrap">
    <p class="kicker">Outdoor gear, constrained</p>
    <h1>Gear picks for the trip you are actually taking</h1>
    <p class="lede">{e(BRAND)} ranks tents, boots, sleep systems, stoves, and shells for a real limit: budget, weight, weather, width, or a first night out.</p>
  </div>
</section>
<main id="content" class="wrap" style="padding:1.6rem 0 3rem">
{home_inner}
</main>
""" + footer()
(ROOT / "index.html").write_text(home_html, encoding="utf-8")
urls.insert(0, ("/", f"{BRAND} home"))

# 404
page404 = {"path": "/404.html", "title": f"Page not found | {BRAND}", "description": "That page is missing.", "h1": "Page not found", "crumbs": [("/404.html", "404")], "faqs": [], "products": None}
(ROOT / "404.html").write_text(render_simple(page404, "<p>That URL is not on the site. Try the <a href=\"/\">home page</a> or the <a href=\"/gear/backpacking/\">backpacking hub</a>.</p>"), encoding="utf-8")

# robots + sitemap
(ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path, _ in urls:
    loc = SITE + ("/" if path == "/" else path)
    sm.append(f"  <url><loc>{loc}</loc><lastmod>2026-10-05</lastmod></url>")
sm.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8")

# config copy
(ROOT / "site.config.json").write_text(json.dumps(CFG, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(urls)} urls")
