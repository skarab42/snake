<script>
  import { getContext } from "svelte";
  import { ROUTER } from "./contexts";

  export let path;
  export let component;

  const { registerRoute, currentPath } = getContext(ROUTER);

  registerRoute({ path, component });

  let regexp = null;
  let props = {};
  let propNames = [];

  if (path.includes(":")) {
    regexp = path.replace(/\:([^\/]+)/g, `([^\/]+)`);
    regexp = regexp.replace(/\//g, "\\/");
    regexp = new RegExp(`^${regexp}$`);
    propNames = path.match(/\:([^\/]+)/g).map((p) => p.slice(1));
  }

  function match(currentPath) {
    if (regexp) {
      let matches = currentPath.match(regexp);
      if (matches) {
        matches = matches.slice(1, propNames.length + 1);
        props = Object.fromEntries(
          propNames.map((_, i) => [propNames[i], matches[i]])
        );
      }
      return matches;
    }
    return currentPath === path;
  }
</script>

{#if match($currentPath)}
  <svelte:component this="{component}" {...props} />
{/if}
