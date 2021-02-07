<script>
  import Router from "@/router/Router.svelte";
  import Route from "@/router/Route.svelte";

  import Home from "@/routes/Home.svelte";
  import Snake from "@/routes/Snake.svelte";
</script>

<Router>
  <Route path="/" component="{Home}" />
  <Route path="/snake" component="{Snake}" />
</Router>
