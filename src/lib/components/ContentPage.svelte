<script lang="ts">
  import { renderMarkdown, type Page } from "$lib/kura";

  let { page }: { page: Page } = $props();
</script>

<section class="section">
  <div class="container-narrow">
    <p class="eyebrow">{page.subtitle ?? ""}</p>
    <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: 0.5rem 0 1.5rem;">{page.title}</h1>
    <div class="prose">{@html renderMarkdown(page.body)}</div>
  </div>
</section>
