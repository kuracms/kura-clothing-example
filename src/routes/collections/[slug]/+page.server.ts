import { error } from "@sveltejs/kit";
import { fetchCollection, fetchProducts } from "$lib/kura";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform, params }) => {
  const [collection, products] = await Promise.all([
    fetchCollection(fetch, platform, params.slug),
    fetchProducts(fetch, platform),
  ]);
  if (!collection) throw error(404, "Collection not found");
  // No product->collection relation in the schema yet - show in-stock products.
  const collectionProducts = products.filter((p) => p.in_stock);
  return { collection, collectionProducts };
};
