/** Hub section order from IMAGE-LAYOUT-MAP. Unknown slugs are skipped at render. */

export const BEST_SECTIONS: { id: string; label: string; slugs: string[] }[] = [
  { id: "shelters", label: "Shelters", slugs: ["backpacking-tents", "ultralight-tents", "budget-tents", "solo-tents"] },
  { id: "sleep", label: "Sleep", slugs: ["sleeping-bags", "cold-sleepers"] },
  { id: "pads", label: "Pads", slugs: ["sleeping-pads"] },
  { id: "footwear", label: "Footwear", slugs: ["hiking-boots-wide-feet", "trail-runners", "trail-shoes"] },
  { id: "packs", label: "Packs", slugs: ["backpacking-packs", "daypacks", "budget-backpacks", "womens-packs", "ultralight-packs"] },
  { id: "rain", label: "Rain", slugs: ["rain-jackets-under-150", "budget-rain-shells"] },
  { id: "kitchen", label: "Kitchen", slugs: ["camping-stoves"] },
  { id: "lighting", label: "Lighting", slugs: ["headlamps"] },
  { id: "water", label: "Water", slugs: ["water-filters", "water-carry"] },
  { id: "layers", label: "Layers", slugs: ["down-jackets"] },
  { id: "poles", label: "Poles", slugs: ["trekking-poles"] },
  { id: "car", label: "Car camp", slugs: ["car-camping-gear", "camp-comfort"] },
  { id: "budget", label: "Budget", slugs: ["budget-under-50"] },
  { id: "planning", label: "Planning", slugs: ["first-overnight-gear"] },
  { id: "hammocks", label: "Hammocks", slugs: ["hammocks"] },
  { id: "socks", label: "Socks", slugs: ["hiking-socks"] },
  { id: "base", label: "Base layers", slugs: ["base-layers"] },
  { id: "aid", label: "First aid", slugs: ["first-aid"] },
  { id: "cook", label: "Cookware", slugs: ["bear-storage", "cook-pots"] },
  { id: "traction", label: "Traction", slugs: ["microspikes"] },
  { id: "family", label: "Family", slugs: ["family-camping"] },
  { id: "stoves", label: "Stoves", slugs: ["canister-stoves-picks"] },
  { id: "nav", label: "Navigation", slugs: ["navigation-gear"] },
];

export const GUIDE_SECTIONS: { id: string; label: string; slugs: string[] }[] = [
  { id: "planning", label: "Planning", slugs: ["first-overnight", "base-weight"] },
  { id: "sleep", label: "Sleep", slugs: ["choose-a-pad", "quilt-vs-bag", "wash-down"] },
  { id: "shelters", label: "Shelters", slugs: ["ultralight-shelter", "three-vs-four-season", "tent-condensation"] },
  { id: "kitchen", label: "Kitchen", slugs: ["car-camping-kitchen", "canister-vs-liquid", "stove-safety"] },
  { id: "layers", label: "Layers", slugs: ["layering", "shoulder-season"] },
  { id: "footwear", label: "Footwear", slugs: ["boot-fit"] },
  { id: "water", label: "Water", slugs: ["water-treatment", "how-much-water", "desert-water"] },
  { id: "packs", label: "Packs", slugs: ["pack-fit"] },
  { id: "habits", label: "Habits", slugs: ["leave-no-trace-camp"] },
  { id: "feet", label: "Feet", slugs: ["blister-care"] },
  { id: "hammocks", label: "Hammocks", slugs: ["hammock-setup"] },
  { id: "food", label: "Food", slugs: ["bear-canister-packing"] },
  { id: "nav", label: "Navigation", slugs: ["read-a-topo"] },
  { id: "family", label: "Family", slugs: ["kids-first-trip"] },
  { id: "camp", label: "Camp", slugs: ["cathole"] },
];

