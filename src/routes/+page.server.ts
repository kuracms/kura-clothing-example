import { fetchPage, fetchProducts, fetchCollections } from "$lib/kura";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform }) => {
  const [page, products, collections] = await Promise.all([
    fetchPage(fetch, platform, "home"),
    fetchProducts(fetch, platform),
    fetchCollections(fetch, platform),
  ]);

  const newIn = products.filter((p) => p.new_in && p.in_stock).slice(0, 4);
  const feature = collections[0] ?? null;
  const featureProducts = feature ? products.filter((p) => p.in_stock).slice(0, 4) : [];

  return { page, newIn, feature, featureProducts };
};
