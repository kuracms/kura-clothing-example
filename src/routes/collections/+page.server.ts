import { fetchCollections } from "$lib/kura";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform }) => {
  const collections = await fetchCollections(fetch, platform);
  return { collections };
};
