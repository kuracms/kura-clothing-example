<script lang="ts">
  import ContentPage from "$lib/components/ContentPage.svelte";
  let { data } = $props();
</script>

<svelte:head><title>{data.page.title} - Marlow Clothing</title></svelte:head>
<ContentPage page={data.page} />
