<script>
  export let icon;

  export let size = "sm";

  const sizes = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  let sizeClass = sizes[size] || sizes.sm;
</script>

<span class="flex fill-current items-center inline-block {sizeClass}">
  <svelte:component this="{icon}" />
</span>
