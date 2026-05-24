<script lang="ts">
  import { renderMarkdown } from "$lib/kura";
  import ProductCard from "$lib/components/ProductCard.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.page?.title ?? "Marlow Clothing"}</title>
</svelte:head>

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">{data.page?.subtitle ?? "Small-batch British menswear"}</p>
      <h1>{data.page?.title ?? "Marlow Clothing"}</h1>
      <p class="hero-sub">
        Twelve pieces a season, made in small runs in Britain and Portugal.
        Cut to wear in, wash often, keep for years.
      </p>
      <div class="hero-actions">
        <a class="btn" href="/shop">Shop the season</a>
        <a class="btn btn-ghost" href="/collections">View collections</a>
      </div>
    </div>
    <div class="hero-photo">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80"
        alt="Folded knitwear and shirts in a daylit room"
        loading="eager"
      />
    </div>
  </div>
</section>

{#if data.page?.body}
  <section class="section-sm">
    <div class="container-narrow">
      <div class="prose">{@html renderMarkdown(data.page.body)}</div>
    </div>
  </section>
{/if}

{#if data.newIn.length}
  <section class="section" style="padding-top: 1rem;">
    <div class="container">
      <header class="section-head">
        <div>
          <p class="eyebrow">New in</p>
          <h2>Just landed</h2>
        </div>
        <a href="/shop" class="eyebrow" style="text-decoration: underline; text-underline-offset: 4px;">Shop all</a>
      </header>
      <div class="product-grid">
        {#each data.newIn as p (p.id)}
          <ProductCard product={p} />
        {/each}
      </div>
    </div>
  </section>
{/if}

{#if data.feature}
  <section class="section" style="background: var(--bg-soft);">
    <div class="container">
      <div class="coll-feature">
        <div class="coll-feature-photo">
          <img src={data.feature.hero_photo} alt={data.feature.name} loading="lazy" />
        </div>
        <div>
          <p class="eyebrow">Collection</p>
          <h2>{data.feature.name}</h2>
          {#if data.feature.subtitle}
            <p style="color: var(--muted); margin-top: -0.3rem;">{data.feature.subtitle}</p>
          {/if}
          <p style="color: var(--ink-soft); margin-top: 1rem;">{data.feature.intro}</p>
          <div style="margin-top: 1.4rem;">
            <a class="btn btn-ghost" href="/collections/{data.feature.slug}">See the collection</a>
          </div>
        </div>
      </div>

      {#if data.featureProducts.length}
        <div class="product-grid compact" style="margin-top: 3.5rem;">
          {#each data.featureProducts as p (p.id)}
            <ProductCard product={p} />
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}
