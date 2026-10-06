import type { Compare, Guide, Kit, Roundup } from "./types";

const method =
  "Picks are chosen for how you will use them, not by a private lab score. Weights and ratings are the manufacturer’s published figures and can change with the model year. Prices are not listed. Open the current listing before you buy.";

export const roundups: Roundup[] = [
  {
    slug: "backpacking-tents",
    title: "Best Backpacking Tents",
    description: "Best two-person backpacking tents by pitch style: freestanding Copper Spur, trekking-pole X-Mid, wet-weather Dragonfly, Hubba Hubba, and Tiger Wall.",
    h1: "Best backpacking tents",
    kicker: "Roundup · Shelters",
    category: "tents",
    answer:
      "For most two-person trips, buy a freestanding double-wall tent if you camp on platforms or rock, and a trekking-pole tent if you already carry poles and can stake. The Big Agnes Copper Spur UL2 is the default freestanding pick. The Durston X-Mid 2 is the default trekking-pole pick. A first weekend under eight miles can use a heavier freestanding tent; that beginner pick is on the first overnight page, and the budget band is on the budget tents page.",
    teaser: "Copper Spur UL2 if your sites include platforms. X-Mid 2 only if you already carry poles and can stake the pitch.",
    who: "Beginners who want a tent that stands before it is staked, and experienced hikers shaving weight on a two- to five-night route. Not a four-season mountaineering guide.",
    productSlugs: ["copper-spur-ul2", "x-mid-2", "dragonfly-osmo-2", "hubba-hubba-2", "tiger-wall-ul2"],
    one: "Buy the Copper Spur UL2 if you want one tent that works on platforms and dirt. Buy the X-Mid 2 only if you already use trekking poles and will practice the pitch.",
    quick: {
      caption: "Quick answer: how heavy a backpacking tent should be",
      lead: "There is no single right number. For a two-person tent shared by two, the lighter picks here weigh about 2 to 3 lb, or roughly 1 to 1.5 lb per person. Carry more weight when it buys a pitch that suits your sites, a roomier first tent, or a tent for windier trips.",
      columns: ["Tent", "Published weight", "Shared by two, per person", "Why carry it"],
      rows: [
        ["Durston X-Mid 2", "About 2 lb", "About 1 lb", "Trekking-pole pitch, if you already carry two poles"],
        ["Big Agnes Tiger Wall UL2", "About 2 lb 6 oz", "About 1 lb 3 oz", "Semi-freestanding; the foot still needs a stake"],
        ["Big Agnes Copper Spur UL2", "About 2 lb 8 oz", "About 1 lb 4 oz", "Freestanding on platforms and dirt"],
        ["NEMO Dragonfly OSMO 2P", "A bit over 2.5 lb", "A bit over 1 lb 4 oz", "Wet climates where nylon sag ruins the pitch"],
        ["MSR Hubba Hubba 2", "Around 3 lb", "Around 1 lb 8 oz", "Windier three-season trips"],
        ["REI Co-op Half Dome 2 Plus", "Heavier than UL tents", "More than the tents above", "A roomy first tent on short weekends"],
      ],
      note: "Weights are the makers' published figures and change with the model year. A listing may quote a minimum trail weight or a packed weight with stakes and stuff sacks, so compare like with like. A solo hiker carries the whole tent.",
    },
    faqs: [
      { q: "How heavy should a backpacking tent be?", a: "For two people sharing, the lighter picks here weigh about 2 to 3 lb, roughly 1 to 1.5 lb each. Carry more when the weight buys a pitch that suits your sites, room for a first trip, or a tent for windier weather." },
      { q: "Is a freestanding tent worth the weight?", a: "Yes on platforms, slabs, or sites where stakes fail. No if every camp is soft soil and you already carry poles." },
      { q: "What tent for a first overnight?", a: "A livable two-person freestanding tent, even for one person. Practice the pitch at home." },
      { q: "Do I need a footprint?", a: "On abrasive rock and sand, yes. On thick duff, a thin groundsheet is optional insurance." },
      { q: "Can two people share a one-person tent?", a: "Only if both accept a tight floor. Most pairs should start with a two-person floor." },
    ],
    related: ["ultralight-tents", "budget-tents", "first-overnight", "copper-spur-vs-dragonfly"],
    method,
  },
  {
    slug: "ultralight-tents",
    title: "Best Ultralight Tents",
    description: "Ultralight tents and pole shelters: X-Mid 2, Lunar Solo, the semi-freestanding NEMO Hornet OSMO, and when a freestanding tent is still the lighter system.",
    h1: "Best ultralight tents",
    kicker: "Roundup · Shelters",
    category: "tents",
    answer:
      "An ultralight shelter is the lightest one that matches your sites, not the lightest one on the internet. The X-Mid 2 wins for pairs with poles and stakeable ground. The Lunar Solo is the budget solo. The NEMO Hornet OSMO 2P is the semi-freestanding pick at about 2 lb 2 oz, for pairs without trekking poles who accept a small floor. A freestanding tent can still be the lighter system if a pole tent forces you to carry poles you would not otherwise bring. Those tents are on the main backpacking tents page.",
    teaser: "The lightest shelter that still matches your sites: X-Mid 2 with poles, Lunar Solo for one, Hornet if you skip poles.",
    who: "Hikers already under a reasonable pack weight. Beginners should not start with a single-wall tent.",
    productSlugs: ["x-mid-2", "lunar-solo", "nemo-hornet-2"],
    one: "If you are new to ultralight, buy the X-Mid and learn the pitch at home. If you do not carry trekking poles, buy the Hornet and accept the smaller floor. Do not buy a DCF tent first.",
    faqs: [
      { q: "Is a tarp ultralight?", a: "Yes, and it is a skill purchase. Bugs and sideways rain are the failure modes. Not a first overnight." },
      { q: "Inner or fly first?", a: "Fly first in rain. Learn both at home." },
      { q: "What stakes?", a: "Use the stakes the shelter maker recommends for your soil. Bent shepherd hooks are why light pitches fail." },
      { q: "What does semi-freestanding mean?", a: "The poles hold most of the tent up, but the foot still needs stakes. On a platform or rock you will need a way to tie out the corners." },
    ],
    related: ["backpacking-tents", "ultralight-shelter", "sleeping-bags"],
    method,
  },
  {
    slug: "budget-tents",
    title: "Best Budget Backpacking Tents",
    description: "Budget backpacking tents in the Budget to Mid price bands: REI Half Dome 2 Plus, MSR Elixir 2, Six Moon Lunar Solo, and the REI Passage 2.",
    h1: "Best budget backpacking tents",
    kicker: "Roundup · Shelters",
    category: "tents",
    answer:
      "Every pick here sits in the Budget to Mid price bands. The lighter Upper mid tents are on the main backpacking tents page. The REI Co-op Half Dome 2 Plus is the roomy first freestanding tent for short weekends. The MSR Elixir 2 is the simple freestanding alternative at about 5 lb. The Six Moon Designs Lunar Solo is the light budget pick for one hiker who accepts single-wall condensation. The REI Co-op Passage 2 is the cheapest real tent here, for first nights close to the car. Cheap out on a sit pad, not on a storm shelter.",
    teaser: "Stay in the Budget to Mid band: Half Dome 2 Plus for a first weekend, Elixir for a simple pitch, Lunar Solo if you hike alone.",
    who: "New campers spending carefully, pairs who accept extra weight for a lower price, and solo hikers who do not need a flagship tent.",
    productSlugs: ["half-dome-2-plus", "msr-elixir-2", "lunar-solo", "rei-passage-2"],
    one: "Buy the Half Dome 2 Plus if you are new. Buy the Elixir 2 if you want a freestanding tent with a simple pitch. Buy the Lunar Solo only if you hike alone and will vent it.",
    faqs: [
      { q: "Are department-store tents fine?", a: "For a backyard or a fair-weather car camp, sometimes. For a windy backpacking night, buy a tent with a backpacking reputation." },
      { q: "Is heavier always cheaper?", a: "Often, and on a short weekend that is a good trade. On a long climb it is not." },
    ],
    related: ["backpacking-tents", "budget-under-50", "first-overnight"],
    method,
  },
  {
    slug: "sleeping-bags",
    title: "Best Sleeping Bags for Backpacking",
    description: "Best backpacking sleeping bags and one quilt: 15°F down, premium down, Western Mountaineering Alpinlite, and a synthetic backup.",
    h1: "Best sleeping bags for backpacking",
    kicker: "Roundup · Sleep",
    category: "sleep",
    answer:
      "Match the bag to the coldest night you will actually sleep, then add margin if you sleep cold. A 15°F or 20°F down mummy is the default three-season bag. The REI Magma 15 is the returnable default. The Western Mountaineering Alpinlite is the premium warmer-weather down pick. A quilt wins only if you sleep warm and will strap it to the pad. Roomier cold-sleeper bags are on the cold sleepers page. The bag is not the pad.",
    teaser: "Match the bag to the coldest night you will sleep, then start with a returnable 15°F down mummy such as the Magma 15.",
    who: "Backpackers building a three-season sleep system. Not a winter expedition bag guide.",
    productSlugs: ["magma-15", "wm-ultralite", "ee-revelation", "alpinlite", "trestles-eco-30", "sts-spark"],
    one: "Buy a 15°F or 20°F down mummy you can return, unless you already know you will manage a quilt.",
    faqs: [
      { q: "Are ratings comfort or limit?", a: "Treat published ratings as limits unless the brand states EN or ISO comfort. Cold sleepers should buy warmer than the forecast." },
      { q: "Down or synthetic?", a: "Down for dry trips and pack size. Synthetic if the bag may get wet." },
      { q: "Bag or quilt?", a: "Bag if you are new or sleep cold. Quilt if you sleep warm and will attach it to the pad." },
    ],
    related: ["sleeping-pads", "quilt-vs-bag", "cold-sleepers"],
    method,
  },
  {
    slug: "sleeping-pads",
    title: "Best Sleeping Pads",
    description: "Best backpacking sleeping pads by R-value and width: XLite, Tensor, Exped, foam, and the XLite NXT Wide for side sleepers.",
    h1: "Best sleeping pads",
    kicker: "Roundup · Pads",
    category: "pads",
    answer:
      "Choose R-value first, width second, weight third. A three-season pad for most people sits around R 3 to 4. The NeoAir XLite NXT is the default insulated air pad. Side sleepers should buy the wide, and the XLite NXT Wide is the width pick here. Foam alone is a summer pad. High R-value pads for cold sleepers are on the cold sleepers page.",
    teaser: "Pick R-value before weight. The XLite NXT is the default three-season air pad, and side sleepers should buy the wide.",
    who: "Anyone buying a first backpacking pad or replacing a thick pad that was still cold.",
    productSlugs: ["xlite-nxt", "nemo-tensor", "exped-ultra", "ether-light", "z-lite", "xlite-wide"],
    one: "Buy an insulated air pad around R 3.5 or higher, in the wide if you side-sleep. Carry a patch kit.",
    faqs: [
      { q: "What R-value for summer?", a: "Around 2 to 3 if you sleep warm. Cold sleepers should still start near 3.5." },
      { q: "Does a higher R-value sleep hotter in July?", a: "You can vent the bag. You cannot add ground insulation you did not bring." },
      { q: "Mummy or rectangular?", a: "Mummy saves weight. Rectangular saves arguments with your elbows." },
    ],
    related: ["sleeping-bags", "choose-a-pad", "cold-sleepers", "xlite-vs-xtherm"],
    method,
  },
  {
    slug: "hiking-boots-wide-feet",
    title: "Best Hiking Boots for Wide Feet",
    description: "Best hiking boots for wide feet: KEEN Targhee, Merrell Moab 3 Wide, Lowa Renegade wide, and why sizing up fails.",
    h1: "Best hiking boots for wide feet",
    kicker: "Roundup · Footwear",
    category: "footwear",
    answer:
      "Wide feet need a wider last or a labeled wide, not a longer boot. Sizing up lets the heel slip. Start with a KEEN Targhee if you want a traditional wide toe box and a waterproof mid. Start with a Merrell Moab 3 Mid Wide if you want an easy first labeled wide. If your ankles are fine and only your toes hurt, a wide toe box trail shoe may suit you better than any boot. Fit the wider foot.",
    teaser: "Wide feet need a wider last, not a longer boot. Try the KEEN Targhee first if you can get a pair on your feet today.",
    who: "Hikers who blow out standard D-width boots or get numb toes in a tapered box, and who want a boot's ankle and heel support. Not a trail-shoe list and not a mountaineering-boot guide.",
    productSlugs: ["targhee-iv", "renegade-wide", "moab-3-wide", "x-ultra-wide", "oboz-bridger"],
    one: "Try the KEEN Targhee in a wide if you can try one pair on today. Try the Moab 3 Mid Wide if the Targhee feels too bulky.",
    faqs: [
      { q: "Should I size up?", a: "No. Size length to the longer foot and width to the wider foot." },
      { q: "Boot or shoe?", a: "Boot if you roll ankles or carry a heavy pack. If the trail is moderate and your ankles are fine, a wide toe box trail shoe is often the better buy, and those are on the wide trail shoe page." },
      { q: "Is a wide toe box the same as 2E?", a: "No. A foot-shaped last can be wide at the toes and still narrow at the heel." },
    ],
    related: ["trail-shoes", "boot-fit", "rain-jackets-under-150"],
    method,
  },
  {
    slug: "trail-runners",
    title: "Best Trail Runners for Hiking",
    description: "Trail runners and light hiking shoes for maintained trail: Hoka Speedgoat for cushion, La Sportiva Ultra Raptor for rock, and the Danner Trail 2650.",
    h1: "Best trail runners for hiking",
    kicker: "Roundup · Footwear",
    category: "footwear",
    answer:
      "A trail runner is the right hiking shoe on moderate trail if your ankles are stable. The Hoka Speedgoat is the max-cushion pick for long days. The La Sportiva Ultra Raptor is the pick for rocky trail and a heel that holds. The Danner Trail 2650 is the low hiking shoe for day hikes and travel days. Switch back to a boot when you roll ankles, carry a heavy pack, or walk off-trail on loose rock.",
    teaser: "Stable ankles can hike in a trail shoe. Speedgoat for cushion, Ultra Raptor for rock, Trail 2650 for day hikes.",
    who: "Day hikers and light overnight hikers on maintained trail.",
    productSlugs: ["speedgoat", "ultra-raptor", "trail-2650"],
    one: "Buy the Speedgoat if your knees want cushion. Buy the Ultra Raptor if the trail is rocky and your feet are medium to narrow. Keep a boot if you are unsure about your ankles.",
    faqs: [
      { q: "Are trail runners waterproof?", a: "Most are not, and that is often better. A soaked membrane shoe dries slowly. Use gaiters and wool socks in puddles." },
      { q: "Are trail runners enough for backpacking?", a: "For many people, yes, under a moderate pack on maintained trail." },
    ],
    related: ["hiking-boots-wide-feet", "daypacks", "speedgoat-vs-lone-peak"],
    method,
  },
  {
    slug: "backpacking-packs",
    title: "Best Backpacking Packs",
    description: "Best backpacking packs for multi-day loads: Osprey Atmos AG 65, Gregory Baltoro 65, Deuter Aircontact Core, and the lighter Granite Gear Crown.",
    h1: "Best backpacking packs",
    kicker: "Roundup · Packs",
    category: "packs",
    answer:
      "Fit the torso before you compare pockets. For hot miles and a normal load, the Osprey Atmos AG 65 is the ventilation example. For a pack you live out of, the Gregory Baltoro 65 is the organization example. The Deuter Aircontact Core 60+10 is the load-hauling example. The Granite Gear Crown3 60 is the lighter framed pick when you do not need a trampoline back panel. Ultralight cottage packs are on the ultralight packs page. Daypacks are on the daypacks page.",
    teaser: "Fit the torso before the pockets. Atmos AG 65 for hot miles, Baltoro to live out of, Aircontact when the load is heavy.",
    who: "Hikers choosing a multi-day framed pack. Women's fits are different model names. Not an ultralight cottage-pack list and not a daypack list.",
    productSlugs: ["atmos-ag-65", "baltoro-65", "aircontact", "crown-60"],
    one: "Try two packs loaded with about 25 pounds. Buy the one whose torso length is right. Ignore features if the hip belt misses your iliac crest.",
    faqs: [
      { q: "What size for a first overnight?", a: "Often 40 to 50 liters if the sleep system is compact. 65 if the kit is bulky." },
      { q: "Atmos or Baltoro in summer heat?", a: "A suspended-mesh pack is the usual hot-weather answer, if the fit is right." },
      { q: "Are these current models?", a: "Illustrative examples. Confirm the year's harness before you order." },
    ],
    related: ["osprey-vs-gregory", "first-overnight", "daypacks"],
    method,
  },
  {
    slug: "daypacks",
    title: "Best Hiking Daypacks",
    description: "Best hiking daypacks with a real hip belt: the Osprey Talon 22, and the REI Trail 40 when a long day needs more volume.",
    h1: "Best hiking daypacks",
    kicker: "Roundup · Packs",
    category: "packs",
    answer:
      "A day hike needs water, a shell, a layer, and food. The Osprey Talon 22 is the daypack with a hip belt that takes the water weight off your shoulders. The REI Co-op Trail 40 is the bigger option when a long day needs more water and layers; treat it as a long-day pack, not a multi-day haul. A rain shell for the first night out stays on the first overnight page. All-day rain shells are on the rain jackets page.",
    teaser: "Water, a shell, and food belong in a daypack with a hip belt. The Talon 22 is that pack. The Trail 40 is for a longer day.",
    who: "Day hikers replacing a school backpack or a commuter bag. Not a multi-day pack list.",
    productSlugs: ["talon-22", "rei-trail-40"],
    one: "Buy a 20- to 28-liter pack with a hip belt. Put the rain shell in it even when the morning looks clear.",
    faqs: [
      { q: "Hydration bladder or bottles?", a: "Bottles are easier to fill in a stream and harder to forget. A bladder is easier to sip. Either is fine if you actually drink." },
      { q: "How much water?", a: "More than you think on a hot exposed trail. Know the next source." },
    ],
    related: ["backpacking-packs", "rain-jackets-under-150"],
    method,
  },
  {
    slug: "rain-jackets-under-150",
    title: "Best Rain Jackets Under $150",
    description: "Best rain jackets under $150 for hiking: Helium, Rainier, PreCip, StormLine, and when to spend more.",
    h1: "Best rain jackets under $150",
    kicker: "Roundup · Rain",
    category: "shells",
    answer:
      "Under $150, buy a shell that keeps a day of rain out and accept that it wets out sooner than a $300 jacket. Outdoor Research Helium is the packable pick. REI Rainier is the try-on pick. A rain jacket is not insulation. The Torrentshell usually sits above this cap and is listed so you know when to leave the cap.",
    teaser: "Helium stays the packable default under this cap. Rainier is the shell you can try on. A rain jacket is not a warm layer.",
    note:
      "amazon.com has no verified listing for the standard Outdoor Research Helium right now. Helium stays the packable default on this page. The Helium product page names a Closest listing (Marmot PreCip Eco); that Closest is not the pick.",
    who: "Hikers who need a real rain layer without an alpine shell budget.",
    productSlugs: ["helium", "rainier", "precip", "stormline", "torrentshell"],
    one: "Buy the Helium if pack size matters. Buy the Rainier if you can try it on and want pit zips. Re-proof either when rain stops beading.",
    faqs: [
      { q: "Is under $150 actually waterproof?", a: "Seam-taped budget shells are waterproof until the DWR wets out or tape fails. They are less breathable than expensive shells." },
      { q: "Do I need pit zips?", a: "Yes if you hike uphill in rain. No if the jacket only covers camp chores." },
      { q: "What size?", a: "Large enough for a fleece underneath. Not so large the hem scoops rain." },
    ],
    related: ["layering", "hiking-boots-wide-feet"],
    method,
  },
  {
    slug: "camping-stoves",
    title: "Best Camping Stoves by Trip Type",
    description: "Camping stoves by trip: a Coleman two-burner for car camping, the WhisperLite for cold, MiniMo and Reactor boil systems, and the WindMaster for backpacking.",
    h1: "Best camping stoves",
    kicker: "Roundup · Kitchen",
    category: "stoves",
    answer:
      "Pick the stove by the trip. At a drive-up site, a two-burner such as the Coleman is the right tool, and ounces do not matter. For three-season backpacking, a canister stove such as the Soto WindMaster is the default. For cold trips or uncertain canister supply, the MSR WhisperLite runs on liquid fuel. If dinner is only boiling water, use an integrated system: the Jetboil MiniMo for coffee and freezer-bag meals, or the MSR Reactor for wind and cold. Never run a stove in a tent.",
    teaser: "Match the stove to the trip: a two-burner at the car, WindMaster for three-season miles, WhisperLite in the cold.",
    who: "Campers deciding which kind of stove fits the trip: car camping, cold weather, or boil-only meals.",
    productSlugs: ["coleman-2burner", "windmaster", "whisperlite", "minimo", "msr-reactor"],
    one: "Buy a two-burner if you only car camp. Buy the WindMaster and a simple pot if you backpack in three seasons. Buy the WhisperLite only if you camp in the cold or travel where canisters are hard to find.",
    faqs: [
      { q: "Canister or liquid?", a: "Canister for three-season convenience. Liquid fuel for cold and uncertain supply." },
      { q: "Can I use a backpacking stove for car camping?", a: "For one or two people boiling water, yes. For group breakfasts, a two-burner is the better tool." },
      { q: "Is an integrated system worth the weight?", a: "If you only boil water, often yes. If you cook real meals, a separate stove and pot is more flexible." },
    ],
    related: ["car-camping-kitchen", "canister-vs-liquid", "stove-safety"],
    method,
  },
  {
    slug: "headlamps",
    title: "Best Headlamps",
    description: "Best hiking headlamps: Petzl Actik Core, Black Diamond Spot, Nitecore NU25, and why lumens are not runtime.",
    h1: "Best headlamps",
    kicker: "Roundup · Lighting",
    category: "lighting",
    answer:
      "Buy a headlamp with a stable low mode and a lock. High lumens are for finding the trail, not for cooking. The Petzl Actik Core and Black Diamond Spot are the default rechargeable picks. The Nitecore NU25 is the weight pick. The Princeton Tec Remix runs on AA cells, for people who forget to charge things. Carry a second light on any overnight.",
    teaser: "Cook on a low mode, and lock the lamp in the pack. Actik Core and Spot are the defaults. Carry a second light.",
    who: "Campers and hikers who walk after dusk or cook in the dark. Not a caving lamp guide.",
    productSlugs: ["actik-core", "spot-400", "nu25", "biolite-330", "bindi", "princeton-remix"],
    one: "Buy the Actik Core or the Spot, learn the lock, and put a second small light in a hip-belt pocket.",
    faqs: [
      { q: "How many lumens?", a: "About 30 lumens cooks dinner. A couple hundred finds the trail. A 1000-lumen claim is mostly marketing here." },
      { q: "Rechargeable or replaceable batteries?", a: "Rechargeable if you have a car or a power bank. Replaceable cells if you forget to charge." },
      { q: "Is red light necessary?", a: "Useful so you do not blind camp. Not required for safety." },
    ],
    related: ["first-overnight", "budget-under-50"],
    method,
  },
  {
    slug: "water-filters",
    title: "Best Backpacking Water Filters",
    description: "Best backpacking water filters: Sawyer Squeeze, Katadyn BeFree, Platypus QuickDraw, and what they do not remove.",
    h1: "Best water filters",
    kicker: "Roundup · Water",
    category: "water",
    answer:
      "For most North American backcountry, a hollow-fiber filter is the everyday tool. The Sawyer Squeeze is the default. It does not remove viruses, it clogs in silt, and it can be ruined by freezing. Add chemicals where viruses matter. Carry a backup method on any trip where being thirsty is not an option.",
    teaser: "Most trips start with the Sawyer Squeeze. It misses viruses, clogs in silt, and can be ruined by freezing. Carry a backup.",
    who: "Backpackers and day hikers treating lake and stream water. Travel purifiers are a separate decision.",
    productSlugs: ["sawyer-squeeze", "befree", "quickdraw", "trailshot", "grayl"],
    one: "Buy the Squeeze, a dirty bag, and a small bottle of tablets as backup. Learn to backflush before the trip.",
    faqs: [
      { q: "Filter or purify?", a: "Filters in this class handle bacteria and protozoa. Viruses need chemicals, UV, or a purifier rated for them." },
      { q: "Can I drink from the filter if it froze?", a: "Do not trust a hollow-fiber filter after it has frozen solid. Fibers crack." },
      { q: "How do I deal with silt?", a: "Let water settle, or prefilter through a bandana. Backflush often." },
    ],
    related: ["water-treatment", "first-overnight"],
    method,
  },
  {
    slug: "down-jackets",
    title: "Best Down and Synthetic Jackets for Camp",
    description: "Camp puffies versus active insulation: REI Magma, Ghost Whisperer, Nano Puff, and a sun hoodie.",
    h1: "Best insulation for the trail",
    kicker: "Roundup · Layers",
    category: "layers",
    answer:
      "The jacket you hike in is not the jacket you sit in. A sun hoodie covers noon. An active synthetic covers cool climbing. A hooded down puffy covers camp. The REI Magma hoody is the returnable camp layer. Do not hike uphill in it.",
    teaser: "Hike in a sun hoodie. Sit in a hooded puffy. The Magma hoody is the returnable camp layer. Do not climb in it.",
    who: "Three-season hikers building a layering system, not a ski-town parka shopper.",
    productSlugs: ["magma-hoody", "ghost-whisperer", "nano-puff", "ascendant", "sun-hoodie"],
    one: "Buy a hooded down or synthetic puffy for camp and a sun hoodie for the day. Add active insulation only if you run cold while moving.",
    faqs: [
      { q: "Down or synthetic insulation?", a: "Down packs smaller and fails when wet. Synthetic is bulkier and less fussy in rain." },
      { q: "Is a fleece enough?", a: "Often while moving. Rarely at a windy camp after you stop producing heat." },
    ],
    related: ["layering", "rain-jackets-under-150"],
    method,
  },
  {
    slug: "trekking-poles",
    title: "Best Trekking Poles",
    description: "Best trekking poles for descents and tent pitches: Black Diamond, LEKI, budget carbon, and ultralight folding poles.",
    h1: "Best trekking poles",
    kicker: "Roundup · Poles",
    category: "poles",
    answer:
      "Poles are optional until your knees, your pack, or your tent say otherwise. A straight aluminum pole such as the LEKI Makalu is the safer tent-pitch pick. The Cascade Mountain Tech aluminum pole does the same job on a small budget, with more weight and locks worth checking in the store. An ergo cork pole is kinder on long descents. Budget carbon is for learning. Do not crush folding carbon under a car trunk.",
    teaser: "A tent that needs poles wants straight aluminum, such as the LEKI Makalu. Ergo cork is for knees on the way down.",
    who: "Hikers deciding whether poles are worth it, and pole-tent owners who need a reliable pair.",
    productSlugs: ["leki-makalu", "bd-trail-ergo", "cmt-carbon", "bd-distance-carbon", "cmt-aluminum"],
    one: "If your tent needs poles, buy a straight aluminum pair. If you only want help on descents, try an ergo grip.",
    faqs: [
      { q: "One pole or two?", a: "Two, if you want the stability and if the tent needs two. One pole is a partial tool." },
      { q: "Carbon or aluminum?", a: "Aluminum bends and keeps working more often. Carbon is lighter and snaps when it fails." },
    ],
    related: ["ultralight-tents", "backpacking-tents"],
    method,
  },
  {
    slug: "car-camping-gear",
    title: "Best Car Camping Gear",
    description: "Car camping gear that changes the weekend: a two-burner, a real cooler, a skillet, wash bins, and a chair.",
    h1: "Best car camping gear",
    kicker: "Roundup · Car camp",
    category: "camp",
    answer:
      "A car camping weekend fails on dishes, bad ice, and one burner. Buy a two-burner, three wash bins, and a cooler you pre-chill. A chair is optional comfort. A cast-iron skillet stays in the car. Do not pack this list into a backpack.",
    teaser: "The car carries the weight. Buy a two-burner, three wash bins, and a cooler you pre-chill before you buy a chair.",
    who: "Families and friends camping within walking distance of the car.",
    productSlugs: ["coleman-2burner", "wash-bins", "rotomold-cooler", "lodge-skillet", "helinox-chair", "rumpl"],
    one: "Buy the two-burner and the wash bins before any gadget.",
    faqs: [
      { q: "Propane or white gas for car camping?", a: "Propane. White gas is a backcountry and cold-weather tool." },
      { q: "Do I need a kitchen box?", a: "After three trips, build one from a bin you own. Not before." },
    ],
    related: ["car-camping-kitchen", "camping-stoves", "budget-under-50"],
    method,
  },
  {
    slug: "budget-under-50",
    title: "Best Budget Camping Gear Under $50",
    description: "Camping gear worth buying under $50: a backup stove, dry bag, tape, wash bins. Not a tent or a winter bag.",
    h1: "Best budget camping gear under $50",
    kicker: "Roundup · Budget",
    category: "camp",
    answer:
      "Spend under $50 on simple things: a backup stove, a dry bag, repair tape, wash bins. Do not spend under $50 expecting a backpacking tent or a winter bag. The BRS stove is a fair spare and a bad only stove in wind. The repair tape is the item that saves an air pad.",
    teaser: "Spend small money on tape, a dry bag, and a spare stove. A backpacking tent or a winter bag is the wrong place to save.",
    who: "Car campers filling gaps and backpackers who need a cheap spare.",
    productSlugs: ["brs-3000", "dry-bag", "tenacious-tape", "wash-bins", "z-lite", "sawyer-squeeze"],
    one: "Buy the dry bag, the tape, and a second light. Skip the $40 tent.",
    faqs: [
      { q: "What should I never cheap out on?", a: "Shelter in bad weather, a sleep system for the real temperature, and footwear." },
      { q: "Is a $50 sleeping bag enough?", a: "For a warm summer car camp, maybe. For backpacking near freezing, no." },
    ],
    related: ["canister-stoves-picks", "budget-tents", "car-camping-kitchen"],
    method,
  },
  {
    slug: "cold-sleepers",
    title: "Best Gear for Cold Sleepers",
    description: "A sleep system for people who sleep cold: a lower bag rating, a high R-value pad, and a hooded camp layer.",
    h1: "Best gear for cold sleepers",
    kicker: "Roundup · Sleep",
    category: "sleep",
    answer:
      "If you sleep cold at home, you will sleep cold outside. Buy a warmer bag than the forecast suggests, a pad with real R-value, and a hood. The Magma 15 or Disco 15 plus an XTherm-class pad is the honest setup. A three-season XLite is not enough on its own for a cold sleeper. A quilt is usually the wrong experiment.",
    teaser: "Cold sleepers need a lower bag rating and a high-R pad such as an XTherm. A quilt is usually the wrong experiment.",
    who: "People who steal blankets, sleep in socks, or wake up cold in a 40°F house.",
    productSlugs: ["magma-15", "nemo-disco-15", "xtherm", "magma-hoody"],
    one: "Spend the money on the pad and a lower temperature rating before you spend it on a lighter shell.",
    faqs: [
      { q: "Will a liner fix a cold bag?", a: "It adds a little. It does not turn a summer bag into a frost bag." },
      { q: "Should I wear clothes in the bag?", a: "Dry layers, yes. Damp hiking clothes, no." },
    ],
    related: ["sleeping-bags", "sleeping-pads", "choose-a-pad", "xlite-vs-xtherm"],
    method,
  },
  {
    slug: "first-overnight-gear",
    title: "Best Gear for a First Overnight",
    description: "The short list for a first overnight hike: a freestanding tent, a 20°F bag, a three-season pad, a stove you practiced, a shell, a lamp, and a 40-liter pack.",
    h1: "Best gear for a first overnight",
    kicker: "Roundup · Planning",
    category: "packs",
    answer:
      "A first overnight needs a shelter you can pitch, a sleep system rated for the real low, a way to boil water, a rain layer, and a headlamp with a lock. It does not need a 65-liter pack full of extras. Use a two-person freestanding tent even if you hike alone. The REI Co-op Half Dome 2 Plus is the beginner freestanding tent. The Kelty Cosmic 20 is a simple 20°F down bag for fair weather. The NEMO Tensor is a quiet three-season pad. Leave the camp chair. If you sleep cold at home, use the cold sleepers page instead of this kit's sleep picks.",
    teaser: "Use a two-person freestanding tent even if you hike alone. Practice the pitch, and leave the camp chair in the car.",
    who: "Someone whose longest hike so far is a day hike, planning one fair-weather night a few miles from the car.",
    productSlugs: ["half-dome-2-plus", "kelty-cosmic-20", "nemo-tensor", "windmaster", "actik-core", "rei-trail-40", "helium"],
    one: "Practice the tent pitch and one stove meal at home. If those two work, the night will work.",
    faqs: [
      { q: "How far should it be?", a: "A few miles, with daylight to spare. Distance is not the achievement." },
      { q: "Can I use a hammock?", a: "Only with an underquilt you have slept in. A first night is a bad insulation experiment." },
    ],
    related: ["first-overnight", "backpacking-tents", "cold-sleepers"],
    method,
  },
];

