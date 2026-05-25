import { error } from "@sveltejs/kit";
import { fetchCollection, fetchProducts, type Product } from "$lib/kura";
import type { PageServerLoad } from "./$types";

// Schema doesn't have a product->collection relation yet - each collection
// slug has a hand-coded predicate. When the relation lands, replace this map.
const COLLECTION_PREDICATES: Record<string, (p: Product) => boolean> = {
  aw26: (p) => p.new_in === true,
  workwear: (p) => ["trousers", "denim", "outerwear"].includes(p.category),
  knitwear: (p) => p.category === "knitwear",
};

export const load: PageServerLoad = async ({ fetch, platform, params }) => {
  const [collection, products] = await Promise.all([
    fetchCollection(fetch, platform, params.slug),
    fetchProducts(fetch, platform),
  ]);
  if (!collection) throw error(404, "Collection not found");
  const predicate = COLLECTION_PREDICATES[params.slug] ?? (() => true);
  const collectionProducts = products.filter((p) => p.in_stock && predicate(p));
  return { collection, collectionProducts };
};
