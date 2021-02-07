<script>
  import Layout from "@/components/App/Layout.svelte";
  import Link from "@/router/Link.svelte";
  import io from "socket.io-client";

  const socket = io();

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
</script>

<Layout title="Snake">
  <div slot="header">
    <Link path="/">Back to home</Link>
  </div>
  <div class="flex p-2 gap-2">...</div>
</Layout>
