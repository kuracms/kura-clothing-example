<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.collection.name} - Marlow Clothing</title>
</svelte:head>

<section style="padding: 0;">
  <div style="aspect-ratio: 21 / 9; overflow: hidden; background: var(--bg-soft);">
    <img
      src={data.collection.hero_photo}
      alt={data.collection.name}
      style="width: 100%; height: 100%; object-fit: cover;"
      loading="eager"
    />
  </div>
</section>

<section class="section-sm">
  <div class="container-narrow">
    <p class="eyebrow">{data.collection.subtitle ?? "Collection"}</p>
    <h1 style="margin: 0.4rem 0 1rem;">{data.collection.name}</h1>
    <p style="color: var(--ink-soft); font-size: 1.05rem;">{data.collection.intro}</p>
    <div class="callout">
      Showing all in-stock pieces. Per-collection tagging lands in the next
      kura schema update - this page will then show only the pieces tagged to
      {data.collection.name}.
    </div>
  </div>
</section>

<section class="section" style="padding-top: 1rem;">
  <div class="container">
    <div class="product-grid">
      {#each data.collectionProducts as p (p.id)}
        <ProductCard product={p} />
      {/each}
    </div>
  </div>
</section>
