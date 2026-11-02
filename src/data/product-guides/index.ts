import type { ProductGuide } from "./types";
import { packs } from "./packs";
import { tents } from "./tents";
import { sleep } from "./sleep";
import { misc } from "./misc";

const all: ProductGuide[] = [...packs, ...tents, ...sleep, ...misc];
const bySlug = new Map(all.map((g) => [g.slug, g]));

export function guideFor(slug: string): ProductGuide | undefined {
  return bySlug.get(slug);
}

export const guidedSlugs = all.map((g) => g.slug);
