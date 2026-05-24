<script lang="ts">
  import { CATEGORY_LABELS, CATEGORY_ORDER, type Category, type Product } from "$lib/kura";
  import ProductCard from "$lib/components/ProductCard.svelte";

  let { data } = $props();

  let active = $state<Category | "all">("all");

  const visible = $derived.by<Product[]>(() => {
    const filtered = active === "all"
      ? data.products
      : data.products.filter((p: Product) => p.category === active);
    // In-stock first, then OOS at the end. Inside each group, keep API order.
    const inStock = filtered.filter((p: Product) => p.in_stock);
    const out = filtered.filter((p: Product) => !p.in_stock);
    return [...inStock, ...out];
  });

  const categoriesWithCounts = $derived.by(() => {
    const out: Array<{ key: Category | "all"; label: string; count: number }> = [
      { key: "all", label: "All", count: data.products.length },
    ];
    for (const c of CATEGORY_ORDER) {
      const count = data.products.filter((p: Product) => p.category === c).length;
      if (count > 0) out.push({ key: c, label: CATEGORY_LABELS[c], count });
    }
    return out;
  });
</script>

<svelte:head>
  <title>Shop - Marlow Clothing</title>
</svelte:head>

<section class="section">
  <div class="container">
    <header style="margin-bottom: 2rem;">
      <p class="eyebrow">Shop</p>
      <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: 0.5rem 0 0.4rem;">All pieces</h1>
      <p style="color: var(--muted); max-width: 36rem;">
        The full range, in and out of stock. Out-of-stock pieces typically return in 4-6 weeks.
      </p>
    </header>

    <div class="filter-bar">
      {#each categoriesWithCounts as c (c.key)}
        <button
          class="filter-chip"
          class:active={active === c.key}
          onclick={() => (active = c.key)}
          type="button"
        >
          {c.label} <span style="opacity: 0.5; margin-left: 0.3rem;">{c.count}</span>
        </button>
      {/each}
    </div>

    {#if visible.length === 0}
      <p style="color: var(--muted);">Nothing in this category right now.</p>
    {:else}
      <div class="product-grid">
        {#each visible as p (p.id)}
          <ProductCard product={p} />
        {/each}
      </div>
    {/if}
  </div>
</section>
