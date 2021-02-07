<script>
  import Layout from "@/components/App/Layout.svelte";
  import Title from "@/components/App/Title.svelte";
  import Link from "@/router/Link.svelte";

  let title = "Home";
</script>

<Layout title="{title}">
  <div slot="header">
    <Title>{title}</Title>
  </div>
  <div class="flex p-2 gap-2">
    <Link class="p-2 bg-pink-600 rounded" path="/snake">Snake game</Link>
  </div>
</Layout>
