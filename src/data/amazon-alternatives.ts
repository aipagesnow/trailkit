import { asinFor } from "@/data/asins";

export type AmazonAlternative = {
  asin: string;
  name: string;
  short: string;
  reason: string;
  productSlug?: string;
};

/** Closest amazon.com listing for a product that has no verified ASIN of its own. */
export const AMAZON_ALTERNATIVES: Record<string, AmazonAlternative> = {
  "magma-15": {
    asin: "B0DK7Q5GXR",
    name: "NEMO Disco 15 Down Sleeping Bag",
    short: "NEMO Disco 15",
    productSlug: "nemo-disco-15",
    reason: "A 650-fill down backpacking bag from NEMO that comes in a 15°F version, the same rating as the Magma 15. Choose the 15°F option on the listing.",
  },
  "half-dome-2-plus": {
    asin: "B0754SP75F",
    name: "Marmot Crane Creek 2P Tent",
    short: "Marmot Crane Creek",
    reason: "A freestanding, double-wall two-person tent from Marmot in a similar price band. The listing also sells a 3P size and footprints, so check which one you are buying.",
  },
  helium: {
    asin: "B0CMS33YXX",
    name: "Marmot PreCip Eco Rain Jacket (men's)",
    short: "Marmot PreCip Eco",
    reason: "A lightweight waterproof rain shell in the same price band as the Helium. The standard Helium is not listed on amazon.com, and the Helium UL that is listed costs more.",
  },
  rainier: {
    asin: "B0CLR98667",
    name: "Columbia Watertight II Rain Jacket (men's)",
    short: "Columbia Watertight II",
    productSlug: "columbia-watertight",
    reason: "A budget waterproof rain jacket from Columbia in the same lower price band as the Rainier.",
  },
  "magma-hoody": {
    asin: "B0DKM5JXNJ",
    name: "Mountain Hardwear Ghost Whisperer Hoody",
    short: "Ghost Whisperer Hoody",
    reason: "An 800-fill ultralight down hoody that does the same job as the Magma Hooded Down. The price on the listing varies by color.",
  },
  "capilene-cool": {
    asin: "B09QMSZCWS",
    name: "Outdoor Research Echo T-Shirt (men's)",
    short: "OR Echo T-Shirt",
    reason: "A lightweight synthetic hiking tee from Outdoor Research, made for the same hot-weather use and sold at a similar price.",
  },
  "kingdom-6": {
    asin: "B0GDJ48QGR",
    name: "Kelty Wireless 6-Person Camping Tent",
    short: "Kelty Wireless",
    reason: "A freestanding family camping tent from Kelty, sold in 2-, 4- and 6-person sizes. Choose the 6-person size. It sits in a lower price band than the Kingdom 6.",
  },
  mariposa: {
    asin: "B0DS6MSDF2",
    name: "Osprey Exos 58 Ultralight Backpack (men's)",
    short: "Osprey Exos 58",
    productSlug: "exos-58",
    reason: "A widely sold ultralight pack of about 58 liters in a similar price band to the Mariposa.",
  },
  protrail: {
    asin: "B01839LMRY",
    name: "Six Moon Designs Lunar Solo Tent",
    short: "Lunar Solo",
    productSlug: "lunar-solo",
    reason: "A single-wall solo shelter that pitches with one trekking pole, the same basic design as the Protrail. Six Moon Designs lists it at about 26 oz.",
  },
  "rei-trail-40": {
    asin: "B09JXJVNMH",
    name: "Osprey Stratos 36 Hiking Backpack (men's)",
    short: "Osprey Stratos 36",
    reason: "A ventilated-back hiking pack from Osprey for day hikes and light overnights. At 36 liters it is a little smaller than the Trail 40.",
  },
  "kakwa-55": {
    asin: "B09RZL96JG",
    name: "Granite Gear Crown3 60 Backpack",
    short: "Crown3 60",
    productSlug: "crown-60",
    reason: "A light 60-liter framed pack with a removable frame sheet. Granite Gear lists the regular size at 2.4 lb without the lid.",
  },
  "blackbird-xlc": {
    asin: "B081S8JPP1",
    name: "ENO JungleNest Hammock",
    short: "ENO JungleNest",
    reason: "A camping hammock from ENO with a built-in bug net. It is a gathered-end hammock, so it does not have the Blackbird's foot box.",
  },
  "flash-55": {
    asin: "B0C62JBRN2",
    name: "Osprey Rook 65 Backpack (men's)",
    short: "Osprey Rook 65",
    reason: "A framed backpacking pack from Osprey in about the same price band as the Flash 55. At 65 liters it is larger, so it suits a bulkier kit.",
  },
  "ursack-major": {
    asin: "B07YL9HPVX",
    name: "Ursack Major XL Bear Bag",
    short: "Ursack Major XL",
    reason: "The same brand's bear-resistant sack in the larger XL size. The standard Major is not listed on amazon.com.",
  },
  halulite: {
    asin: "B0BW4X8F28",
    name: "GSI Outdoors Halulite Dualist Cook Set",
    short: "GSI Halulite Dualist",
    reason: "A two-person cook set built around the same hard-anodized Halulite pot, with mugs included. It has more pieces than the Boiler on its own, so it weighs more.",
  },
  "icebreaker-175": {
    asin: "B078W73B2D",
    name: "Icebreaker Oasis 200 Long Sleeve Crewe",
    short: "Icebreaker Oasis 200",
    reason: "The long-sleeve crew from the same Icebreaker Oasis merino line in the next weight up (200), so it is a little warmer than the 175 tee.",
  },
  "ee-revelation": {
    asin: "B07PFFTL9Q",
    name: "Sea to Summit Ember Down Quilt",
    short: "Sea to Summit Ember",
    reason: "An ultralight down backpacking quilt from Sea to Summit. It sits in a higher price band than the Revelation.",
  },
  tikkid: {
    asin: "B0F2XZVDJ3",
    name: "Black Diamond Wiz Kid Rechargeable Headlamp",
    short: "Black Diamond Wiz Kid",
    reason: "A rechargeable headlamp for kids from Black Diamond, in a similar price band to the Tikkid.",
  },
  kindercone: {
    asin: "B0DT2533X2",
    name: "Kelty Mistral Kids 20 Sleeping Bag",
    short: "Kelty Mistral Kids 20",
    reason: "A kids' synthetic sleeping bag from Kelty with a 20°F rating.",
  },
  superfly: {
    asin: "B07D9631QR",
    name: "Kammok Kuhli Weatherproof Shelter",
    short: "Kammok Kuhli",
    reason: "A hammock rain tarp from Kammok in a similar price band. If closable doors matter to you, check its shape on the listing.",
  },
  "amk-mountain": {
    asin: "B07PFYNRBC",
    name: "Adventure Medical Kits Sportsman 200 Medical Kit",
    short: "AMK Sportsman 200",
    reason: "A larger first-aid kit from the same maker, sized for groups and multi-day backcountry trips.",
  },
  "bd-distance-carbon": {
    asin: "B09N7WM9CH",
    name: "Black Diamond Distance Z Trekking Poles",
    short: "BD Distance Z",
    reason: "The same Black Diamond folding Z-pole design with aluminum shafts. It is a little heavier than the carbon version.",
  },
  "bd-trail-ergo": {
    asin: "B08R5LWC9C",
    name: "Black Diamond Trail Trekking Poles",
    short: "BD Trail",
    reason: "The standard pole in the same Black Diamond Trail family, without the Trail Ergo's angled cork grip.",
  },
  "biolite-330": {
    asin: "B09NQK87MN",
    name: "Black Diamond Spot 400-R Headlamp",
    short: "Spot 400-R",
    productSlug: "spot-400",
    reason: "A rechargeable 400-lumen hiking headlamp in a similar price band. The HeadLamp 330 is no longer listed on amazon.com.",
  },
  "camp-cot": {
    asin: "B01N5LIUID",
    name: "Coleman Trailhead Easy-Step Folding Cot",
    short: "Coleman Trailhead",
    reason: "A folding car-camping cot from Coleman in a lower price band.",
  },
  hummingbird: {
    asin: "B09KNWPL2K",
    name: "ENO SingleNest Hammock",
    short: "ENO SingleNest",
    reason: "A lightweight single camping hammock from ENO. It weighs more than the Hummingbird Single+.",
  },
  "nano-puff": {
    asin: "B0CLRBRZHS",
    name: "Columbia Powder Lite II Jacket (men's)",
    short: "Columbia Powder Lite II",
    reason: "A light synthetic-insulated jacket from Columbia that costs less than the Nano Puff.",
  },
  "rei-merino-185": {
    asin: "B083QBTD85",
    name: "Smartwool Classic Thermal Merino Crew (men's)",
    short: "Smartwool Classic Thermal",
    reason: "A merino crew base layer from Smartwool in a heavier thermal weight, so it is warmer and usually costs more than the REI layer.",
  },
  "trestles-eco-30": {
    asin: "B01IO4GC14",
    name: "Marmot Trestles 30 Sleeping Bag",
    short: "Marmot Trestles 30",
    reason: "The previous generation of the same Marmot Trestles 30 synthetic bag, with the same 30°F rating.",
  },
  "echo-hoodie": {
    asin: "B0DTM4DSD6",
    name: "Outdoor Research Astroman Air Sun Hoodie (men's)",
    short: "OR Astroman Air",
    reason: "A hooded sun shirt from Outdoor Research. The men's Echo Hoody is not listed on amazon.com, so this is the closest hooded option from the same brand.",
  },
  "sun-hoodie": {
    asin: "B0DTM4DSD6",
    name: "Outdoor Research Astroman Air Sun Hoodie (men's)",
    short: "OR Astroman Air",
    reason: "A hooded sun shirt from Outdoor Research. The men's Echo Sun Hoodie is not listed on amazon.com, so this is the closest hooded option from the same brand.",
  },
  "alcohol-stove": {
    asin: "B00S4OJJ4W",
    name: "TOAKS Titanium Siphon Alcohol Stove",
    short: "TOAKS Siphon Stove",
    reason: "TOAKS's titanium siphon burner, listed at about 0.7 oz, a little heavier than the open stove. The pot stand and windscreen are sold separately.",
  },
  "rei-passage-2": {
    asin: "B0CSDZGZPR",
    name: "Kelty Late Start 2P Backpacking Tent",
    short: "Kelty Late Start 2P",
    reason: "A budget freestanding two-person tent from Kelty at about 4.7 lb, in the same low price band. It has one door, where the Passage 2 has two.",
  },
  "siesta-25": {
    asin: "B01IO4GC14",
    name: "Marmot Trestles 30 Synthetic Sleeping Bag",
    short: "Marmot Trestles 30",
    reason: "A synthetic mummy bag from Marmot in a similar price band. It is rated 30°F, a little less warm than the Siesta 25, so cold sleepers should add a layer.",
  },
  "trailmade-fleece": {
    asin: "B09KMKDGHJ",
    name: "Columbia Steens Mountain Full Zip 2.0 Fleece (men's)",
    short: "Columbia Steens Mountain",
    reason: "A basic full-zip fleece in the same low price band, for cool mornings and layering under a rain jacket.",
  },
  liteflex: {
    asin: "B00BZYX3P4",
    name: "EuroSCHIRM Swing Liteflex Trekking Umbrella",
    short: "EuroSCHIRM Swing Liteflex",
    reason: "The trekking umbrella from EuroSCHIRM, the maker of the Liteflex design. Like the Liteflex, it is a sun and light-rain tool, not a storm tool.",
  },
  "tarn-18": {
    asin: "B0D4QYPBYP",
    name: "Osprey Jet 18 Kids' Hiking Backpack",
    short: "Osprey Jet 18",
    reason: "An 18-liter kids' day pack from Osprey for ages 5 to 13, about the same size and weight as the Tarn 18.",
  },
};

export function alternativeFor(slug: string): AmazonAlternative | undefined {
  if (asinFor(slug)) return undefined;
  return AMAZON_ALTERNATIVES[slug];
}
