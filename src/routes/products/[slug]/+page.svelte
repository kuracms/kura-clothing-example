<script lang="ts">
  import { formatGbp, parseSizes } from "$lib/kura";
  import { basket } from "$lib/basket.svelte";

  let { data } = $props();
  const p = $derived(data.product);
  const sizes = $derived(parseSizes(p.sizes));

  let selectedSize = $state<string>("");
  let message = $state<string>("");
  let messageKind = $state<"" | "success" | "error">("");

  function addToBasket() {
    if (sizes.length > 0 && !selectedSize) {
      message = "Choose a size first.";
      messageKind = "error";
      return;
    }
    basket.add({
      slug: p.slug,
      name: p.name,
      size: selectedSize || "-",
      colour: p.colour,
      price_gbp: p.price_gbp,
      photo: p.photo,
    });
    message = `Added to basket - ${p.name}${selectedSize ? ` (${selectedSize})` : ""}.`;
    messageKind = "success";
  }
</script>

<svelte:head>
  <title>{p.name} - Marlow Clothing</title>
</svelte:head>

<section class="container pdp">
  <div class="pdp-photo">
    <img src={p.photo} alt={p.name} />
  </div>
  <div class="pdp-info">
    <p class="eyebrow">{p.category}</p>
    <h1>{p.name}</h1>
    <p class="pdp-price">{formatGbp(p.price_gbp)}</p>
    <p class="pdp-desc">{p.description}</p>

    {#if sizes.length > 0}
      <div class="pdp-section">
        <div class="pdp-section-label">Size</div>
        <div class="size-chips">
          {#each sizes as s (s)}
            <button
              type="button"
              class="size-chip"
              class:active={selectedSize === s}
              onclick={() => (selectedSize = s)}
            >
              {s}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <div class="pdp-actions">
      <button
        type="button"
        class="btn"
        onclick={addToBasket}
        disabled={!p.in_stock}
        data-testid="add-to-basket"
      >
        {p.in_stock ? "Add to basket" : "Out of stock"}
      </button>
      <a class="btn btn-ghost" href="/basket">View basket</a>
    </div>
    <p class="pdp-msg {messageKind}" aria-live="polite">{message}</p>

    <div class="pdp-section">
      <div class="pdp-section-label">Details</div>
      <div class="pdp-meta">
        <span>Colour: {p.colour}</span>
        <span>SKU: {p.sku}</span>
      </div>
    </div>
  </div>
</section>
