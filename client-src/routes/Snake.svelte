<script>
  import BackLink from "@/components/App/BackLink.svelte";
  import Layout from "@/components/App/Layout.svelte";
  import Title from "@/components/App/Title.svelte";
  import io from "socket.io-client";

  let title = "Snake";

  const socket = io("/snake");

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
</script>

<Layout title="{title}">
  <div slot="header" class="flex items-center gap-2">
    <BackLink />
    <Title>{title}</Title>
  </div>
  <div class="flex p-2 gap-2">...</div>
</Layout>
