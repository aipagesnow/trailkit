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
  { id: "tents", label: "Tents", slugs: ["copper-spur-vs-x-mid"] },
  { id: "pads", label: "Pads", slugs: ["xlite-vs-tensor"] },
  { id: "footwear", label: "Footwear", slugs: ["keen-vs-altra"] },
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
  "trail-shoes": {
    href: "/best/trail-runners",
    label: "Best trail runners for hiking",
    note: "This page is the wide toe-box cut. The other list is the general trail-runner roundup.",
  },
  "trail-runners": {
    href: "/best/trail-shoes",
    label: "Best wide toe box trail shoes",
    note: "If the toe box is the constraint, use the wide toe-box page instead of this general list.",
  },
  "canister-stoves-picks": {
    href: "/best/camping-stoves",
    label: "Best camping stoves",
    note: "This page sorts canister stoves by job. The camping-stoves roundup includes liquid fuel and car-camp burners.",
  },
  "camping-stoves": {
    href: "/best/canister-stoves-picks",
    label: "Canister stoves by job",
    note: "If you already know you want a canister, the by-job page is the shorter list.",
  },
  "budget-rain-shells": {
    href: "/best/rain-jackets-under-150",
    label: "Best rain jackets under $150",
    note: "These are the cheaper backups. The under-$150 page is the jacket you hike in.",
  },
  "rain-jackets-under-150": {
    href: "/best/budget-rain-shells",
    label: "Cheap backup rain shells",
    note: "A spare emergency shell lives on the backup page, not in this under-$150 list.",
  },
};
