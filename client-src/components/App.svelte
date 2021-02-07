<script>
  import Header from "./App/Header.svelte";
  import io from "socket.io-client";

  const socket = io();

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
</script>

<div class="h-screen bg-gray-200 dark:bg-gray-900 dark:text-gray-200">
  <Header />
</div>
