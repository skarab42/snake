<script>
  import Connecting from "@/components/App/Connecting.svelte";
  import BackLink from "@/components/App/BackLink.svelte";
  import Layout from "@/components/App/Layout.svelte";
  import Title from "@/components/App/Title.svelte";
  import socket from "./Snake/libs/socket";
  import Main from "./Snake/Main.svelte";

  let title = "Snake";
  let component = Connecting;

  socket.on("connect", () => (component = Main));
  socket.on("disconnect", () => (component = Connecting));
</script>

<Layout title="{title}">
  <div slot="header" class="flex items-center gap-2">
    <BackLink />
    <Title>{title}</Title>
  </div>
  <svelte:component this="{component}" />
</Layout>
