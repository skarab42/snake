<script>
  import { name, version } from "../../../package";
  import ThemeSwitch from "./ThemeSwitch.svelte";

  export let title;
</script>

<svelte:head>
  <title>{title} - {name} v{version}-alpha</title>
</svelte:head>

<header class="flex p-2">
  <div class="flex-auto">
    <slot />
  </div>
  <ThemeSwitch />
</header>
