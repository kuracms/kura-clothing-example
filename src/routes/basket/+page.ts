// Basket lives in the browser (localStorage + Svelte 5 runes) - render client-side
// so it doesn't render an empty server snapshot and then hydrate.
export const ssr = false;
