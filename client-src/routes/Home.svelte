<script>
  import Layout from "@/components/App/Layout.svelte";
  import Link from "@/router/Link.svelte";
</script>

<Layout title="Home">
  <div slot="header">Home</div>
  <div class="flex p-2 gap-2">
    <Link class="p-2 bg-pink-600 rounded" path="/snake">Snake game</Link>
  </div>
</Layout>
