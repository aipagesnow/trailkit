/**
 * Verified amazon.com ASINs (US). Tag is applied in affiliate.ts from AMAZON_ASSOCIATE_TAG.
 * Unlisted slugs are TODO — do not fall back to /s?k= search URLs or yourtag-20.
 *
 * Not on amazon.com (direct-only or REI house brand): aquamira, blackbird-xlc, camp-cot, capilene-cool, capilene-thermal, double-rainbow, down-hugger, dutchware-chameleon, echo-hoodie, ee-revelation, enigma-20, flash-55, half-dome-2-plus, hg-econ, hmg-southwest, hummingbird, kakwa-55, kindercone, kingdom-6, liteflex, magma-15, magma-30, magma-hoody, mariposa, nano-puff, plasma-1000, protrail, r1-air, rainier, rei-merino-185, rei-passage-2, rei-trail-40, siesta-25, summit-loft, sun-hoodie, superfly, tarn-18, trailmade-fleece, ula-circuit, versalite, x-mid-1, x-mid-2, zpacks-duplex.
 *
 * Unsure — listing not confirmed, left unlinked: alcohol-stove, amk-mountain, ascendant, bd-distance-carbon, bd-trail-ergo, bedrock-cairn, biolite-330, exped-dura, halulite, helium, icebreaker-175, komperdell-c3, mongoose, prolite, renegade-wide, steripen, sts-spark, tikkid, trails-illustrated, trek-tk, trestles-eco-30, ursack-major.
 */
