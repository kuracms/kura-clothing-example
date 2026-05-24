<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Collections - Marlow Clothing</title>
</svelte:head>

<section class="section">
  <div class="container">
    <header style="margin-bottom: 3rem;">
      <p class="eyebrow">Collections</p>
      <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: 0.5rem 0 0;">By season and intent</h1>
    </header>

    <div class="coll-list">
      {#each data.collections as c (c.id)}
        <article class="coll-row">
          <div class="coll-feature-photo">
            <img src={c.hero_photo} alt={c.name} loading="lazy" />
          </div>
          <div>
            <p class="eyebrow">{c.subtitle ?? "Collection"}</p>
            <h2 style="margin: 0.4rem 0 0.8rem;">{c.name}</h2>
            <p style="color: var(--ink-soft);">{c.intro}</p>
            <div style="margin-top: 1.4rem;">
              <a class="btn btn-ghost" href="/collections/{c.slug}">See the pieces</a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
