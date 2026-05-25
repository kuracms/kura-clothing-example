// Read-only typed client for the kura public REST API.
// All endpoints are GET. Token comes from platform env (Cloudflare) at runtime,
// with a fallback to process.env for local dev.

import { marked } from "marked";

export interface KuraListResponse<T> {
  data: T[];
  meta: { count: number; limit: number; offset: number };
}

export type Category =
  | "tees"
  | "shirts"
  | "knitwear"
  | "trousers"
  | "denim"
  | "outerwear"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: Category;
  price_usd: number;
  description: string;
  sizes: string;
  colour: string;
  photo: string;
  in_stock: boolean;
  new_in: boolean;
  published?: boolean;
  published_at: string | null;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  intro: string;
  hero_photo: string;
  sort_order: number;
  published?: boolean;
  published_at: string | null;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  published?: boolean;
  published_at: string | null;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  tees: "Tees",
  shirts: "Shirts",
  knitwear: "Knitwear",
  trousers: "Trousers",
  denim: "Denim",
  outerwear: "Outerwear",
  accessories: "Accessories",
};

export const CATEGORY_ORDER: Category[] = [
  "tees",
  "shirts",
  "knitwear",
  "trousers",
  "denim",
  "outerwear",
  "accessories",
];

interface KuraEnv {
  baseUrl: string;
  project: string;
  token: string;
}

function envFromPlatform(platform: App.Platform | undefined): KuraEnv {
  const env = platform?.env ?? {};
  const fallback = (typeof process !== "undefined" ? process.env : {}) as Record<
    string,
    string | undefined
  >;
  return {
    baseUrl: env.KURA_BASE_URL ?? fallback.KURA_BASE_URL ?? "https://kuracms.com",
    project: env.KURA_PROJECT ?? fallback.KURA_PROJECT ?? "clothing",
    token: env.KURA_TOKEN ?? fallback.KURA_TOKEN ?? "",
  };
}

async function kuraFetch<T>(
  fetchFn: typeof fetch,
  platform: App.Platform | undefined,
  path: string,
): Promise<T> {
  const cfg = envFromPlatform(platform);
  const url = `${cfg.baseUrl}/api/v1/${cfg.project}${path}`;
  const res = await fetchFn(url, {
    headers: { Authorization: `Bearer ${cfg.token}` },
  });
  if (!res.ok) {
    throw new Error(`kura fetch failed ${res.status} for ${path}`);
  }
  return (await res.json()) as T;
}

export async function fetchProducts(
  fetchFn: typeof fetch,
  platform: App.Platform | undefined,
): Promise<Product[]> {
  const r = await kuraFetch<KuraListResponse<Product>>(fetchFn, platform, `/product?limit=100`);
  return r.data.filter((p) => p.published !== false);
}

export async function fetchProduct(
  fetchFn: typeof fetch,
  platform: App.Platform | undefined,
  slug: string,
): Promise<Product | null> {
  const all = await fetchProducts(fetchFn, platform);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function fetchCollections(
  fetchFn: typeof fetch,
  platform: App.Platform | undefined,
): Promise<Collection[]> {
  const r = await kuraFetch<KuraListResponse<Collection>>(
    fetchFn,
    platform,
    `/collection?limit=50`,
  );
  return r.data.filter((c) => c.published !== false).sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchCollection(
  fetchFn: typeof fetch,
  platform: App.Platform | undefined,
  slug: string,
): Promise<Collection | null> {
  const all = await fetchCollections(fetchFn, platform);
  return all.find((c) => c.slug === slug) ?? null;
}

export async function fetchPage(
  fetchFn: typeof fetch,
  platform: App.Platform | undefined,
  slug: string,
): Promise<Page | null> {
  const r = await kuraFetch<KuraListResponse<Page>>(fetchFn, platform, `/global?limit=20`);
  return r.data.find((p) => p.slug === slug && p.published !== false) ?? null;
}

export function renderMarkdown(md: string): string {
  if (!md) return "";
  return marked.parse(md, { async: false }) as string;
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function parseSizes(s: string): string[] {
  if (!s) return [];
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}