export const KIT_SECTIONS: { id: string; label: string; slugs: string[] }[] = [
  { id: "backpacking", label: "Backpacking", slugs: ["fair-weekend", "light-and-dry", "cold-sleeper-kit", "wide-foot-weekend", "rainy-weekend", "bear-country", "hot-weather", "hammock-weekend"] },
  { id: "day", label: "Day hikes", slugs: ["day-hike", "desert-day", "winter-day"] },
  { id: "car", label: "Car and family", slugs: ["car-camp-weekend", "family-weekend"] },
  { id: "small", label: "Small kits", slugs: ["blister-kit"] },
];

export const COMPARE_SECTIONS: { id: string; label: string; slugs: string[] }[] = [
  { id: "illustrative", label: "Illustrative", slugs: ["osprey-vs-gregory"] },
  { id: "tents", label: "Tents", slugs: ["copper-spur-vs-x-mid", "copper-spur-vs-dragonfly"] },
  { id: "pads", label: "Pads", slugs: ["xlite-vs-tensor", "xlite-vs-xtherm"] },
  { id: "footwear", label: "Footwear", slugs: ["keen-vs-altra", "speedgoat-vs-lone-peak"] },
  { id: "stoves", label: "Stoves", slugs: ["windmaster-vs-pocketrocket"] },
  { id: "water", label: "Water", slugs: ["sawyer-vs-katadyn"] },
  { id: "lights", label: "Lights", slugs: ["actik-vs-spot"] },
  { id: "rain", label: "Rain", slugs: ["helium-vs-rainier"] },
  { id: "shelters", label: "Shelters", slugs: ["xmid1-vs-protrail"] },
  { id: "packs", label: "Packs", slugs: ["aura-vs-deva", "flash-vs-crown", "mariposa-vs-southwest"] },
  { id: "socks", label: "Socks", slugs: ["darn-tough-vs-smartwool"] },
  { id: "traction", label: "Traction", slugs: ["microspikes-vs-yaktrax"] },
  { id: "food", label: "Food storage", slugs: ["bv500-vs-ursack"] },
  { id: "layers", label: "Layers", slugs: ["synthetic-vs-merino", "r1-vs-atom"] },
  { id: "cook", label: "Cookware", slugs: ["toaks-vs-halulite"] },
  { id: "family", label: "Family", slugs: ["kingdom-vs-sundome"] },
  { id: "hammocks", label: "Hammocks", slugs: ["eno-vs-blackbird"] },
];

export const LEARN_SECTIONS: { id: string; label: string; slugs: string[] }[] = [
  { id: "sleep", label: "Sleep", slugs: ["r-value", "iso-rating", "fill-power", "quilt-drafts", "hollow-fiber"] },
  { id: "shelter", label: "Shelter", slugs: ["freestanding", "vestibule", "double-wall", "three-season-gear", "seam-sealing"] },
  { id: "rain", label: "Rain and layers", slugs: ["dwr", "hydrostatic-head", "pit-zips", "active-static"] },
  { id: "footwear", label: "Footwear", slugs: ["heel-drop", "wide-last", "camp-shoes"] },
  { id: "packs", label: "Packs", slugs: ["torso-length", "hipbelt", "big-three", "pack-liner"] },
  { id: "water", label: "Water and food", slugs: ["electrolytes", "food-miles", "bear-hang", "alcohol-rules", "wag-bag"] },
  { id: "nav", label: "Navigation and rules", slugs: ["declination", "headlamp-modes"] },
];