export const guides: Guide[] = [
  {
    slug: "first-overnight",
    title: "First Overnight Hike Packing List",
    description: "A first overnight hike packing list: shelter, sleep, kitchen, rain, light, and what to leave in the car.",
    h1: "First overnight hike packing list",
    kicker: "Guide · Planning",
    answer:
      "Pack a shelter you have pitched, a sleep system for the real low, a stove you have lit, a rain layer, and a headlamp. Keep the walk short. Tell someone the plan. Leave the chair and the extra shoes.",
    sections: [
      {
        id: "distance",
        heading: "Pick a short, fair-weather night",
        paragraphs: [
          "The achievement is sleeping outside and walking back, not a big mile count. Choose a site a few miles in, with water you understand and a forecast that is not a lesson. Turn around if the afternoon slips.",
          "Check permits, fire rules, and food-storage rules before you pack the fun gear. A bear box or a canister is not optional where it is required.",
        ],
      },
      {
        id: "shelter",
        heading: "Shelter you can pitch tired",
        paragraphs: [
          "Use a freestanding two-person tent even if you are alone. You want a place for a wet pack and a pitch you have done once in daylight. Stake it anyway, freestanding or not, so a gust does not relocate you.",
        ],
        bullets: ["Pitch it in the yard first", "Footprint on rock", "Do not debut a tarp"],
      },
      {
        id: "sleep",
        heading: "Sleep is a system",
        paragraphs: [
          "The bag and the pad fail together. A warm bag on a thin pad is still cold from the ground. If you do not know whether you sleep cold, borrow a warmer bag. Cotton stays in the car.",
        ],
      },
      {
        id: "kitchen",
        heading: "One meal you have already cooked",
        paragraphs: [
          "One stove, one pot, one spoon, a lighter, and food you have eaten. Boil water at home so the igniter is not a mystery. Treat water with a filter you have backflushed, plus tablets if the filter is new to you.",
        ],
      },
      {
        id: "ten",
        heading: "The unglamorous kit",
        paragraphs: [
          "Map or an offline map, a shell, a warm layer, blister care, repair tape, a whistle, and a second light. The phone is not a map unless the map is downloaded. Tell someone when you will be out.",
        ],
      },
    ],
    productSlugs: ["half-dome-2-plus", "magma-15", "xlite-nxt", "windmaster", "actik-core", "sawyer-squeeze", "helium"],
    faqs: [
      { q: "What pack size?", a: "40 to 50 liters if you are disciplined. More only if the sleep system is bulky." },
      { q: "What food?", a: "A no-cook lunch, a hot dinner you have eaten, and a breakfast that is not a project." },
    ],
    related: ["first-overnight-gear", "backpacking-tents", "headlamps"],
  },
  {
    slug: "choose-a-pad",
    title: "How to Choose a Sleeping Pad",
    description: "How to choose a sleeping pad using R-value, width, and pad type. Thickness is not warmth.",
    h1: "How to choose a sleeping pad",
    kicker: "Guide · Sleep",
    answer:
      "Read R-value, then width, then weight. Thickness is comfort. A three-season backpacking pad for most sleepers is about R 3 to 4. Cold sleepers should go higher. Air pads need a repair kit. Foam cannot puncture and will not keep a cold sleeper warm alone.",
    sections: [
      {
        id: "r",
        heading: "R-value is the ground",
        paragraphs: [
          "R-value is resistance to heat flowing out of you and into the dirt. Two pads of the same thickness can have very different R-values. A summer pad used on frosty ground is how people decide they 'sleep cold' when the pad was the problem.",
          "Stacking foam under an air pad adds R-value and saves the night if the air pad fails. It is not a second mattress.",
        ],
      },
      {
        id: "width",
        heading: "Width is why side sleepers wake up",
        paragraphs: [
          "A regular mummy pad is a compromise with your elbows. If you sleep on your side, buy the wide and accept the grams. A restless night costs more miles than the pad weighs.",
        ],
      },
      {
        id: "type",
        heading: "Air, foam, or both",
        paragraphs: [
          "Insulated air is the backpacking default. Uninsulated air is a summer toy. Closed-cell foam is the lunch seat and the backup. Self-inflating pads are comfortable and slower to pack; fine at a car camp, less ideal when you are counting volume.",
        ],
      },
    ],
    productSlugs: ["xlite-nxt", "nemo-tensor", "z-lite", "xtherm", "exped-ultra"],
    faqs: [
      { q: "What R-value for winter?", a: "Often 5 or more, sometimes foam plus air. This guide is not a full winter system." },
      { q: "Do I need a pump?", a: "A small pump sack keeps moisture out of the pad. Inflating with your lungs works and adds condensation inside the tubes." },
    ],
    related: ["sleeping-pads", "sleeping-bags", "cold-sleepers"],
  },
  {
    slug: "quilt-vs-bag",
    title: "Quilt or Sleeping Bag",
    description: "When a backpacking quilt beats a mummy bag, and when it is just a draft.",
    h1: "Quilt or sleeping bag?",
    kicker: "Guide · Sleep",
    answer:
      "Buy a bag if you are new, sleep cold, or want a hood. Buy a quilt if you sleep warm, hate mummy coffins, and will use the pad straps. A quilt does not insulate the ground. The pad still has to.",
    sections: [
      {
        id: "drafts",
        heading: "Drafts are the whole risk",
        paragraphs: [
          "A quilt is open at the back. On a still, warm night that is a feature. On a windy, cold night it is a gap. Straps or a sheet that clips to the pad close the gap. If you will not use them, you bought a blanket.",
        ],
      },
      {
        id: "hood",
        heading: "The hood is not optional for some people",
        paragraphs: [
          "A bag hood stops heat loss from your head and blocks a breeze. Quilts do not have one. A separate hood or a warm hat is the patch, and it is worse than a hood that is part of the system if you move a lot.",
        ],
      },
      {
        id: "money",
        heading: "Do not buy a quilt to save money",
        paragraphs: [
          "A good quilt costs as much as a good bag. The savings, if any, are in weight and in how you sleep on mild nights. The Magma-class mummy is the simpler purchase. The Revelation-class quilt is the specialist purchase.",
        ],
      },
    ],
    productSlugs: ["ee-revelation", "magma-15", "nemo-disco-15", "xlite-nxt"],
    faqs: [
      { q: "Can I use a quilt in winter?", a: "Some people do, with a high R-value pad and a lot of skill. It is not the recommendation here." },
      { q: "What about a zippered quilt?", a: "It narrows the gap between the two styles. You still have to close it." },
    ],
    related: ["sleeping-bags", "choose-a-pad"],
  },
  {
    slug: "ultralight-shelter",
    title: "Ultralight Shelter Guide",
    description: "How to choose an ultralight backpacking shelter: pole tents, freestanding tents, and tarps.",
    h1: "Ultralight backpacking shelter guide",
    kicker: "Guide · Shelters",
    answer:
      "Cut shelter weight only after the shelter still matches your sites. Trekking-pole tents win when you carry poles and can stake. A light freestanding tent wins on platforms. A tarp wins for skilled campers in mild, dry weather and loses for everyone else on night one.",
    sections: [
      {
        id: "sites",
        heading: "Start with the site, not the gram",
        paragraphs: [
          "Wooden platforms, established pads, and slick rock punish stake-out tents. Forest duff and alpine soil reward them. If your trips mix both, a freestanding tent is the one tent. If your trips are all soil and you already carry poles, take the pole tent.",
        ],
      },
      {
        id: "walls",
        heading: "Double wall is the beginner ultralight",
        paragraphs: [
          "Double-wall tents cost a little weight and save a lot of condensation dripping on the bag. Single wall is fine when you know how to vent and site the tent. It is a poor surprise.",
        ],
      },
      {
        id: "dcf",
        heading: "DCF is a weight buy",
        paragraphs: [
          "Dyneema composite fabric is light and expensive. Buy it after you know you will use the weight savings, not as a first tent. A silpoly or silnylon pole tent is the value ultralight.",
        ],
      },
    ],
    productSlugs: ["x-mid-2", "lunar-solo", "copper-spur-ul2", "leki-makalu"],
    faqs: [
      { q: "Does lighter always mean less comfortable?", a: "Not in floor area. Many pole tents are roomier than freestanding tents at the same weight. They are less forgiving to pitch." },
      { q: "Should I cut the inner tent?", a: "Only in bug-free, mild weather, and only if you have slept that way before." },
    ],
    related: ["ultralight-tents", "backpacking-tents", "trekking-poles"],
  },
  {
    slug: "car-camping-kitchen",
    title: "Car Camping Kitchen Setup",
    description: "A practical car camping kitchen: two burners, a standing table, wash bins, and a cooler that holds ice.",
    h1: "Car camping kitchen setup",
    kicker: "Guide · Kitchen",
    answer:
      "Set up two burners, a table at standing height, three wash bins, and a cooler you drained and pre-chilled. Do not use the backpacking stove as the family cooker. Do not buy a full chuck box before you have cooked two weekends.",
    sections: [
      {
        id: "heat",
        heading: "Heat for more than one pot",
        paragraphs: [
          "One burner means someone waits. Two burners means breakfast happens. Propane is the car-camping fuel. Keep a spare cylinder. Wind still matters, so a bit of a wind block that does not melt the regulator is worth thinking about.",
        ],
      },
      {
        id: "wash",
        heading: "Wash, rinse, sanitize",
        paragraphs: [
          "Three bins. Scrape food into a bag first, not into the wash water and not into the bushes. A bleach or tablet sanitizing rinse matters more on night three than on night one. Strain scraps so the site does not smell.",
        ],
      },
      {
        id: "cold",
        heading: "Ice is a packing problem",
        paragraphs: [
          "Block ice lasts longer than cubes. Food should be cold before it goes in. Drinks can have their own cooler so you are not opening the food cooler all day. A cheap cooler is fine for one day and dishonest for three.",
        ],
      },
    ],
    productSlugs: ["coleman-2burner", "wash-bins", "rotomold-cooler", "lodge-skillet", "actik-core"],
    faqs: [
      { q: "Can I cook in the tent?", a: "No. Carbon monoxide and fire are not ventilation problems you solve with a cracked door." },
      { q: "Is a backpacking stove enough for a family?", a: "No. It is a backup for coffee." },
    ],
    related: ["car-camping-gear", "camping-stoves"],
  },
  {
    slug: "layering",
    title: "How to Layer for Hiking Rain",
    description: "A hiking layering system for rain: sun hoodie, fleece or active insulation, shell, and a camp puffy.",
    h1: "How to layer for rain",
    kicker: "Guide · Layers",
    answer:
      "Wear a sun hoodie or a light base, add a fleece or active insulation if you are cold while moving, and put a hard shell over it when it rains. When you stop, add a puffy under or instead of the wet midlayer. Cotton does not belong in this stack.",
    sections: [
      {
        id: "moving",
        heading: "While you are moving",
        paragraphs: [
          "Uphill, you produce heat. A shell with no pit zips becomes a sauna, and the sweat wets you from the inside. Open the zips, slow down, or take the shell off during the climb if the rain is light. Start slightly cool.",
        ],
      },
      {
        id: "stopped",
        heading: "When you stop",
        paragraphs: [
          "The moment you stop, the heat leaves. That is when the puffy goes on, ideally before you are shivering. A wet fleece under a shell is fine for a short stop. A wet down jacket is a mistake. Keep the puffy in a dry bag.",
        ],
      },
      {
        id: "dwr",
        heading: "Beading is maintenance",
        paragraphs: [
          "When water soaks the face fabric in dark patches, the durable water repellent is tired. The membrane may still be waterproof, but the jacket feels soaked and clammy. Wash and re-proof it. Do not wait for a seam to leak before you decide the jacket is dead.",
        ],
      },
    ],
    productSlugs: ["sun-hoodie", "ascendant", "helium", "rainier", "magma-hoody", "nano-puff"],
    faqs: [
      { q: "Soft shell or hard shell?", a: "Hard shell for rain. Soft shell for wind and light drizzle." },
      { q: "Do I need rain pants?", a: "On an all-day rain or in brush, yes. On a short shower, a shell and gaiters may be enough." },
    ],
    related: ["rain-jackets-under-150", "down-jackets"],
  },
  {
    slug: "boot-fit",
    title: "How to Fit Hiking Boots",
    description: "How to fit hiking boots and shoes for wide feet, heel slip, and break-in, without sizing up.",
    h1: "How to fit hiking boots",
    kicker: "Guide · Footwear",
    answer:
      "Fit boots at the end of the day. Length follows the longer foot. Width follows the wider foot. You want a thumb's width of space in front of the longer toes and no heel slip when you walk a ramp. Do not size up to buy width.",
    sections: [
      {
        id: "measure",
        heading: "Measure both feet",
        paragraphs: [
          "Feet are not a pair. Trace them or use a shop Brannock and then ignore the number if the boot's last disagrees. Socks should be the hiking socks you will wear, not dress socks.",
        ],
      },
      {
        id: "walk",
        heading: "Walk a ramp, not a carpet",
        paragraphs: [
          "Heel slip shows up on a downslope. Toe bang shows up on a downslope. A carpet in a shop hides both. If the store has a ramp, use it. If your toes touch the front on the way down, the boot is short or your heel is not locked.",
        ],
      },
      {
        id: "break",
        heading: "Break in before the big day",
        paragraphs: [
          "Leather needs several short walks. Zero drop needs two or three easy weeks. A waterproof membrane that is tight across the top of the foot will still be tight on mile ten. Blisters are a fit problem first and a sock problem second.",
        ],
      },
    ],
    productSlugs: ["targhee-iv", "lone-peak", "renegade-wide", "moab-3-wide"],
    faqs: [
      { q: "Are two pairs of socks the fix?", a: "Sometimes for fine-tuning. Not for a boot that is the wrong width." },
      { q: "When do I replace boots?", a: "When the midsole feels dead or the heel counter collapses, even if the upper looks fine." },
    ],
    related: ["hiking-boots-wide-feet", "trail-runners"],
  },
  {
    slug: "water-treatment",
    title: "How to Treat Backcountry Water",
    description: "Filters, chemicals, and the mistakes that make a water plan fail: silt, freezing, and viruses.",
    h1: "How to treat backcountry water",
    kicker: "Guide · Water",
    answer:
      "In typical North American mountains, filter for bacteria and protozoa and carry chemicals as backup. Where viruses are a real risk, do not rely on a hollow-fiber squeeze filter alone. Keep dirty and clean containers separate. Do not let a filter freeze.",
    sections: [
      {
        id: "what",
        heading: "Know the threat",
        paragraphs: [
          "Giardia and bacteria are the usual backcountry worries at home. Viruses matter more with human contamination and in parts of the world with different water. A product that says filter is not the same as a product that says purifier. Read the claim.",
        ],
      },
      {
        id: "method",
        heading: "A method you will actually do",
        paragraphs: [
          "The best system is the one you use when you are tired. A filter you understand beats a purifier you left at home because it was fiddly. Tablets are slow and reliable. UV pens need clear water and batteries. Silt defeats all of them until you let the dirt settle.",
        ],
      },
      {
        id: "camp",
        heading: "At camp",
        paragraphs: [
          "Collect enough for dinner and the morning so you are not filtering in the dark. Label the dirty bag. Do not dip a clean bottle into the lake to 'just top it off.' That is how the system fails after you did everything else right.",
        ],
      },
    ],
    productSlugs: ["sawyer-squeeze", "befree", "quickdraw", "grayl", "trailshot"],
    faqs: [
      { q: "Is boiling enough?", a: "Yes. A rolling boil is the old reliable. It uses fuel and does not leave you with cold water." },
      { q: "Do I treat spring water?", a: "If you did not see it leave the ground and the area has stock or people, treat it." },
    ],
    related: ["water-filters", "first-overnight"],
  },
  {
    slug: "pack-fit",
    title: "How to Fit a Backpack",
    description: "Torso length, hip belt, and load. How to fit a backpack before you compare pockets.",
    h1: "How to fit a backpack",
    kicker: "Guide · Packs",
    answer:
      "Measure your torso from the C7 vertebra to the top of your iliac crest. That number picks the pack size. The hip belt should sit on the crest, not on your stomach. Load the pack with 20 to 25 pounds before you decide it is comfortable.",
    sections: [
      {
        id: "torso",
        heading: "Torso length is not height",
        paragraphs: [
          "Two people who are the same height can have different torsos. A pack sized for height alone often puts the shoulder straps in the wrong place, and then every feature review is irrelevant. Use the brand's size chart after you measure.",
        ],
      },
      {
        id: "hips",
        heading: "The hip belt carries the load",
        paragraphs: [
          "If the padding is on your stomach, the shoulders will hurt. Tighten the hip belt first, then the shoulder straps, then the load lifters at about a 45-degree angle. The sternum strap is a stabilizer, not a weight bearer.",
        ],
      },
      {
        id: "volume",
        heading: "Then pick liters",
        paragraphs: [
          "After the fit is right, match volume to the sleep system. A compact quilt kit can live in 50 liters. A bulky synthetic bag may need 65. Empty space will be filled with things you do not need.",
        ],
      },
    ],
    productSlugs: ["atmos-ag-65", "baltoro-65", "exos-58", "kakwa-55", "rei-trail-40"],
    faqs: [
      { q: "Can a shop fit me?", a: "Yes, and it is worth it for a first expensive pack. Take your heaviest typical load or ask them to weight it." },
      { q: "What if I am between sizes?", a: "Prefer the size that puts the hip belt on the crest. Adjustable harnesses exist for a reason." },
    ],
    related: ["backpacking-packs", "osprey-vs-gregory"],
  },
  {
    slug: "canister-vs-liquid",
    title: "Canister Stove or Liquid Fuel",
    description: "When a canister stove is enough and when a liquid-fuel stove is the cold-weather tool.",
    h1: "Canister stove or liquid fuel?",
    kicker: "Guide · Kitchen",
    answer:
      "Use a canister stove for three-season trips when you can buy canisters. Use liquid fuel when it is cold enough that canister pressure drops, or when you cannot count on the right canister abroad. Do not use either inside a tent.",
    sections: [
      {
        id: "can",
        heading: "Canisters are convenient",
        paragraphs: [
          "They light fast, they do not spill a pump, and every trailhead shop sells them in season. In wind, a basic upright stove struggles. A wind-aware burner or a remote canister stove is the upgrade, not a bigger pot.",
        ],
      },
      {
        id: "cold",
        heading: "Cold is a pressure problem",
        paragraphs: [
          "Canister fuel needs pressure. Cold reduces it. Some stoves let you invert a remote canister so liquid feeds the burner. That is a technique with a manual, not a guess. Liquid-fuel stoves were built for this and weigh more.",
        ],
      },
      {
        id: "safe",
        heading: "The safety rule is boring",
        paragraphs: [
          "Cook outside, stable, away from the tent wall. A windscreen that the manufacturer did not design can overheat a canister. Let the stove cool before you pack it. Fuel is not a leaving-no-trace footnote.",
        ],
      },
    ],
    productSlugs: ["windmaster", "pocketrocket", "whisperlite", "minimo"],
    faqs: [
      { q: "Can I fly with canisters?", a: "Not in checked or carry-on luggage under usual rules. Buy fuel at the destination." },
      { q: "Is white gas the same as auto fuel?", a: "No. Use the fuel the stove is approved for." },
    ],
    related: ["camping-stoves", "car-camping-kitchen"],
  },
  {
    slug: "leave-no-trace-camp",
    title: "Leave No Trace at Camp",
    description: "The camp habits that matter: food, washing, tents on durable ground, and fires.",
    h1: "Leave no trace at camp",
    kicker: "Guide · Habits",
    answer:
      "Cook and store food away from the tent, wash 200 feet from water, put the tent on a durable surface that already exists, and follow the local fire rule. The gear does not matter if the site looks worse when you leave.",
    sections: [
      {
        id: "food",
        heading: "Food smells are a storage problem",
        paragraphs: [
          "Use the site's box, a required canister, or a hang that the local rules actually accept. A stuff sack in the vestibule is how animals learn tents. Pack out scraps, including wash water with food in it.",
        ],
      },
      {
        id: "wash",
        heading: "Soap and lakes do not mix",
        paragraphs: [
          "Even biodegradable soap is soap. Wash dishes and yourself far from the water and scatter strained water. Three bins make this easier. They are not a license to dump pasta water in the creek.",
        ],
      },
      {
        id: "site",
        heading: "The tent site already exists",
        paragraphs: [
          "Use a pad or a spot that is already bare. Do not trench around the tent. If you need a fire, use an existing ring where fires are allowed, and do not build a new one because the view is better.",
        ],
      },
    ],
    productSlugs: ["wash-bins", "sawyer-squeeze", "dry-bag"],
    faqs: [
      { q: "Are wipes fine?", a: "Pack them out. They are not fire starter and they are not compost." },
      { q: "What about toilet paper?", a: "Follow local rules. Pack it out unless the land manager says otherwise." },
    ],
    related: ["car-camping-kitchen", "first-overnight"],
  },
  {
    slug: "three-vs-four-season",
    title: "Three-Season or Four-Season Tent",
    description: "When a three-season tent is enough and when you actually need a four-season shelter.",
    h1: "Three-season or four-season tent?",
    kicker: "Guide · Shelters",
    answer:
      "A three-season tent is the right tent for rain, wind, and mild frost. A four-season tent is for snow loading and serious wind. Buying a four-season tent for summer weekends gives you extra weight and worse ventilation. Most of this site is three-season on purpose.",
    sections: [
      {
        id: "three",
        heading: "What three-season means",
        paragraphs: [
          "It means mesh, airflow, and a fly that handles rain. It does not mean the tent is happy in a wet dump of snow. Shoulder season with a good forecast is still three-season territory if you know how to guy out the fly.",
        ],
      },
      {
        id: "four",
        heading: "What four-season costs",
        paragraphs: [
          "Stronger poles, less mesh, more fabric, more weight. Condensation goes up because airflow goes down. If you do not camp on snow, you will carry that penalty on every July trip.",
        ],
      },
      {
        id: "middle",
        heading: "The middle is a skill, not a SKU",
        paragraphs: [
          "A sturdy three-season tent, good stakes, and a decision to bail covers more hikers than a mountaineering tent they use twice. The Hubba Hubba class is that conservative three-season pick. It is still not a winter tent.",
        ],
      },
    ],
    productSlugs: ["hubba-hubba-2", "copper-spur-ul2", "dragonfly-osmo-2"],
    faqs: [
      { q: "Can I camp in October in a three-season tent?", a: "Often, if the forecast is rain and frost rather than snow loading, and your sleep system is honest." },
      { q: "Does a footprint make a tent four-season?", a: "No." },
    ],
    related: ["backpacking-tents", "ultralight-shelter"],
  },
];

