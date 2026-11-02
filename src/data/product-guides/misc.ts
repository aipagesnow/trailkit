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
      {"id": "cooking", "heading": "What cooking on it is actually like", "paragraphs": ["Full heat is where the Triton is happiest. It's great for boiling pasta water, frying bacon and searing burgers. Reviewers at [Backpackers.com](https://backpackers.com/gear/reviews/coleman-triton-stove/) found it boiled a couple of cups of water in about four minutes on a calm day, and that time could double in wind. They also called it built like a tank.", "Simmering is possible, but it takes a light touch. [OutdoorGearLab](https://www.outdoorgearlab.com/reviews/camping-and-hiking/camping-stove/coleman-triton-plus), reviewing the push-start Triton+, noted that the knob turns through several full rotations but goes from low to off in about a quarter turn, and that the low flame is hard to see. Coleman says the current Triton has improved knob rotation for better simmer control. We'd still keep an eye on the flame when you turn it right down, so it doesn't quietly go out.", "With two 11,000 BTU burners you can run a pot of coffee on one side and a skillet on the other. A 12 in skillet and a 10 in pan fit together, but a big griddle across both burners will crowd the wind guards."]},
      {"id": "wind", "heading": "Wind is its weak spot", "paragraphs": ["The fold-out side panels and the lid give you three walls of shelter. That's fine in a light breeze. In stronger gusts, owners and reviewers report slower boils and the odd blown-out flame. OutdoorGearLab rated its wind resistance as the stove's weakest area. One family who owned a Triton from 2016 to 2019 wrote that it took a lot of abuse and always worked, but they replaced it with a Camp Chef Everest for better simmering and wind performance ([Narrow Road Adventures](https://www.narrowroadadventures.com/2-burner-camp-stoves)).", "The simple fix: turn the back of the stove into the wind, set it in the lee of your car or a cooler, and keep a lid on pots. If your trips are often windy, a stove with recessed burners is worth the extra money."]},
      {"id": "fit-kit", "heading": "How it fits into your car-camping kit", "paragraphs": ["Closed, the Triton is a slim case about 21 x 12.5 in that stands on its end in a trunk, and the metal latch keeps it shut in transit. Pack two or three 16 oz cylinders for a weekend of cooking for a family. A cylinder lasts about an hour on high, but you won't run it on high all the time. A lighter, a windscreen-friendly spot and a flat table are the other things you'll want."]},
    ],
    alternatives: [
      { href: "/best/camping-stoves", label: "Best camping stoves", why: "Car-camping and backpacking stoves." },
      { href: "/kits/car-camp-weekend", label: "Car camp weekend kit", why: "The rest of a car-camp setup." },
      { href: "/best/car-camping-gear", label: "Best car camping gear", why: "Everything that fits in the trunk." },
      { href: "/compare/windmaster-vs-pocketrocket", label: "Windmaster vs PocketRocket", why: "If you're going lightweight." },
      { href: "/guides/canister-vs-liquid", label: "Canister vs liquid fuel", why: "Fuel choices explained." },
    ],
    faqs: [
      {"q": "Is the Coleman Triton good in the wind?", "a": "It's fine in a light breeze. In stronger gusts it boils slowly and can blow out. Turn the back of the stove into the wind and use your car or a cooler as a windbreak."},
      {"q": "Does the Coleman Triton have an igniter?", "a": "The standard Triton is match-lit. The Triton+ adds a push-button igniter."},
      { q: "How long does a 16 oz propane cylinder last on a Coleman 2-burner stove?", a: "About an hour with one burner on high. On lower settings, it lasts longer." },
      { q: "Can I hook the Coleman 2-burner stove up to a 20 lb propane tank?", a: "Yes, with an adapter hose. Coleman sells a hose for this." },
      { q: "What's the difference between the Coleman Triton and Classic?", a: "The Triton is rated at 22,000 BTU and the Classic at 20,000 BTU. Both fit a 12 in and 10 in pan and use 16 oz propane cylinders." },
      { q: "Can you use a Coleman camp stove indoors?", a: "No. Propane stoves produce carbon monoxide. Use them outdoors only, with good ventilation." },
      { q: "Is the Coleman 2-burner stove good for backpacking?", a: "No. It's built for car camping. For backpacking, use a small canister stove." },
    ],
    sources: [
      {"label": "Backpackers.com: Coleman Triton stove review", "url": "https://backpackers.com/gear/reviews/coleman-triton-stove/"},
      {"label": "OutdoorGearLab: Coleman Triton+ review", "url": "https://www.outdoorgearlab.com/reviews/camping-and-hiking/camping-stove/coleman-triton-plus"},
      {"label": "Narrow Road Adventures: owners' notes on the Triton and Camp Chef Everest", "url": "https://www.narrowroadadventures.com/2-burner-camp-stoves"},
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
      {"id": "straps", "heading": "Straps matter more than you'd think", "paragraphs": ["The most common problem owners report isn't the hammock, it's the suspension. On [Hammock Forums](https://www.hammockforums.net/forum/showthread.php/91213-ENO-Double-Nest-issues) and [r/hammockcamping](https://www.reddit.com/r/hammockcamping/comments/mn2gc5/new_to_hammocks_and_confused/), people describe waking up with their seat on the ground because stretchy nylon straps sagged overnight. Several fixed it by switching to ENO's Atlas straps or to low-stretch polyester webbing.", "So when you buy a DoubleNest, budget for good straps at the same time. Hang the straps a bit above head height, around 6 ft on the tree, and aim for that 30-degree angle. If you still sink, re-tension after the first ten minutes, once the fabric and straps have settled."]},
      {"id": "real-world", "heading": "Real-world use", "paragraphs": ["For lounging, reading and naps, it's hard to beat. [OutdoorGearLab](https://www.outdoorgearlab.com/reviews/camping-and-hiking/hammock/eno-doublenest) rated it highly for ease of setup and durability, and noted the fabric feels stiffer than silkier competitors. The stuff sack is attached and has a pocket, but there isn't room in it for straps too.", "Can you sleep in it? Some people do, often with a pad. Forum owners who moved to underquilts found the edges of the DoubleNest closed in around them, and many upgraded to a longer, purpose-built camping hammock. If overnights are the plan, see [ENO vs Blackbird](/compare/eno-vs-blackbird) first."]},
      {"id": "fit", "heading": "Sizing and fit", "paragraphs": ["At 9 ft 6 in long, it's fine for most people up to about 6 ft for lounging. Taller people often find the ends pinch the head and feet. The width is what makes a diagonal lie possible, so use it. Two adults can sit side by side, but lying together is cramped and pushes you into the middle."]},
      {"id": "carabiners", "heading": "A packing tip", "paragraphs": ["Some forum owners noticed that older ENO carabiners had sharp teeth on the gate that could snag fabric. Clip the carabiners onto the end loops before stuffing the hammock, so they don't rub against the body inside the sack."]},
      {"id": "rainbugs", "heading": "Rain, bugs and cold", "paragraphs": ["The DoubleNest is just the hammock. There's no bug net, rain tarp or insulation built in, so what you add depends on where and when you hang it. For an afternoon in the park, you need nothing else. For a night out, most owners add a few pieces, and ENO sells its own [Guardian bug net](https://www.eno.com/) and ProFly rain tarp to fit.", "Cold is the one that surprises people. Even on a mild night, air moving under the hammock pulls heat out of your back, and a sleeping bag squashed flat under you does little. Owners on [Hammock Forums](https://www.hammockforums.net/) suggest a sleeping pad inside the hammock as a cheap start, or an underquilt that hangs below it if you plan to camp often. Try your setup in the backyard before you count on it on a trip."]},
    ],
    alternatives: [
      { href: "/compare/eno-vs-blackbird", label: "ENO vs Blackbird", why: "A lounger against a full sleep hammock." },
      { href: "/products/blackbird-xlc", label: "Warbonnet Blackbird XLC", why: "Bug net and flatter lie for overnight trips." },
      { href: "/best/hammocks", label: "Best hammocks", why: "The full shortlist." },
      { href: "/kits/hammock-weekend", label: "Hammock weekend kit", why: "What you need to sleep in a hammock." },
    ],
    faqs: [
      {"q": "Why does my ENO hammock sag to the ground?", "a": "Usually the straps are stretching, or they're hung too low. Use low-stretch polyester straps, hang them about head height, and aim for a 30-degree angle."},
      {"q": "Which straps should I get for an ENO DoubleNest?", "a": "Reviewers and owners recommend ENO's Atlas straps or low-stretch polyester webbing over stretchy nylon straps."},
      { q: "Does the ENO DoubleNest come with straps?", a: "No. Straps are sold separately." },
      { q: "How much weight can an ENO DoubleNest hold?", a: "400 lb." },
      { q: "Can two people sleep in an ENO DoubleNest?", a: "Two people can sit or lounge, but sleeping two isn't comfortable for most people." },
      { q: "How big is the ENO DoubleNest?", a: "It's 9 ft 6 in long and 6 ft 4 in wide." },
      { q: "Can you camp in an ENO DoubleNest?", a: "Yes, but you'll need a bug net, rain tarp and an underquilt or pad for warmth." },
    ],
    sources: [
      {"label": "OutdoorGearLab: ENO DoubleNest review", "url": "https://www.outdoorgearlab.com/reviews/camping-and-hiking/hammock/eno-doublenest"},
      {"label": "Hammock Forums: ENO DoubleNest issues thread", "url": "https://www.hammockforums.net/forum/showthread.php/91213-ENO-Double-Nest-issues"},
      {"label": "r/hammockcamping: new to hammocks thread", "url": "https://www.reddit.com/r/hammockcamping/comments/mn2gc5/new_to_hammocks_and_confused/"},
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
      {"id": "owners", "heading": "What long-term owners say", "paragraphs": ["On [r/hammockcamping](https://www.reddit.com/r/hammockcamping/comments/1kteod3/five_year_review_of_the_warbonnet_blackbird_xlc/), a 6 ft 4 in owner wrote a five-year review saying he sleeps better in it than in his own bed. He praised the stitching, the stuff sack that opens at both ends so the suspension comes out first, and the shelf flap that holds a power bank, phone and even a jacket. Another owner, 6 ft 4 in and 225 lb, found the double layer comfortable with a slight calf ridge, and took it down to 23°F with a winter top cover and a 20-degree underquilt.", "Owners also say you're buying into a system. Warbonnet sells tarps, underquilts and top covers made to fit, and support is widely praised."]},
      {"id": "flat-lie", "heading": "Getting a flat lie", "paragraphs": ["An owner on [r/hammockcamping](https://www.reddit.com/r/hammockcamping/comments/9rc0bq/looking_for_input_on_the_blackbird_xlc/) shared the trick that works for many people: make sure the structural ridgeline has the right sag, and hang the foot end about 10 in higher than the head end. Spend time getting in and out to find your sweet spot. Side sleepers and people who sleep with knees up generally find the footbox gives them room to turn."]},
      {"id": "zips-shelf", "heading": "The zipper and shelf seam", "paragraphs": ["The known weak spots are the bug-net zipper and the seam where the net meets the shelf. Some owners have popped zipper teeth while shifting position, and Warbonnet changed zippers after early units. A few owners report small tears at the shelf-side seam, and one Gen 2 owner found that entering from the shelf side stressed it. Owners say Warbonnet repairs these quickly and cheaply. We'd get in and out on the side opposite the shelf, and avoid pulling on the net."]},
      {"id": "tarp", "heading": "Choosing a tarp", "paragraphs": ["The Blackbird XLC comes with its bug net but no rain cover, so you'll want a tarp for most overnight trips. Warbonnet makes tarps sized for its hammocks, such as the [Superfly and Minifly](https://www.warbonnetoutdoors.com/), and owners on [r/hammockcamping](https://www.reddit.com/r/hammockcamping/) often pair them with the Blackbird.", "A good rule of thumb is a smaller tarp in fair weather to save weight, and a bigger one with doors when you expect wind-driven rain or want a dry spot to change and cook. Hang the tarp first so you can set up the hammock under cover if the weather turns. Pitch it low in a storm and higher on warm nights for a breeze. Remember the tarp only keeps rain off. Any hammock is cold underneath because your sleeping bag compresses under you, so owners in cooler climates keep an underquilt hung even in summer, or slide a pad between the double layers as the budget fix."]},
    ],
    alternatives: [
      { href: "/compare/eno-vs-blackbird", label: "ENO vs Blackbird", why: "Lounger versus sleeper." },
      { href: "/products/eno-doublenest", label: "ENO DoubleNest", why: "Lighter and simpler for lounging." },
      { href: "/best/hammocks", label: "Best hammocks", why: "The full shortlist." },
      { href: "/kits/hammock-weekend", label: "Hammock weekend kit", why: "Everything for a hammock overnight." },
    ],
    faqs: [
      {"q": "Is the Blackbird XLC good for tall people?", "a": "Yes. Several owners who are 6 ft 4 in say it fits them well, though the biggest are near the limit of its length."},
      {"q": "Do you need an underquilt with the Blackbird XLC?", "a": "For anything but warm nights, yes, or a pad in the double layer. Hammocks are cold underneath."},
      { q: "How much does the Warbonnet Blackbird XLC weigh?", a: "Between 19 and 29 oz, depending on fabric." },
      { q: "How long is the Blackbird XLC?", a: "11 ft long and 62 in wide, with a 112 in ridgeline." },
      { q: "Does the Blackbird XLC have a bug net?", a: "Yes, it's integrated and zips open." },
      { q: "What's the weight limit of the Blackbird XLC?", a: "From 300 lb up to 400 lb maximum, depending on fabric. Warbonnet lists lower comfort weights." },
      { q: "Is the Blackbird XLC good for side sleepers?", a: "Many side sleepers find it comfortable thanks to the footbox and flat lie, though it takes some practice." },
    ],
    sources: [
      {"label": "r/hammockcamping: five-year Blackbird XLC review", "url": "https://www.reddit.com/r/hammockcamping/comments/1kteod3/five_year_review_of_the_warbonnet_blackbird_xlc/"},
      {"label": "r/hammockcamping: owners on the Blackbird XLC", "url": "https://www.reddit.com/r/hammockcamping/comments/9rc0bq/looking_for_input_on_the_blackbird_xlc/"},
      {"label": "r/hammockcamping: Blackbird XLC zipper thread", "url": "https://www.reddit.com/r/hammockcamping/comments/np5dct/why_do_i_keep_breaking_my_blackbird_xlcs_zipper/"},
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
      {"id": "fit", "heading": "Sizing and fit", "paragraphs": ["[OutdoorGearLab](https://www.outdoorgearlab.com/reviews/shoes-and-boots/hiking-boots-men/keen-targhee-iv-mid) found the Targhee IV true to size in length, with a medium-width heel and midfoot and a wide toe box that's hard to lace tighter. If your forefoot is wide, you'll probably love it, and KEEN also makes a dedicated Wide fit. If your feet are narrow, you may struggle to feel locked in. A thicker wool sock or a heel-lock lacing pattern at the top eyelets can help, so bring your own hiking socks when you try them on. Our [boot fit guide](/guides/boot-fit) explains how to check fit.", "Owners at L.L.Bean and Zappos often say it's comfortable out of the box, while reviewers needed some time to sort out pressure points, so give yourself a few short walks before a big day. The footbed is fairly flat. If you need arch support, budget for an aftermarket insole and bring it along when you try the boots."]},
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
      {"id": "real-world", "heading": "Real-world use", "paragraphs": ["The Targhee IV is a traditional, sturdy boot. [Better Trail](https://bettertrail.com/outdoor-gear/keen-targhee-iv-mid-hiking-boot-review) found it secure, stable and very durable, but clunky next to lighter modern boots. It's at its best on rocky, rooty trails, muddy spring hikes and weekend backpacking with a moderate pack.", "Waterproofing is good for puddles, mud and short shallow crossings. An owner on [Trailspace](https://www.trailspace.com/gear/keen/targhee-iv-mid-waterproof-hiking-boot/) reported dry feet through mud and shallow creek crossings after about 100 miles. Reviewers note the tongue gusset sits fairly low, so water comes in over the top in deeper crossings. And like most leather waterproof boots, it gets hot: Better Trail's reviewer found their feet overheating once temperatures passed about 60°F.", "Traction is average. The same Trailspace owner found the soles slick when new, improving after some miles. On wet rock, slow down and place your feet deliberately."]},
      {"id": "durability", "heading": "Durability", "paragraphs": ["KEEN now fuses the sole to the upper instead of gluing it, and guarantees it won't delaminate. That's a real advantage, since sole separation was a common failure on older boots. The big rubber toe cap protects the front of the boot from rocks. Reviewers report little wear beyond scuffing after extended use."]},
    ],
    alternatives: [
      { href: "/best/hiking-boots-wide-feet", label: "Best hiking boots for wide feet", why: "Other options with room." },
      { href: "/compare/keen-vs-altra", label: "KEEN vs Altra", why: "Boot versus wide-toe trail runner." },
      { href: "/kits/wide-foot-weekend", label: "Wide foot weekend kit", why: "Gear chosen for wide feet." },
      { href: "/kits/blister-kit", label: "Blister kit", why: "Prevention while breaking them in." },
    ],
    faqs: [
      {"q": "Are KEEN Targhee IV boots heavy?", "a": "Yes, for a modern hiking boot. OutdoorGearLab weighed a men's size 11 pair at about 2.98 lb."},
      {"q": "Do KEEN Targhee IV soles come apart?", "a": "KEEN now uses a glue-free fused construction on the Targhee IV and guarantees the sole won't delaminate."},
      {"q": "Are KEEN Targhee IV boots good for narrow feet?", "a": "Usually not. The toe box is wide and hard to cinch down, so narrow feet can slide around."},
      { q: "Do KEEN Targhee IV boots run wide?", a: "They have a roomy toe box, and there's a dedicated Wide fit." },
      { q: "Are KEEN Targhee IV boots waterproof?", a: "Yes, with a KEEN.DRY membrane." },
      { q: "How long do KEEN Targhee boots take to break in?", a: "Most people need a few short walks before a long hike." },
      { q: "Are KEEN Targhee IV good for hiking?", a: "Yes, for day hikes and rough trail, especially if you have wide feet." },
      { q: "Do KEEN Targhee boots have good arch support?", a: "Support is modest. Many people add aftermarket insoles." },
    ],
    sources: [
      {"label": "Better Trail: KEEN Targhee IV Mid review", "url": "https://bettertrail.com/outdoor-gear/keen-targhee-iv-mid-hiking-boot-review"},
      {"label": "Trailspace: Targhee IV Mid WP owner reviews", "url": "https://www.trailspace.com/gear/keen/targhee-iv-mid-waterproof-hiking-boot/"},
      {"label": "L.L.Bean: Targhee IV Mid WP customer reviews", "url": "https://www.llbean.com/review/129497?page=mens-keen-targhee-iv-mid-waterproof-hiker-mens"},
      { label: "OutdoorGearLab: KEEN Targhee IV Mid review", url: "https://www.outdoorgearlab.com/reviews/shoes-and-boots/mens-hiking-boots/keen-targhee-iv-mid-waterproof" },
      { label: "Treeline Review: KEEN Targhee IV Mid review", url: "https://www.treelinereview.com/gearreviews/keen-targhee-iv-mid-review" },
      { label: "CleverHiker: KEEN Targhee IV review", url: "https://www.cleverhiker.com/gear/keen-targhee-iv-review" },
    ],
  },
];
