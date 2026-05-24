<script lang="ts">
  import { basket } from "$lib/basket.svelte";
  import { formatUsd } from "$lib/kura";

  let placed = $state(false);

  function checkout() {
    placed = true;
    basket.clear();
  }
</script>

<svelte:head>
  <title>Basket - Marlow Clothing</title>
</svelte:head>

<section class="section">
  <div class="container">
    <p class="eyebrow">Basket</p>
    <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: 0.4rem 0 2rem;">Your basket</h1>

    {#if placed}
      <div class="basket-empty">
        <h2 style="font-size: 1.6rem;">Order placed</h2>
        <p style="color: var(--muted); max-width: 32rem; margin: 0.5rem auto 1.5rem;">
          This is a demo site - nothing was actually charged and nothing will ship.
          On a real Marlow checkout, you'd get a confirmation email here.
        </p>
        <a href="/shop" class="btn btn-ghost">Back to the shop</a>
      </div>
    {:else if basket.lines.length === 0}
      <div class="basket-empty">
        <p style="color: var(--muted); margin-bottom: 1.5rem;">Nothing in the basket yet.</p>
        <a href="/shop" class="btn">Browse the shop</a>
      </div>
    {:else}
      <div class="basket-grid">
        <div>
          {#each basket.lines as line (line.slug + line.size + line.colour)}
            <div class="basket-line">
              <a href="/products/{line.slug}" class="basket-thumb">
                <img src={line.photo} alt={line.name} />
              </a>
              <div>
                <p class="basket-line-name">{line.name}</p>
                <p class="basket-line-meta">{line.colour} - size {line.size}</p>
                <div class="basket-line-controls" style="margin-top: 0.6rem;">
                  <button
                    type="button"
                    class="qty-btn"
                    onclick={() => basket.setQty(line.slug, line.size, line.colour, line.qty - 1)}
                    aria-label="Decrease quantity"
                  >-</button>
                  <span data-testid="line-qty">{line.qty}</span>
                  <button
                    type="button"
                    class="qty-btn"
                    onclick={() => basket.setQty(line.slug, line.size, line.colour, line.qty + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                  <button
                    type="button"
                    onclick={() => basket.remove(line.slug, line.size, line.colour)}
                    style="background: none; border: 0; padding: 0; margin-left: 0.6rem; font-size: 0.78rem; color: var(--muted); cursor: pointer; text-decoration: underline; font-family: inherit;"
                  >Remove</button>
                </div>
              </div>
              <div style="font-weight: 500;">{formatUsd(line.price_usd * line.qty)}</div>
            </div>
          {/each}
        </div>

        <aside class="basket-summary">
          <h3 style="margin: 0 0 1.2rem; font-size: 1rem; letter-spacing: 0.05em; text-transform: uppercase;">Summary</h3>
          <div class="basket-summary-row">
            <span>Subtotal</span>
            <span>{formatUsd(basket.total)}</span>
          </div>
          <div class="basket-summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div class="basket-summary-row total">
            <span>Total</span>
            <span>{formatUsd(basket.total)}</span>
          </div>
          <button type="button" class="btn" style="width: 100%; margin-top: 1.2rem;" onclick={checkout}>
            Checkout
          </button>
          <p style="font-size: 0.75rem; color: var(--muted); margin: 1rem 0 0;">
            This is a demo. Pressing checkout will not charge or ship anything.
          </p>
        </aside>
      </div>
    {/if}
  </div>
</section>
