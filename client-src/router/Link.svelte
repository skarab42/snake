<script>
  import { getContext } from "svelte";
  import { ROUTER } from "./contexts";

  export let path;

  const { navigate } = getContext(ROUTER);

  function onClick(event) {
    event.preventDefault();
    navigate(path);
  }
</script>

<a href={path} on:click={onClick} {...$$restProps}>
  <slot />
</a>
