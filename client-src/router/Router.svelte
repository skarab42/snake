<script context="module">
  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  import { ROUTER } from "./contexts";

  const routes = writable([]);
  const currentPath = writable("/");

  function registerRoute({ path, component } = {}) {
    routes.update((state) => [...state, { path, component }]);
  }

  export function navigate(path, { state = {}, replace = false } = {}) {
    try {
      window.history[replace ? "replaceState" : "pushState"](state, null, path);
    } catch (e) {
      window.location[replace ? "replace" : "assign"](path);
    }

    currentPath.set(path);
  }

  currentPath.set(window.location.pathname);

  window.addEventListener("popstate", (event) => {
    currentPath.set(window.location.pathname);
  });
</script>

<script>
  setContext(ROUTER, {
    registerRoute,
    currentPath,
    navigate,
  });
</script>

<slot />
