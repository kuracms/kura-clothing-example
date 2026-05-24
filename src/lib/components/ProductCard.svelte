<script lang="ts">
  import { formatUsd, type Product } from "$lib/kura";

  let { product }: { product: Product } = $props();
</script>

<a class="p-card" href="/products/{product.slug}">
  <div class="p-card-photo">
    <img src={product.photo} alt={product.name} loading="lazy" />
    {#if product.new_in && product.in_stock}
      <span class="p-card-tag">New in</span>
    {:else if !product.in_stock}
      <span class="p-card-tag oos">Out of stock</span>
    {/if}
  </div>
  <div class="p-card-body">
    <div>
      <p class="p-card-name">{product.name}</p>
      <p class="p-card-meta">{product.colour}</p>
    </div>
    <div class="p-card-price">{formatUsd(product.price_usd)}</div>
  </div>
</a>
