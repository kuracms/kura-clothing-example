// Client-side basket using Svelte 5 runes, persisted to localStorage.
// Demo-only - no real checkout, no payment, no inventory enforcement.

import { browser } from "$app/environment";

export interface BasketLine {
  slug: string;
  name: string;
  size: string;
  colour: string;
  price_gbp: number;
  photo: string;
  qty: number;
}

const STORAGE_KEY = "marlow.basket.v1";

function loadInitial(): BasketLine[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as BasketLine[];
  } catch {
    return [];
  }
}

function createBasket() {
  let lines = $state<BasketLine[]>(loadInitial());

  function persist() {
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable; basket simply won't persist.
    }
  }

  return {
    get lines() {
      return lines;
    },
    get count() {
      return lines.reduce((sum, l) => sum + l.qty, 0);
    },
    get total() {
      return lines.reduce((sum, l) => sum + l.qty * l.price_gbp, 0);
    },
    add(line: Omit<BasketLine, "qty">, qty = 1) {
      const idx = lines.findIndex(
        (l) => l.slug === line.slug && l.size === line.size && l.colour === line.colour,
      );
      if (idx >= 0) {
        lines[idx].qty += qty;
      } else {
        lines.push({ ...line, qty });
      }
      persist();
    },
    setQty(slug: string, size: string, colour: string, qty: number) {
      const idx = lines.findIndex((l) => l.slug === slug && l.size === size && l.colour === colour);
      if (idx < 0) return;
      if (qty <= 0) {
        lines.splice(idx, 1);
      } else {
        lines[idx].qty = qty;
      }
      persist();
    },
    remove(slug: string, size: string, colour: string) {
      const idx = lines.findIndex((l) => l.slug === slug && l.size === size && l.colour === colour);
      if (idx >= 0) {
        lines.splice(idx, 1);
        persist();
      }
    },
    clear() {
      lines.splice(0, lines.length);
      persist();
    },
  };
}

export const basket = createBasket();
