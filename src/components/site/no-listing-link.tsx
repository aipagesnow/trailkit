import { asinFor } from "@/data/asins";
import { alternativeFor } from "@/data/amazon-alternatives";
import type { Product } from "@/data/types";

/** Fills the gap AmazonButton leaves when a product has no verified listing and no alternative. */
export function NoListingLink({ product }: { product: Product }) {
  if (asinFor(product.slug) || alternativeFor(product.slug)) return null;
  return (
    <p className="mt-3 text-sm text-muted">
      Amazon listing not verified.{" "}
      <a href={`/products/${product.slug}`} className="font-bold text-forest underline">Read the {product.name} notes</a>
    </p>
  );
}
