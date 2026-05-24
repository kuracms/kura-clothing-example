import { error } from "@sveltejs/kit";
import { fetchPage } from "$lib/kura";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, platform }) => {
  const page = await fetchPage(fetch, platform, "returns");
  if (!page) throw error(404, "Page not found");
  return { page };
};