export const compares: Compare[] = [
  {
    slug: "osprey-vs-gregory",
    title: "Osprey Atmos AG 65 vs Gregory Baltoro 65",
    description: "Osprey Atmos AG 65 vs Gregory Baltoro 65: ventilation, pockets, fit, and who should buy which. Illustrative comparison.",
    h1: "Osprey vs Gregory backpack",
    kicker: "Comparison · Illustrative",
    answer:
      "These are illustrative models, not a lab award for one colorway. Choose the Atmos AG 65 for hot miles and a suspended mesh back. Choose the Baltoro 65 if you live out of pockets and carry a heavier week. Fit the torso first. A 65 is the wrong pack for many first overnights.",
    left: "atmos-ag-65",
    right: "baltoro-65",
    rows: [
      { label: "Best at", left: "Ventilation in heat", right: "Organization and a heavier week" },
      { label: "Back panel", left: "Suspended mesh gap", right: "Closer, more structured contact" },
      { label: "Pockets", left: "Fewer small cubbies", right: "Lid and pocket layout" },
      { label: "Warranty culture", left: "Broader all-mighty reputation", right: "Typically defect-focused" },
      { label: "Skip it if", left: "You need winter bulk pockets", right: "Your back sweats and the mesh gap feels better" },
    ],
    verdict:
      "Try both loaded. Buy the Atmos if the mesh gap feels like relief. Buy the Baltoro if you keep reaching for pockets the Atmos does not have. Women's fits are Aura and Deva, not these names.",
    faqs: [
      { q: "Which for a hot section of a long trail?", a: "The ventilated pack, if the torso fit is right." },
      { q: "Which is lighter?", a: "It depends on the year. Do not buy either for a two-ounce story. Buy for fit." },
    ],
    related: ["backpacking-packs", "pack-fit"],
  },
  {
    slug: "copper-spur-vs-x-mid",
    title: "Copper Spur UL2 vs Durston X-Mid 2",
    description: "Big Agnes Copper Spur UL2 vs Durston X-Mid 2: freestanding comfort versus trekking-pole weight.",
    h1: "Copper Spur vs X-Mid",
    kicker: "Comparison · Tents",
    answer:
      "Buy the Copper Spur UL2 if the tent must stand before it is staked. Buy the X-Mid 2 if you carry two poles, can stake, and want more floor for less weight. They are not the same tool with different logos.",
    left: "copper-spur-ul2",
    right: "x-mid-2",
    rows: [
      { label: "Pitch", left: "Freestanding", right: "Trekking poles and stakes" },
      { label: "Platforms", left: "Yes", right: "No, if you cannot stake" },
      { label: "Weight class", left: "A bit heavier", right: "Lighter" },
      { label: "Learning", left: "Familiar", right: "Practice once at home" },
      { label: "Price class", left: "Upper mid", right: "Mid" },
    ],
    verdict: "Most new backpacking pairs should buy the Copper Spur. Most pole-carrying gram counters should buy the X-Mid.",
    faqs: [
      { q: "Which is better in rain?", a: "Both can be. The X-Mid pitches fly-first. The Copper Spur is easier if you are already wet and tired and the site is a platform." },
      { q: "Which is tougher?", a: "Neither is a four-season tent. The freestanding pole structure is more forgiving of a sloppy pitch." },
    ],
    related: ["backpacking-tents", "ultralight-shelter", "copper-spur-vs-dragonfly"],
  },
  {
    slug: "xlite-vs-tensor",
    title: "NeoAir XLite vs NEMO Tensor",
    description: "Therm-a-Rest NeoAir XLite NXT vs NEMO Tensor: warmth-to-weight versus a quieter night.",
    h1: "XLite vs Tensor",
    kicker: "Comparison · Pads",
    answer:
      "Buy the XLite NXT if you want the known warmth-to-weight insulated air pad. Buy the Tensor if noise or feel kept you awake on a Therm-a-Rest. Confirm the insulated Tensor's current R-value before you assume they match.",
    left: "xlite-nxt",
    right: "nemo-tensor",
    rows: [
      { label: "Bias", left: "Warmth for the weight", right: "Quiet and comfort" },
      { label: "Risk", left: "Puncture, some crinkle", right: "Puncture, check the R-value" },
      { label: "Wide option", left: "Yes", right: "Yes on many versions" },
      { label: "Winter", left: "No, look at XTherm", right: "No, unless the spec says so" },
    ],
    verdict: "If you have not hated a crinkly pad, start with the XLite. If you have, try the Tensor in person.",
    faqs: [
      { q: "Which is warmer?", a: "Whichever insulated model has the higher current R-value. Do not trust an old review for that number." },
    ],
    related: ["sleeping-pads", "choose-a-pad", "xlite-vs-xtherm"],
  },
  {
    slug: "keen-vs-altra",
    title: "KEEN Targhee vs Altra Lone Peak",
    description: "KEEN Targhee IV vs Altra Lone Peak for wide feet: boot stability versus a foot-shaped toe box.",
    h1: "Targhee vs Lone Peak",
    kicker: "Comparison · Footwear",
    answer:
      "Buy the Targhee if you want a waterproof mid boot with a wide toe box and a traditional heel. Buy the Lone Peak if the pain is a pointed toe box and the trail is moderate enough for a zero-drop shoe. They solve different problems.",
    left: "targhee-iv",
    right: "lone-peak",
    rows: [
      { label: "Shape", left: "Wide boot toe box", right: "Foot-shaped shoe" },
      { label: "Drop", left: "Traditional", right: "Zero" },
      { label: "Waterproof", left: "Yes", right: "Usually no" },
      { label: "Ankle", left: "Mid support", right: "Shoe, you provide the ankle" },
      { label: "Break-in", left: "A few walks", right: "Weeks if you are new to zero drop" },
    ],
    verdict: "Try the Targhee if you are buying one pair for mixed trail and a pack. Try the Lone Peak if boots always crush your toes and your ankles are fine.",
    faqs: [
      { q: "Can I backpack in Lone Peaks?", a: "Many people do, on moderate trail, with a pack that is not huge. It is a bad idea if you roll ankles." },
    ],
    related: ["hiking-boots-wide-feet", "trail-shoes", "boot-fit", "speedgoat-vs-lone-peak"],
  },
  {
    slug: "windmaster-vs-pocketrocket",
    title: "Soto WindMaster vs MSR PocketRocket",
    description: "Soto WindMaster vs MSR PocketRocket Deluxe: wind performance versus a smaller fair-weather stove.",
    h1: "WindMaster vs PocketRocket",
    kicker: "Comparison · Stoves",
    answer:
      "Buy the WindMaster if you cook in a breeze. Buy the PocketRocket Deluxe if your sites are calm and you want the smaller, simpler upright stove. Neither belongs in a tent.",
    left: "windmaster",
    right: "pocketrocket",
    rows: [
      { label: "Wind", left: "The point of the stove", right: "A weakness" },
      { label: "Pack size", left: "Still tiny", right: "Tiny" },
      { label: "Simmer", left: "Usable", right: "Basic" },
      { label: "Fuel", left: "Canister", right: "Canister" },
      { label: "Cold", left: "Limited", right: "Limited" },
    ],
    verdict: "Most backpackers should spend the small premium for the WindMaster. Fair-weather gram counters can keep the PocketRocket.",
    faqs: [
      { q: "Which boils faster?", a: "In a breeze, the WindMaster, because it stays lit. In a kitchen, the difference is not why you are buying." },
    ],
    related: ["canister-stoves-picks", "canister-vs-liquid"],
  },
  {
    slug: "sawyer-vs-katadyn",
    title: "Sawyer Squeeze vs Katadyn BeFree",
    description: "Sawyer Squeeze vs Katadyn BeFree: squeeze bags versus a fast flask, and the silt problem they share.",
    h1: "Squeeze vs BeFree",
    kicker: "Comparison · Water",
    answer:
      "Buy the Squeeze if you want the common, cheap, maintainable filter. Buy the BeFree if you want faster flow from a soft flask and your water is relatively clear. Neither removes viruses. Both clog in silt and fail if they freeze.",
    left: "sawyer-squeeze",
    right: "befree",
    rows: [
      { label: "Flow when clean", left: "Steady squeeze", right: "Faster" },
      { label: "Silt", left: "Clogs, backflush", right: "Clogs, swish" },
      { label: "System", left: "Any compatible bottle or bag", right: "Flask-centered" },
      { label: "Viruses", left: "No", right: "No" },
      { label: "Price class", left: "Budget", right: "Budget to mid" },
    ],
    verdict: "Start with the Squeeze and tablets. Move to the BeFree if you hate squeezing and your sources are clear.",
    faqs: [
      { q: "Which lasts longer?", a: "Whichever you backflush and do not freeze. The cartridge life on the box assumes decent water." },
    ],
    related: ["water-filters", "water-treatment"],
  },
  {
    slug: "actik-vs-spot",
    title: "Petzl Actik Core vs Black Diamond Spot",
    description: "Petzl Actik Core vs Black Diamond Spot 400-R: two default rechargeable hiking headlamps.",
    h1: "Actik Core vs Spot",
    kicker: "Comparison · Lights",
    answer:
      "Both are reasonable default headlamps. Pick the Actik Core if you want Petzl's hybrid battery story. Pick the Spot if you like the control layout and you will use the lock. Lumens on the box are not the decision.",
    left: "actik-core",
    right: "spot-400",
    rows: [
      { label: "Low mode", left: "Useful", right: "Useful" },
      { label: "Red light", left: "Yes", right: "Yes" },
      { label: "Annoyance", left: "Battery format changes by year", right: "Easy to turn on in the pack" },
      { label: "Weight class", left: "Light", right: "Light" },
    ],
    verdict: "Buy the one you can lock and recharge. Carry a second small light either way.",
    faqs: [
      { q: "Which is brighter?", a: "Claimed output is in the same hiking class. Beam shape and the low mode matter more at camp." },
    ],
    related: ["headlamps", "first-overnight"],
  },
  {
    slug: "helium-vs-rainier",
    title: "OR Helium vs REI Rainier",
    description: "Outdoor Research Helium vs REI Rainier for hikers shopping under about $150.",
    h1: "Helium vs Rainier",
    kicker: "Comparison · Rain",
    answer:
      "Buy the Helium if the jacket lives in a pack lid. Buy the Rainier if you will wear it on day hikes and can try the hood on. Both are three-season trail shells, not alpine armor. Confirm pit zips on the exact season. amazon.com has no verified listing for either model. Closest listings on the product pages are not these picks.",
    left: "helium",
    right: "rainier",
    rows: [
      { label: "Pack size", left: "Tiny", right: "Moderate" },
      { label: "Durability", left: "Thin", right: "A bit tougher" },
      { label: "Try-on", left: "Often online", right: "Easier in a shop" },
      { label: "Budget", left: "Often under $150", right: "Often under $150" },
    ],
    verdict: "Backpackers should default to the Helium. Day hikers who run cold should default to the Rainier after trying it over a fleece.",
    faqs: [
      { q: "Which breathes better?", a: "Neither breathes like a premium shell. Pit zips matter more than the brand story." },
    ],
    related: ["rain-jackets-under-150", "layering"],
  },
  {
    slug: "copper-spur-vs-dragonfly",
    title: "Copper Spur UL2 vs NEMO Dragonfly OSMO 2P",
    description: "Big Agnes Copper Spur UL2 vs NEMO Dragonfly OSMO 2P: two freestanding tents in the same price band, one easy to pitch, one built for steady rain.",
    h1: "Copper Spur vs Dragonfly",
    kicker: "Comparison · Tents",
    answer:
      "Both are freestanding, double-wall, two-person tents in the Upper mid price band, so pitch style does not decide this pair. Buy the Copper Spur UL2 if you want an easy pitch to learn and two doors on platforms and dirt. Buy the Dragonfly OSMO 2P if rain is your normal forecast, because its fabric holds shape better once it is soaked. If you are choosing between freestanding and trekking-pole, read Copper Spur vs X-Mid instead.",
    left: "copper-spur-ul2",
    right: "dragonfly-osmo-2",
    rows: [
      { label: "Bias", left: "Easy pitch, two doors", right: "Taut pitch when soaked" },
      { label: "Fabric", left: "Light, needs care on granite", right: "OSMO, sags less when wet" },
      { label: "Published weight", left: "About 2 lb 8 oz", right: "A bit over 2.5 lb" },
      { label: "Pitch", left: "Freestanding, double wall", right: "Freestanding, double wall" },
      { label: "Season", left: "Three-season", right: "Three-season, wet" },
      { label: "Price band", left: "Upper mid", right: "Upper mid" },
    ],
    verdict: "For most pairs on mixed platforms and dirt, buy the Copper Spur UL2. If your trips are in wet, mild mountain weather and rain is expected, not a surprise, buy the Dragonfly OSMO 2P.",
    faqs: [
      { q: "Which is lighter?", a: "The published weights are close: about 2 lb 8 oz for the Copper Spur UL2 and a bit over 2.5 lb for the Dragonfly. Weight should not decide this pair. Check the listing for the current model year." },
      { q: "Is either a four-season tent?", a: "No. Both are three-season tents. The Dragonfly's wet-weather fabric is not a winter rating." },
      { q: "Do I need a footprint?", a: "On abrasive rock, take one with either tent. The Copper Spur's thin floor needs care on sharp rock." },
    ],
    related: ["backpacking-tents", "copper-spur-vs-x-mid", "ultralight-shelter"],
  },
  {
    slug: "xlite-vs-xtherm",
    title: "NeoAir XLite NXT vs NeoAir XTherm",
    description: "Therm-a-Rest NeoAir XLite NXT vs NeoAir XTherm: a three-season air pad versus a high R-value pad for cold sleepers and frozen ground.",
    h1: "XLite vs XTherm",
    kicker: "Comparison · Pads",
    answer:
      "Same maker, different job. Buy the XLite NXT for three-season backpacking. Its R-value class is about 4-plus. Buy the XTherm if you sleep cold or camp near freezing. Its R-value class is about 7. The XTherm is overkill, and warm, on hot summer nights. Confirm the current R-value on the listing for the model year you buy.",
    left: "xlite-nxt",
    right: "xtherm",
    rows: [
      { label: "Season", left: "Three-season", right: "Cold sleepers, near freezing" },
      { label: "R-value class", left: "About 4-plus", right: "About 7" },
      { label: "Best for", left: "Three-season backpacking", right: "Cold sleepers and shoulder-season ground" },
      { label: "Watch out for", left: "Puncture risk, some versions crinkle", right: "Overkill, and warm, on hot nights" },
      { label: "Weight", left: "Low", right: "Low for the warmth" },
      { label: "Price band", left: "Upper mid", right: "High" },
    ],
    verdict: "Most three-season backpackers should buy the XLite NXT. Buy the XTherm when camps drop near freezing and you sleep cold. If that happens only a few nights a year, a foam pad under the XLite is the cheaper fix.",
    faqs: [
      { q: "Can I put a foam pad under the XLite instead?", a: "Yes. Stacked pads add their R-values, so a Z Lite Sol (about R 2) under an XLite NXT adds warmth and puncture insurance. It is bulkier than one warm pad." },
      { q: "Is the XTherm too warm for summer?", a: "It can sleep hot on hot summer nights. You can vent a bag. You cannot add ground insulation you left at home." },
      { q: "What about the NEMO Tensor?", a: "The Tensor is the quieter alternative to the XLite. That choice is on XLite vs Tensor." },
    ],
    related: ["sleeping-pads", "cold-sleepers", "r-value", "xlite-vs-tensor"],
  },
  {
    slug: "speedgoat-vs-lone-peak",
    title: "Hoka Speedgoat vs Altra Lone Peak",
    description: "Hoka Speedgoat vs Altra Lone Peak for hiking: max cushion with a wide option versus a zero-drop shoe with a foot-shaped toe box.",
    h1: "Speedgoat vs Lone Peak",
    kicker: "Comparison · Footwear",
    answer:
      "Buy the Speedgoat if your knees complain before your toes do and the trail is long and moderate. Buy the Lone Peak if the problem is a pointed toe box and you will give zero drop two easy weeks. Neither is a boot. If you are choosing between a boot and a shoe for wide feet, read Targhee vs Lone Peak instead.",
    left: "speedgoat",
    right: "lone-peak",
    rows: [
      { label: "Bias", left: "Max cushion", right: "Foot-shaped toe box, zero drop" },
      { label: "Width", left: "Standard and wide versions", right: "Wide by shape" },
      { label: "Terrain", left: "Long, moderate trail", right: "Non-technical trail" },
      { label: "Watch out for", left: "Vague on technical rock", right: "Zero drop needs a break-in period" },
      { label: "Weight", left: "Cushioned, light enough for a big shoe", right: "Light" },
      { label: "Price band", left: "Mid", right: "Mid" },
    ],
    verdict: "For long, buffed trail and tired knees, buy the Speedgoat, in the wide if the standard pinches. For wide or flat feet on moderate trail, buy the Lone Peak and ease into zero drop. On steep, loose scree, neither is the precise choice.",
    faqs: [
      { q: "Which is better for wide feet?", a: "The Lone Peak is wide by shape. The Speedgoat comes in a wide version if you want cushion with more room. Both are on the wide toe box trail shoe page." },
      { q: "How long is the Lone Peak break-in?", a: "Give zero drop two easy weeks. Do not start on a long descent." },
      { q: "Are they good on rocky trail?", a: "Less so. The Speedgoat's stack feels vague on technical rock, and the Lone Peak has less rock protection than a boot. For rocky trail, see the trail runners page." },
    ],
    related: ["trail-shoes", "trail-runners", "keen-vs-altra", "heel-drop"],
  },
];

