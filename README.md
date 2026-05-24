# Marlow Clothing - kura demo (SvelteKit)

A small fictional British menswear label, served from a kura content backend
and rendered with SvelteKit 2 + Svelte 5 on Cloudflare Workers.

Live: <https://clothing.kuracms.com>

This is one of five demo sites that exercise the kura REST API from
different frontend stacks:

| Demo                | Stack       | URL                              |
| ------------------- | ----------- | -------------------------------- |
| Inaka Properties    | Astro       | property.kuracms.com             |
| The Bistro          | Next.js     | restaurant.kuracms.com           |
| The Sealed Room Co. | Hugo        | escape.kuracms.com               |
| Bloom Salon         | Nuxt 3      | salon.kuracms.com                |
| Marlow Clothing     | SvelteKit 2 | clothing.kuracms.com             |

## What this shows

- Reading typed content (`product`, `collection`, `page`) from the kura REST
  API with a public read-only token, server-side on the Cloudflare edge
- Markdown-rendered editorial pages (home, about, returns, privacy, terms)
- A client-side basket using Svelte 5 runes, persisted to `localStorage` -
  no real checkout, the "place order" button just confirms the demo

The token in `wrangler.jsonc` is a **public read-only** token tied to the
`clothing` kura project. It can list products, collections and pages -
nothing else.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
npx wrangler deploy
```

`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must be in your shell
environment.
