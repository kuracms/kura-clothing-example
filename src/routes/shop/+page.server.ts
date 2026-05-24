import { fetchProducts } from "$lib/kura";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform }) => {
  const products = await fetchProducts(fetch, platform);
  return { products };
};