export const kits: Kit[] = [
  {
    slug: "fair-weekend",
    name: "Fair-weather weekend",
    description: "Two nights, mild forecast, moderate miles. Comfort over ounces.",
    forWhom: "A pair or a solo hiker who wants the night to be pleasant, not minimal.",
    productSlugs: ["half-dome-2-plus", "magma-15", "xlite-nxt", "windmaster", "actik-core", "helium", "rei-trail-40"],
    notes: [
      "The tent is heavier than an ultralight shelter and easier at 7 p.m.",
      "Swap the pack up in volume if the bag is bulky.",
      "Add a puffy if camp will be windy after you stop.",
    ],
  },
  {
    slug: "light-and-dry",
    name: "Light and dry",
    description: "A trimmed three-season kit for hikers who already know their pitch and sleep warm enough.",
    forWhom: "Experienced hikers on stakeable ground with trekking poles.",
    productSlugs: ["x-mid-2", "ee-revelation", "xlite-nxt", "pocketrocket", "nu25", "kakwa-55", "leki-makalu"],
    notes: [
      "This kit assumes you will strap the quilt and vent the tent.",
      "Cold sleepers should not copy it.",
      "The PocketRocket is the calm-weather choice. Take the WindMaster if the ridge is breezy.",
    ],
  },
  {
    slug: "cold-sleeper-kit",
    name: "Cold sleeper",
    description: "Margin in the bag and the pad, not in a lighter shell.",
    forWhom: "People who sleep cold at home and are tired of being told to add a liner.",
    productSlugs: ["copper-spur-ul2", "nemo-disco-15", "xtherm", "magma-hoody", "windmaster", "actik-core"],
    notes: [
      "The spoon bag is for people who thrash. A slim mummy is fine if you do not.",
      "Dry layers only inside the bag.",
      "This is still not a winter expedition kit.",
    ],
  },
  {
    slug: "wide-foot-weekend",
    name: "Wide feet, first overnight",
    description: "The boot problem solved before the pack gets interesting.",
    forWhom: "Hikers who have been sizing up boots and paying for it in blisters.",
    productSlugs: ["targhee-iv", "half-dome-2-plus", "magma-15", "xlite-nxt", "windmaster", "actik-core"],
    notes: [
      "Try the boot on a downslope before the trip.",
      "If the Targhee is still narrow, look at the Lone Peak only if your ankles are stable.",
      "Do not debut the boots on this overnight.",
    ],
  },
  {
    slug: "car-camp-weekend",
    name: "Drive-up weekend",
    description: "Two burners, wash bins, ice, and a real pan. The backpack stays in the closet.",
    forWhom: "Families and friends at a campground.",
    productSlugs: ["coleman-2burner", "wash-bins", "rotomold-cooler", "lodge-skillet", "helinox-chair", "actik-core", "rumpl"],
    notes: [
      "Pre-chill the cooler.",
      "Cook away from the tent.",
      "A backpacking stove is only the coffee backup.",
    ],
  },
  {
    slug: "day-hike",
    name: "Day hike",
    description: "Water, a shell, a layer, and a lamp if the day might run long.",
    forWhom: "A maintained trail you will finish in daylight, with a margin.",
    productSlugs: ["talon-22", "helium", "sun-hoodie", "sawyer-squeeze", "actik-core", "lone-peak"],
    notes: [
      "The shoe is optional in this kit. Wear boots if that is what fits.",
      "Download the map.",
      "Turn around before the light goes if you skipped the lamp.",
    ],
  },
];
