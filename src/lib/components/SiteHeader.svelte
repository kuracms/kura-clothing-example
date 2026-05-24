<script lang="ts">
  import { page } from "$app/stores";
  import { basket } from "$lib/basket.svelte";

  function isActive(prefix: string): boolean {
    const path = $page.url.pathname;
    if (prefix === "/") return path === "/";
    return path === prefix || path.startsWith(prefix + "/");
  }
</script>

<header class="hdr">
  <div class="hdr-inner">
    <a class="hdr-brand" href="/">
      <span class="brand-mark">marlow</span>
    </a>
    <nav class="hdr-nav">
      <a href="/shop" class:active={isActive("/shop") || isActive("/products")}>Shop</a>
      <a href="/collections" class:active={isActive("/collections")}>Collections</a>
      <a href="/about" class:active={isActive("/about")}>About</a>
      <a class="hdr-basket" href="/basket" aria-label="Basket">
        Basket
        <span class="count" data-testid="basket-count">{basket.count}</span>
      </a>
    </nav>
  </div>
</header>
