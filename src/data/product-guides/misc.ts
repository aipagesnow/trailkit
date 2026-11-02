import type { ProductGuide } from "./types";

export const misc: ProductGuide[] = [
  {
    slug: "coleman-2burner",
    answer:
      "Short answer: the Coleman Triton 2-burner propane stove is the simple, dependable car-camping stove we'd suggest for most families. It has two burners and 22,000 BTU total, fits a 12 in and a 10 in pan side by side, and runs on the 16 oz green propane cylinders sold almost everywhere. It's too heavy for backpacking, and the simmer control takes a gentle hand.",
    suits: [
      "You car camp and cook real meals: pancakes, eggs, pasta, a pot of coffee alongside.",
      "You want something that works without fiddling and uses fuel you can buy at any hardware store.",
      "You cook for a family or group and need two pans going at once.",
    ],
    skip: [
      "You backpack. You'll want a small canister stove. See [Windmaster vs PocketRocket](/compare/windmaster-vs-pocketrocket).",
      "You want fine low-heat control for delicate cooking. Owners say the Triton's valves are touchy at the low end.",
      "You want built-in electronic ignition. The Triton is match-lit; Coleman sells push-button models.",
    ],
    keySpecs: [
      { label: "Output", value: "22,000 BTU total (Triton); 20,000 BTU on the Classic", plain: "Plenty to boil water quickly and fry for a group." },
      { label: "Pan space", value: "Fits a 12 in and a 10 in pan at once", plain: "Two full-size pans, side by side." },
      { label: "Fuel", value: "16 oz propane cylinder; 20 lb tank with an adapter hose", plain: "About 1 hour on high per cylinder. For long trips, a refillable tank saves money and waste." },
      { label: "Wind protection", value: "Wind baffles on three sides", plain: "Helps keep the flame steady in a breeze." },
      { label: "Ignition", value: "Match-lit", plain: "Bring a lighter or long matches." },
      { label: "Warranty", value: "3-year limited (Triton)", plain: "Covers defects, not wear and tear." },
    ],
    sections: [
      {
        id: "triton-vs-classic",
        heading: "Triton or Classic: which one is this?",
        paragraphs: [
          "Coleman sells two similar two-burner propane stoves. The Triton is the one linked here, with 22,000 BTU. The Classic is a slightly simpler stove with 20,000 BTU. Both fit the same pan sizes and use the same fuel. In practice, they cook much the same; buy whichever is easier to find.",
        ],
      },
      {
        id: "real-world",
        heading: "Real-world use and set-up tips",
        bullets: [
          "Set it on a stable, level table, away from tent walls and anything that can catch fire.",
          "Screw the cylinder in hand-tight and check for leaks by smell or soapy water before lighting.",
          "Light it with the lid open, holding the flame near the burner before turning the knob.",
          "Turn the knobs slowly. The flame jumps quickly from low to high.",
          "For long trips, a 20 lb tank and adapter hose saves you from carrying lots of small cylinders.",
        ],
        paragraphs: [
          "Our [car camping kitchen guide](/guides/car-camping-kitchen) covers the rest: cooler, water, washing up. The [stove safety note](/guides/stove-safety) covers carbon monoxide and fire risks. Never cook inside a tent.",
        ],
      },
      {
        id: "trade-offs",
        heading: "Honest trade-offs and common complaints",
        paragraphs: [
          "The common owner complaints: the knobs are sensitive at low heat, which makes simmering tricky; a few stoves arrive damaged in shipping; and some owners report one burner failing over time. It's also bulky. You won't carry it far from the car.",
          "On the plus side, it's affordable, easy to use, and reliable for most owners. Plenty of people use the same Coleman stove for years.",
        ],
      },
      {
        id: "care",
        heading: "Care and longevity",
        paragraphs: [
          "Let it cool, then wipe grease off the drip tray and grate after each trip. Remove the cylinder before packing. Store it dry, with the lid closed. Check the hose and regulator for cracks before each season. If a burner won't stay lit, clean it first; spiders and debris often block the ports.",
        ],
      },
    ],
    alternatives: [
      { href: "/best/camping-stoves", label: "Best camping stoves", why: "Car-camping and backpacking stoves." },
      { href: "/kits/car-camp-weekend", label: "Car camp weekend kit", why: "The rest of a car-camp setup." },
      { href: "/best/car-camping-gear", label: "Best car camping gear", why: "Everything that fits in the trunk." },
      { href: "/compare/windmaster-vs-pocketrocket", label: "Windmaster vs PocketRocket", why: "If you're going lightweight." },
      { href: "/guides/canister-vs-liquid", label: "Canister vs liquid fuel", why: "Fuel choices explained." },
    ],
    faqs: [
      { q: "How long does a 16 oz propane cylinder last on a Coleman 2-burner stove?", a: "About an hour with one burner on high. On lower settings, it lasts longer." },
      { q: "Can I hook the Coleman 2-burner stove up to a 20 lb propane tank?", a: "Yes, with an adapter hose. Coleman sells a hose for this." },
      { q: "What's the difference between the Coleman Triton and Classic?", a: "The Triton is rated at 22,000 BTU and the Classic at 20,000 BTU. Both fit a 12 in and 10 in pan and use 16 oz propane cylinders." },
      { q: "Can you use a Coleman camp stove indoors?", a: "No. Propane stoves produce carbon monoxide. Use them outdoors only, with good ventilation." },
      { q: "Is the Coleman 2-burner stove good for backpacking?", a: "No. It's built for car camping. For backpacking, use a small canister stove." },
    ],
    sources: [
      { label: "Coleman: camping stoves (Triton and Classic specs)", url: "https://www.coleman.com/camping-stoves/" },
    ],
  },
  {
    slug: "eno-doublenest",
    answer:
      "Short answer: the ENO DoubleNest is the hammock we'd buy for lounging at camp, in the park or at the beach. It's roomy, tough, packs small, and sets up in a couple of minutes. It's not a complete sleep system on its own: straps, a bug net and a rain tarp are sold separately.",
    suits: [
      "You want an easy hammock for lounging, day trips and festivals.",
      "You want room to spread out, or to share with a child.",
      "You'd like a simple first hammock before deciding whether to sleep in one.",
    ],
    skip: [
      "You want to sleep in a hammock overnight without extras. See the [Blackbird XLC](/products/blackbird-xlc), which has a built-in bug net and a flatter lie.",
      "You're over 6 ft 6 in or want a flat sleep.",
      "You don't want to buy straps separately.",
    ],
    keySpecs: [
      { label: "Capacity", value: "400 lb", plain: "Enough for two people to sit, though sleeping two isn't comfortable." },
      { label: "Size", value: "9 ft 6 in x 6 ft 4 in", plain: "Wide enough for a diagonal lie." },
      { label: "Weight", value: "19 oz", plain: "Light enough for day packs." },
      { label: "Packed size", value: "About 6 x 4 x 5 in", plain: "Packs into the attached stuff sack." },
      { label: "Fabric", value: "70D FreeWave nylon taffeta", plain: "Breathable and quick-drying." },
      { label: "Hardware", value: "7075 aluminum carabiners, triple-stitched seams", plain: "Strong and light." },
    ],
    sections: [
      {
        id: "hang",
        heading: "How to hang it",
        paragraphs: [
          "You'll need tree straps, such as ENO's Atlas straps. Choose two healthy trees 12 to 15 ft apart. Wrap a strap around each tree at about head height, clip the carabiners into the strap loops, and aim for a 30-degree angle from the strap to the tree. That angle gives a comfortable sag and reduces stress on the straps.",
          "Lie diagonally rather than straight along the hammock. It flattens your body, reduces pressure on your shoulders, and makes the hammock more comfortable. Our [hammock setup guide](/guides/hammock-setup) walks through the details.",
        ],
        bullets: [
          "Use tree straps at least 1 in wide to protect bark. Many parks require them.",
          "Keep the hammock low, so your seat is no higher than a chair.",
          "Don't hang from dead trees or limbs.",
        ],
      },
      {
        id: "trade-offs",
        heading: "Honest trade-offs and common complaints",
        paragraphs: [
          "Straps aren't included, which surprises some buyers. The fabric is stiffer than some competitors, and there's no bug net. For overnights, you'll want a bug net, a rain tarp and an underquilt or pad, since hammocks are cold underneath.",
        ],
      },
      {
        id: "care",
        heading: "Care and longevity",
        paragraphs: [
          "Hand wash it in cold water with mild soap, or machine wash on gentle without the carabiners. Hang it to dry. Store it dry and out of direct sun, since UV slowly weakens nylon. Check stitching and carabiners for wear before each season.",
        ],
      },
    ],
    alternatives: [
      { href: "/compare/eno-vs-blackbird", label: "ENO vs Blackbird", why: "A lounger against a full sleep hammock." },
      { href: "/products/blackbird-xlc", label: "Warbonnet Blackbird XLC", why: "Bug net and flatter lie for overnight trips." },
      { href: "/best/hammocks", label: "Best hammocks", why: "The full shortlist." },
      { href: "/kits/hammock-weekend", label: "Hammock weekend kit", why: "What you need to sleep in a hammock." },
    ],
    faqs: [
      { q: "Does the ENO DoubleNest come with straps?", a: "No. Straps are sold separately." },
      { q: "How much weight can an ENO DoubleNest hold?", a: "400 lb." },
      { q: "Can two people sleep in an ENO DoubleNest?", a: "Two people can sit or lounge, but sleeping two isn't comfortable for most people." },
      { q: "How big is the ENO DoubleNest?", a: "It's 9 ft 6 in long and 6 ft 4 in wide." },
      { q: "Can you camp in an ENO DoubleNest?", a: "Yes, but you'll need a bug net, rain tarp and an underquilt or pad for warmth." },
    ],
    sources: [
      { label: "ENO: DoubleNest hammock specs", url: "https://www.enonation.com/doublenest-hammock" },
      { label: "REI: ENO DoubleNest", url: "https://www.rei.com/product/202538/eno-doublenest-hammock" },
    ],
  },
  {
    slug: "blackbird-xlc",
    answer:
      "Short answer: the Warbonnet Blackbird XLC is the hammock we'd choose if you want to sleep in a hammock most nights. It's long and wide, with an integrated bug net, a fixed ridgeline and a footbox that helps you lie flat. The trade-offs are weight and set-up time: it's heavier and more fiddly than a simple hammock.",
    suits: [
      "You want a comfortable night's sleep, rather than lounging.",
      "You camp in buggy areas and want a built-in bug net.",
      "You're tall or broad and want plenty of room.",
    ],
    skip: [
      "You want a hammock mainly for lounging or day trips. The [ENO DoubleNest](/products/eno-doublenest) is lighter and simpler.",
      "You camp where trees are sparse.",
      "You want a quick, minimal setup.",
    ],
    keySpecs: [
      { label: "Size", value: "11 ft x 62 in, 112 in ridgeline", plain: "Long and wide, for a flatter lie." },
      { label: "Weight", value: "19–29 oz depending on fabric", plain: "Single layer 19 oz, light double 25 oz, heavy single 23 oz, heavy double 29 oz." },
      { label: "Capacity", value: "300–400 lb maximum by fabric", plain: "Warbonnet recommends a lower comfort weight for each version." },
      { label: "Bug net", value: "Integrated, zip-open", plain: "Keeps bugs off without a separate net." },
      { label: "Footbox", value: "Built-in", plain: "Gives your feet room to lie flat." },
      { label: "Shelf", value: "Gear shelf under the ridgeline", plain: "Handy for storing small items overnight." },
    ],
    sections: [
      {
        id: "fit",
        heading: "Choose your fabric by weight",
        paragraphs: [
          "Warbonnet offers several fabrics. Pick by your weight and how you plan to insulate. A double layer lets you slide a pad between layers, which is warmer and stops the pad sliding. Warbonnet's site lists comfort weights for each version; we'd stay within that rather than the maximum.",
        ],
      },
      {
        id: "set-up",
        heading: "Set-up tips",
        bullets: [
          "Hang it with a slight sag. The fixed ridgeline sets the sag for you, so you just need the ends at even height.",
          "Lie with your feet in the footbox and your head at the opposite side for the flattest lie.",
          "Pair it with a tarp and an underquilt for rain and cold nights.",
          "Keep the shelf light. Heavy items make it sag.",
        ],
        paragraphs: [
          "Our [hammock setup guide](/guides/hammock-setup) covers suspension and tarps.",
        ],
      },
      {
        id: "trade-offs",
        heading: "Honest trade-offs and common complaints",
        paragraphs: [
          "Owners mention the shelf sagging when loaded, a ridge under the calves if the hang isn't right, and the zipper not being YKK. It's also heavier than simple hammocks. Most owners say these are minor once you dial in the hang.",
        ],
      },
      {
        id: "care",
        heading: "Care and longevity",
        paragraphs: [
          "Dry it before storing. Wash it gently by hand with mild soap if it gets dirty. Store it out of sun. Check the suspension for wear before each season.",
        ],
      },
    ],
    alternatives: [
      { href: "/compare/eno-vs-blackbird", label: "ENO vs Blackbird", why: "Lounger versus sleeper." },
      { href: "/products/eno-doublenest", label: "ENO DoubleNest", why: "Lighter and simpler for lounging." },
      { href: "/best/hammocks", label: "Best hammocks", why: "The full shortlist." },
      { href: "/kits/hammock-weekend", label: "Hammock weekend kit", why: "Everything for a hammock overnight." },
    ],
    faqs: [
      { q: "How much does the Warbonnet Blackbird XLC weigh?", a: "Between 19 and 29 oz, depending on fabric." },
      { q: "How long is the Blackbird XLC?", a: "11 ft long and 62 in wide, with a 112 in ridgeline." },
      { q: "Does the Blackbird XLC have a bug net?", a: "Yes, it's integrated and zips open." },
      { q: "What's the weight limit of the Blackbird XLC?", a: "From 300 lb up to 400 lb maximum, depending on fabric. Warbonnet lists lower comfort weights." },
      { q: "Is the Blackbird XLC good for side sleepers?", a: "Many side sleepers find it comfortable thanks to the footbox and flat lie, though it takes some practice." },
    ],
    sources: [
      { label: "Warbonnet Outdoors: Blackbird XLC", url: "https://www.warbonnetoutdoors.com/blackbird-xlc/" },
      { label: "Trailspace: Blackbird XLC owner reviews", url: "https://www.trailspace.com/gear/warbonnet/blackbird-xlc/" },
      { label: "Hammock Forums", url: "https://www.hammockforums.net/" },
    ],
  },
  {
    slug: "targhee-iv",
    answer:
      "Short answer: the KEEN Targhee IV Mid Waterproof is a comfortable, roomy hiking boot that we'd recommend if you have wide feet. It comes in a dedicated wide fit, keeps water out, and protects your ankles on rough trail. The trade-offs: it needs some breaking in, it runs warm, and it can slip on wet rock.",
    suits: [
      "You have wide feet or bunions and struggle to find boots that fit.",
      "You hike on rough, muddy or wet trails and want ankle support.",
      "You want a dependable, waterproof day-hiking boot.",
    ],
    skip: [
      "You hike in hot, dry weather. It runs warm.",
      "You prefer light, fast shoes. Look at trail runners. See [the best trail runners](/best/trail-runners).",
      "You need strong arch support. Consider an aftermarket insole.",
    ],
    keySpecs: [
      { label: "Upper", value: "Nubuck leather", plain: "Tough and water-resistant, but warmer than mesh." },
      { label: "Waterproofing", value: "KEEN.DRY membrane", plain: "Keeps water out, but limits breathability." },
      { label: "Drop", value: "12 mm", plain: "Heel higher than toe, a traditional boot feel." },
      { label: "Shaft height", value: "About 5.1 in", plain: "Mid height for ankle support." },
      { label: "Weight", value: "About 20 oz per boot (size 8)", plain: "Average for a mid boot." },
      { label: "Fit", value: "Regular and Wide", plain: "Wide fit adds room in the forefoot." },
    ],
    sections: [
      {
        id: "fit",
        heading: "Sizing and fit",
        paragraphs: [
          "KEEN boots have a roomy toe box, and the Targhee IV is no exception. If you have wide feet, the dedicated Wide fit is worth trying. Most people find it true to size, but try them in the afternoon, when your feet are biggest, with your hiking socks. Our [boot fit guide](/guides/boot-fit) explains how to check fit.",
        ],
      },
      {
        id: "break-in",
        heading: "Breaking them in",
        paragraphs: [
          "Wear them around the house and on short walks before a long hike. Reviewers mention some pressure at the tongue and ankle until they soften. Adjust lacing to relieve pressure points.",
        ],
      },
      {
        id: "trade-offs",
        heading: "Honest trade-offs and common complaints",
        paragraphs: [
          "Common complaints include break-in time, tongue and ankle pressure, limited arch support, warmth, and poor traction on wet rock. Reviewers at [OutdoorGearLab](https://www.outdoorgearlab.com/reviews/shoes-and-boots/mens-hiking-boots/keen-targhee-iv-mid-waterproof) and [Treeline Review](https://www.treelinereview.com/gearreviews/keen-targhee-iv-mid-review) note these, while praising comfort and fit.",
        ],
      },
      {
        id: "care",
        heading: "Care and longevity",
        paragraphs: [
          "Brush off dirt after hikes, and rinse with water. Dry them away from direct heat, which can crack leather. Treat the leather with a nubuck-safe waterproofing product occasionally. Replace insoles when they lose cushioning.",
        ],
      },
    ],
    alternatives: [
      { href: "/best/hiking-boots-wide-feet", label: "Best hiking boots for wide feet", why: "Other options with room." },
      { href: "/compare/keen-vs-altra", label: "KEEN vs Altra", why: "Boot versus wide-toe trail runner." },
      { href: "/kits/wide-foot-weekend", label: "Wide foot weekend kit", why: "Gear chosen for wide feet." },
      { href: "/kits/blister-kit", label: "Blister kit", why: "Prevention while breaking them in." },
    ],
    faqs: [
      { q: "Do KEEN Targhee IV boots run wide?", a: "They have a roomy toe box, and there's a dedicated Wide fit." },
      { q: "Are KEEN Targhee IV boots waterproof?", a: "Yes, with a KEEN.DRY membrane." },
      { q: "How long do KEEN Targhee boots take to break in?", a: "Most people need a few short walks before a long hike." },
      { q: "Are KEEN Targhee IV good for hiking?", a: "Yes, for day hikes and rough trail, especially if you have wide feet." },
      { q: "Do KEEN Targhee boots have good arch support?", a: "Support is modest. Many people add aftermarket insoles." },
    ],
    sources: [
      { label: "OutdoorGearLab: KEEN Targhee IV Mid review", url: "https://www.outdoorgearlab.com/reviews/shoes-and-boots/mens-hiking-boots/keen-targhee-iv-mid-waterproof" },
      { label: "Treeline Review: KEEN Targhee IV Mid review", url: "https://www.treelinereview.com/gearreviews/keen-targhee-iv-mid-review" },
      { label: "CleverHiker: KEEN Targhee IV review", url: "https://www.cleverhiker.com/gear/keen-targhee-iv-review" },
    ],
  },
];
