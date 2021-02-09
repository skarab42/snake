<script>
  import Portal from "svelte-portal";

  export let top = 0;

  let content = "flex overflow-auto";
  let colors = "dark:text-gray-200 bg-black bg-opacity-50";
  let position = "absolute left-0 right-0 bottom-0 z-50";
</script>

<Portal target="body">
  <div
    on:click
    on:mousedown
    class="{content} {colors} {position}"
    style="margin-top:{top}px;height: calc(100% - {top}px)"
  >
    <slot />
  </div>
</Portal>
