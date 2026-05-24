<script lang="ts">
  import "$lib/styles.css";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";

  let { children } = $props();
</script>

<div class="kura-demo-banner">
  <a href="https://kuracms.com" target="_blank" rel="noreferrer">
    This is a demonstration site for kura - see how it works at kuracms.com &rarr;
  </a>
</div>
<SiteHeader />
<main>
  {@render children?.()}
</main>
<SiteFooter />

<style>
  .kura-demo-banner {
    background: #111;
    color: #d9d9d9;
    text-align: center;
    padding: 0.45rem 1rem;
    font-size: 0.78rem;
    letter-spacing: 0.02em;
  }
  .kura-demo-banner a {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding-bottom: 1px;
  }
  .kura-demo-banner a:hover {
    border-bottom-color: #fff;
  }
</style>