export const ASINS: Record<string, string> = {
  "hubba-hubba-2": "B00G7H9CAY",
  "atmos-ag-65": "B09JXQDZG5",
  "baltoro-65": "B09GX9K3R9",
  "targhee-iv": "B0CNHWTRVM",
  "lone-peak": "B0CQVNG7RH",
  precip: "B0CMRX1SY1",
  torrentshell: "B0G631B8BF",
  "xlite-nxt": "B0BKFLTM3T",
  "actik-core": "B09X9PHB9W",
  /** Men's Speedgoat 6 Wide, amazon.com. */
  speedgoat: "B0CP3S2FBZ",
  /** Men's StormLine Stretch rain shell. Listing has been unavailable. */
  stormline: "B0C446S2QQ",
  // --- Oct 6, 2026 amazon.com lookup batch (exact + likely matches) ---
  /** Sea to Summit Aeros Ultralight Inflatable Pillow, Regular. Likely match: Aeros Ultralight Regular (Premium B003Z22QNY is a neck pillow variant) */
  "aeros-pillow": "B07PCSHKFQ",
  /** Deuter Aircontact Core 60+ 10L Technical Backpacking Pack. Likely match: men's color variant listing; women's SL B09MZSYSYL */
  aircontact: "B0GMYVRKRX",
  /** Western Mountaineering Alpinlite Sleeping Bag: 20F Down, 6ft 6in/Left Zip. */
  alpinlite: "B015I5TTLW",
  /** ENO Atlas Suspension System - Tree Strap for Hammock. */
  "atlas-straps": "B07S6CPK13",
  /** Arc'teryx Atom Hoody Women's Lightweight Insulated Jacket. Likely match: only women's listing surfaced */
  "atom-hoody": "B0D5C4VNMB",
  /** Osprey Aura AG 65L Women's Backpacking Backpack, Red WM-L. */
  "aura-65": "B09JXJVDRT",
  /** BLACK DIAMOND Storm 500-R Headlamp, Rechargeable. */
  "bd-storm": "B0GT6LRNP7",
  /** Katadyn BeFree. */
  befree: "B0DT9J7MBC",
  /** Petzl Bindi Headlamp - Ultra-Compact Rechargeable 200 Lumens - Black. */
  bindi: "B076ZTCLJQ",
  /** BRS Stove BRS 3000T Titanium Ultralight Backpacking Stove. */
  "brs-3000": "B083CWHB9B",
  /** BearVault Canister for Backpacking - BV500 Journey XL. */
  bv500: "B0019LSGQE",
  /** Crocs Unisex-Adult Classic Clog. Likely match: generic 'classic clog'; picked Crocs Classic Clog */
  "camp-clog": "B0014C0LUC",
  /** ALPS Mountaineering Aluminum Roll-Top Camp Table. Likely match: no product literally named 'Dining Table'; ALPS standard roll-top camp table */
  "camp-table": "B09Q79K76X",
  /** Cascade Mountain Tech Lightweight Aircraft-Grade Aluminum Trekking Poles. Likely match: several near-identical listings */
  "cmt-aluminum": "B088P9Z562",
  /** Cascade Mountain Tech Trekking Poles - Carbon Fiber. Likely match: several near-identical listings */
  "cmt-carbon": "B07DYKZD7X",
  /** Vecto Water Collection and Filtration Bag (2L, 3L) - 28mm Neck. Likely match: CNOC Vecto (Vesper not checked); brand-named 42mm alt B07R3F24LV */
  "cnoc-vesper": "B07QBQ894L",
  /** Coleman Triton 2-Burner Propane Stove. Likely match: generic name; picked Coleman's standard current 2-burner (Triton) */
  "coleman-2burner": "B09HN1C1YJ",
  /** Columbia Men's Watertight II Rain Jacket. */
  "columbia-watertight": "B0CLR98667",
  /** Sea to Summit Comfort Plus XT Extra-Thick Insulated Air Mattress, Large. Likely match: name 'Comfort Plus' -> Comfort Plus XT insulated mat; price not shown */
  "comfort-plus": "B084SQ9Y5K",
  /** Big Agnes Copper Spur UL2. */
  "copper-spur-ul2": "B08175941C",
  /** Outdoor Research Men's Crocodile Gaiters. */
  crocodile: "B0D6P6LZXS",
  /** Darn Tough Vermont Men's Hiker Midweight Micro Crew Sock. */
  "darn-tough-hiker": "B01AITV95C",
  /** Darn Tough Vermont Men's Light Hiker Micro Crew Lightweight Hiking Socks. */
  "darn-tough-light": "B07N1TYCSN",
  /** TheTentLab DirtSaw Deuce #2 - .6 oz Ultralight Backpacking Trowel, Black. Likely match: Deuce of Spades now sold as 'DirtSaw Deuce #2' */
  deuce: "B0G62VS9MF",
  /** NEMO Dragonfly OSMO 2P. */
  "dragonfly-osmo-2": "B0BMTGHJH4",
  /** Sea to Summit Ultra-SIL Dry Bag, 13 Liter, Highrise Grey. Likely match: generic '10-liter dry bag'; Sea to Summit Ultra-Sil has no 10L size (8L B0BXBM457W / 13L picked); no featured price */
  "dry-bag": "B0BZ9MBH3G",
  /** ENO DoubleNest Lightweight Camping Hammock, 1 to 2 Person, Special Edition. Likely match: organic result is a special-edition colorway listing */
  "eno-doublenest": "B0G165VMX2",
  /** Sea to Summit Ether Light XT Extra-Thick Insulated Sleeping Pad, Tapered - Small. */
  "ether-light": "B085HCHXP1",
  /** Garmin eTrex 22x Rugged Handheld GPS Navigator. Likely match: name offers 22x or 32x; picked 22x (32x is B07RR6GZWP $299.99) */
  etrex: "B07RTD2PMT",
  /** Osprey Exos 58 Men's Ultralight Backpacking Backpack. */
  "exos-58": "B0DS6MSDF2",
  /** Exped Ultra - Ultralight Inflatable Backpacking Sleeping Pad. Likely match: Ultra family listing (1R/3R/5R variants not distinguished) */
  "exped-ultra": "B0GLXLLGQ8",
  /** FROGG TOGGS Men's Ultra-Lite2 Rain Suit. Likely match: current Ultra-Lite2 suit, men's */
  "frogg-toggs": "B07VZH1GSG",
  /** Mountain Hardwear Ghost Whisperer Hoody. Likely match: hoody version; several listings/prices (B0DKM84Y6G $193.78) */
  "ghost-whisperer": "B0CLFZ816X",
  /** Grayl GeoPress. */
  grayl: "B09256L6JT",
  /** MSR Groundhog Tent Stake Kit. */
  groundhog: "B006ZC5KLG",
  /** South to East Mosquito Head Net for Insects 2 Pack. Likely match: generic item; top organic listing */
  "head-net": "B0CQ8G97L2",
  /** Helinox Chair One Lightweight Portable Collapsible Camping Chair. */
  "helinox-chair": "B007ZGOWZQ",
  /** Hillsound Trail Crampon Ice Cleat Traction System. */
  hillsound: "B004BNF2UU",
  /** Garmin inReach Mini 2, Satellite Communicator, Orange. */
  "inreach-mini": "B09PSKG7C3",
  /** Jetboil Flash 1.0L Fast Boil Stove for Camping and Backpacking, Carbon. */
  "jetboil-flash": "B0DXQCVVYB",
  /** Kelty Cosmic 20 Down Mummy Sleeping Bag. */
  "kelty-cosmic-20": "B0CSPKCJZK",
  /** Kelty Low Loveseat 2 Person Double Camping Chair (Low Height/Dark Shadow). Likely match: 'Lowdown' name now used for 3-person couch (B0DQLXQKKB); loveseat = Kelty Low Loveseat */
  "kelty-loveseat": "B08X9FK4RB",
  /** Klymit STATIC V Sleeping Pad. */
  "klymit-static": "B085D7WXT2",
  /** LEKI Makalu Trekking Poles Aluminum. */
  "leki-makalu": "B0F63JTC65",
  /** Leukotape P Adhesive Strapping Tape 1.5 in. */
  leukotape: "B000E59HXC",
  /** Lodge Pre-Seasoned Cast Iron Skillet, 12 Inches. Likely match: generic name; Lodge standard 12in skillet; price not shown */
  "lodge-skillet": "B00006JSUB",
  /** MSR Titan Ultralight Titanium Long Spoon. Likely match: generic name; picked branded MSR long-handled titanium spoon */
  "long-spoon": "B0CL8HRXGG",
  /** MPOWERD Luci Lux: Solar Inflatable Lantern. Likely match: generic 'Luci'; picked the core inflatable lantern; price not shown */
  "luci-lantern": "B076JSCMPG",
  /** Six Moon Designs Lunar Solo. */
  "lunar-solo": "B01839LMRY",
  /** Kahtoola MICROspikes Footwear Traction for Winter, Snow & Ice. */
  microspikes: "B00RXXKM50",
  /** Jetboil MiniMo Camping and Backpacking Stove Cooking System. */
  minimo: "B019GPK24I",
  /** Merrell Men's Moab 3 Mid Waterproof Hiking Boots. Likely match: men's; Wide width is a size option on listing, not verified */
  "moab-3-wide": "B0987WW3WJ",
  /** MSR Tents Elixir 2. */
  "msr-elixir-2": "B0DN3RSZC8",
  /** MSR Reactor Windproof Camping and Backpacking Stove System. */
  "msr-reactor": "B0DD8MJL1W",
  /** MSR Evo Ascent Backcountry & Mountaineering Snowshoes, 22 Inch Pair. */
  "msr-snowshoe": "B012VPH77K",
  /** Nalgene 32 oz Wide Mouth Water Bottle, Baby Blue. */
  "nalgene-1l": "B0CVNCHMFM",
  /** Nitecore NB10000 Gen 4 Ultralight 10000mAh Power Bank, Carbon. Likely match: several NB10000 Gen 3/4 listings, mostly 3rd-party; price not shown */
  nb10000: "B0C31G41RT",
  /** 100% Merino Wool Neck Gaiter, 17.5um, Unisex. Likely match: generic item; top organic listing (unbranded) */
  "neck-gaiter": "B08D113DXR",
  /** NEMO Equipment Disco Down Sleeping Bag Men's & Women's, Spoon Shape. Likely match: Disco family listing; 15F temp/length child not verified */
  "nemo-disco-15": "B0DK7Q5GXR",
  /** NEMO Equipment Hornet OSMO Backpacking Tent - Birch Bud/Goodnight Gray - 2P. */
  "nemo-hornet-2": "B0DF394QCP",
  /** Supmedic Medical Soft Max Nitrile Exam Gloves Powder-Free 100 Ct. Likely match: generic item; site's 'pair in a bag' has no brand - common organic box listing */
  "nitrile-gloves": "B0C9S5PMSD",
  /** Nitecore NU25 UL 400 Lumens Ultra Lightweight Headlamp, USB-C. */
  nu25: "B0FGFQM41T",
  /** Nuun Sport Electrolyte Tablets, Watermelon, 8 Pack. */
  nuun: "B018NZJBTY",
  /** Oboz Men's Bridger Mid B-DRY Waterproof Leather Hiking Boots. */
  "oboz-bridger": "B00FJ2LH88",
  /** LOKSAK OPSAK Odor Proof Dry Bags. */
  opsak: "B00UTK957K",
  /** Outdoor Research Men's Foray 3L Jacket. */
  "or-foray": "B0GLJY6XML",
  /** GSI Outdoors Percolator Coffee Pot - Enamelware. */
  percolator: "B000690JTC",
  /** MSR PocketRocket Deluxe Ultralight Camping and Backpacking Stove. */
  pocketrocket: "B07L5S65HR",
  /** Princeton Tec Remix 450 Lumen LED Headlamp. */
  "princeton-remix": "B09T9DJ8NP",
  /** Salomon Quest 4 GTX. */
  "quest-4": "B08LGNWN48",
  /** Platypus QuickDraw. */
  quickdraw: "B0CL81RLMH",
  /** Rab Men's Microlight Alpine Down Jacket 700-Fill. */
  "rab-microlight": "B08CK7RP94",
  /** YETI Tundra 45 Cooler. Likely match: generic '45 qt class rotomolded'; picked category standard YETI Tundra 45 (budget alt Landworks 45QT B07N7TL324) */
  "rotomold-cooler": "B001COUOYK",
  /** Rumpl Original Puffy 1-Person Blanket, Dusk Fade. Likely match: generic; Rumpl Original Puffy is brand's standard */
  rumpl: "B0DXMBV6RG",
  /** Sam Splint, 36", Orange & Blue. */
  "sam-splint": "B001J5H92C",
  /** Sawyer Squeeze. */
  "sawyer-squeeze": "B0DTJK394Q",
  /** SEALSKINZ Unisex Waterproof All Weather Mid Length Sock. Likely match: generic name; picked Sealskinz standard All Weather sock */
  sealskinz: "B07R5QBW35",
  /** HydraPak Seeker Collapsible Camping Water Storage (2L, Mammoth Grey). */
  "seeker-2l": "B08NX82XZB",
  /** Smartwool Men's Hike Classic Edition Light Cushion Crew Socks. Likely match: sponsored placement (organic alt: unisex Second Cut B0F867VHCV) */
  "smartwool-hike": "B0C7CV2Z5M",
  /** SOTO Amicus Backpacking Stove & Pot. */
  "soto-amicus": "B07YCVXWQY",
  /** BLACK DIAMOND Spot 400-R Headlamp, Rechargeable, Graphite. */
  "spot-400": "B09NQK87MN",
  /** Coleman Sundome Camping Tent with Rainfly - 4 Person. */
  "sundome-4": "B0D7QN9S9Q",
  /** SUUNTO M-3 Compass. */
  "suunto-m3": "B018YEE8WO",
  /** Osprey Talon 22L Men's Lightweight Hiking Backpack, Green. */
  "talon-22": "B0DSCN3TZC",
  /** GEAR AID Tenacious Tape 3" x 20" Nylon Fabric Repair, Gray, 1 Roll. */
  "tenacious-tape": "B0CNV232SR",
  /** Big Agnes Tiger Wall UL - Ultralight Backpacking Tent, 2 Person. */
  "tiger-wall-ul2": "B0DSSRW83Q",
  /** MSR Titan Ultralight Titanium Camping Kettle. */
  "titan-kettle": "B0CL8353KL",
  /** TOAKS Titanium 750ml Pot with Bail Handle. */
  "toaks-750": "B00EZIKUJY",
  /** Topo Athletic Men's Ultraventure 4 Trail Running Shoes. Likely match: current gen (Ultraventure 4), men's; women's B0D7P2DNMJ */
  "topo-ultraventure": "B0D7P23Q8W",
  /** Danner Trail 2650 Hiking Shoes for Men. */
  "trail-2650": "B0D5BR8VKR",
  /** MSR TrailShot. */
  trailshot: "B01N7GC9Z6",
  /** La Sportiva Mens Ultra Raptor 3 Low Hiking Shoe. Likely match: current gen Ultra Raptor 3, men's low; Mid GTX B0FDSTZ9RS */
  "ultra-raptor": "B0FDSZ75PR",
  /** 3 Pack Collapsible Wash Basin Set for Kitchen, Dishing, Laundry & Camping. Likely match: generic item; unbranded 3-pack organic listing */
  "wash-bins": "B0BZPCDS1M",
  /** MSR WhisperLite Compact Camping and Backpacking Stove. */
  whisperlite: "B0CQRWV98J",
  /** Fox 40 Classic CMG w/Breakaway Lanyard 3 Pack. Likely match: generic name; Fox 40 Classic is the standard pealess whistle (3-pack) */
  whistle: "B07MTK16ND",
  /** SOTO WindMaster Backpacking Stove with 4Flex. */
  windmaster: "B07R7BZCB3",
  /** Western Mountaineering Ultralite 20 Degree Down Sleeping Bag. */
  "wm-ultralite": "B0178QPZDA",
  /** Salomon X Ultra 5 GTX. Likely match: current gen X Ultra 5 GTX; Wide width not verified */
  "x-ultra-wide": "B0D827QLJF",
  /** Therm-a-Rest NeoAir Xlite NXT Sleeping Pad, Regular Wide. */
  "xlite-wide": "B0CS4LQ1WM",
  /** Therm-a-Rest NeoAir XTherm NXT Ultralight Sleeping Pad. */
  xtherm: "B0CS4P19QQ",
  /** Yaktrax Run Traction Cleats for Running on Snow and Ice. */
  yaktrax: "B007S3QY16",
  /** Therm-a-Rest Z Lite Sol Camping and Backpacking Sleeping Pad. */
  "z-lite": "B005I6R0WC",
  /** NEMO Tensor All-Season Sleeping Pad. */
  "nemo-tensor": "B0CS6587Z1",
  /** Injinji Liner Crew Toesocks. */
  "injinji-liner": "B0B8F35Q3M",
  /** Granite Gear Crown 3 Backpack, listing offers the 60 L size. */
  "crown-60": "B09RZL96JG",
  // --- Oct 6, 2026 second amazon.com lookup batch (exact matches) ---
  /** Adventure Medical Kits Ultralight/Watertight Medical Kit .5. Sold by Pattern, ships from Amazon. */
  "amk-ul-5": "B0DV6PDY9R",
  /** NEMO Tensor Trail Sleeping Pad, Regular Wide. Sold by NEMO Equipment. */
  "tensor-wide": "B0CS6HCCCK",
  /** Gregory Deva 60L Women's Backpacking Pack, Small, Mountain Teal. Sold by Gregory Mountain Products. */
  "deva-60": "B0GHZJK75J",
};

export function asinFor(slug: string) {
  return ASINS[slug];
}
