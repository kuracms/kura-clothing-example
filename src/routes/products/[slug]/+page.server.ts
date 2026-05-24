import { error } from "@sveltejs/kit";
import { fetchProduct } from "$lib/kura";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform, params }) => {
  const product = await fetchProduct(fetch, platform, params.slug);
  if (!product) throw error(404, "Product not found");
  return { product };
};