export const INTENT_PAIRS: Record<string, { href: string; label: string; note: string }> = {
  "backpacking-tents": {
    href: "/best/budget-tents",
    label: "Best budget backpacking tents",
    note: "If price comes first, the budget page keeps every pick in the Budget to Mid price bands.",
  },
  "budget-tents": {
    href: "/best/backpacking-tents",
    label: "Best backpacking tents",
    note: "If weight or wet-weather performance matters more than price, the main page has the lighter Upper mid tents.",
  },
  "rain-jackets-under-150": {
    href: "/best/budget-rain-shells",
    label: "Best cheap rain jackets for backup and short hikes",
    note: "If you only need a spare for the car or a cheap jacket for short hikes, use the backup page.",
  },
  "budget-rain-shells": {
    href: "/best/rain-jackets-under-150",
    label: "Best rain jackets under $150",
    note: "These are spares and short-trip jackets. For a jacket you hike in all day, use the under-$150 page.",
  },
  "trail-runners": {
    href: "/best/trail-shoes",
    label: "Best wide toe box trail shoes",
    note: "If your toes need room, the wide toe-box page covers the Altra Lone Peak and the Topo Ultraventure.",
  },
  "trail-shoes": {
    href: "/best/trail-runners",
    label: "Best trail runners for hiking",
    note: "This page is only for wide and foot-shaped toe boxes. For cushion, rocky trail, or a low hiking shoe, use the general list.",
  },
  "camping-stoves": {
    href: "/best/canister-stoves-picks",
    label: "Best canister stoves for backpacking",
    note: "If you backpack in three seasons and already know you want a canister stove, use the backpacking page.",
  },
  "canister-stoves-picks": {
    href: "/best/camping-stoves",
    label: "Best camping stoves",
    note: "This page covers light canister stoves for backpacking. For car camping, liquid fuel in the cold, or a boil system, use the camping stoves page.",
  },
  "hiking-boots-wide-feet": {
    href: "/best/trail-shoes",
    label: "Best wide toe box trail shoes",
    note: "This page is boots only. If your ankles are fine and you want a wide or foot-shaped trail shoe, use the shoe page.",
  },
  "ultralight-tents": {
    href: "/best/backpacking-tents",
    label: "Best backpacking tents",
    note: "If you want one tent that stands on its own on platforms and rock, the main page has the freestanding picks.",
  },
  "car-camping-gear": {
    href: "/best/camp-comfort",
    label: "Best car camping comfort gear",
    note: "Once the stove, cooler and wash bins are sorted, the comfort page covers the table, cot, pillow and coffee.",
  },
  "camp-comfort": {
    href: "/best/car-camping-gear",
    label: "Best car camping gear",
    note: "These are upgrades. If you still need the stove, the cooler and a dish setup, start with the basics page.",
  },
  "backpacking-packs": {
    href: "/best/ultralight-packs",
    label: "Best ultralight backpacks",
    note: "This page is multi-day framed packs. If your kit is already light, the ultralight page covers Mariposa, Southwest, Kakwa and Exos.",
  },
  "ultralight-packs": {
    href: "/best/backpacking-packs",
    label: "Best backpacking packs",
    note: "These packs need a dialed kit. For a first multi-day framed pack, use the main packs page.",
  },
  "daypacks": {
    href: "/best/first-overnight-gear",
    label: "Best gear for a first overnight",
    note: "This page is day and long-day packs. For a rain shell and the rest of a first overnight kit, use the first overnight page.",
  },
  "first-overnight-gear": {
    href: "/best/backpacking-tents",
    label: "Best backpacking tents",
    note: "The Half Dome is the beginner tent here. Lighter freestanding and pole tents are on the main tents page.",
  },
  "cold-sleepers": {
    href: "/best/sleeping-pads",
    label: "Best sleeping pads",
    note: "The XTherm is the cold pad on this page. Three-season pads and wide options are on the main pads page.",
  },
  "sleeping-pads": {
    href: "/best/cold-sleepers",
    label: "Best gear for cold sleepers",
    note: "High R-value pads for cold sleepers are on the cold sleepers page.",
  },
  "sleeping-bags": {
    href: "/best/cold-sleepers",
    label: "Best gear for cold sleepers",
    note: "If you sleep cold, the cold sleepers page pairs a warmer bag with a high-R pad and a hooded layer.",
  },
};
