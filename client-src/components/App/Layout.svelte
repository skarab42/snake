<script>
  import Header from "@/components/App/Header.svelte";

  export let title = null;
</script>

<div class="h-screen bg-gray-200 dark:bg-gray-900 dark:text-gray-200">
  <Header title="{title}">
    <slot name="header" />
  </Header>
  <slot />
</div>
