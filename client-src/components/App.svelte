<script>
  import Router from "@/router/Router.svelte";
  import Route from "@/router/Route.svelte";

  import Home from "@/routes/Home.svelte";
  import Snake from "@/routes/Snake.svelte";
  import SnakeOverlay from "@/routes/SnakeOverlay.svelte";
</script>

<Router>
  <Route path="/" component="{Home}" />
  <Route path="/snake" component="{Snake}" />
  <Route path="/snake-overlay" component="{SnakeOverlay}" />
</Router>
