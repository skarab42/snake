<script>
  import Connecting from "@/components/App/Connecting.svelte";
  import BackLink from "@/components/App/BackLink.svelte";
  import Layout from "@/components/App/Layout.svelte";
  import Title from "@/components/App/Title.svelte";
  import Main from "./Snake/Main.svelte";

  import { onDestroy, onMount, setContext } from "svelte";
  import { socket } from "./Snake/store";
  import io from "socket.io-client";

  setContext("snake", {
    socket,
  });

  onMount(() => {
    $socket = io("/snake");
    $socket.on("connect", () => (component = Main));
    $socket.on("disconnect", () => (component = Connecting));
  });

  onDestroy(() => {
    $socket.disconnect();
    $socket = null;
  });

  let title = "Snake";
  let component = Connecting;
</script>

<Layout title="{title}">
  <div slot="header" class="flex items-center gap-2">
    <BackLink />
    <Title>{title}</Title>
  </div>
  <svelte:component this="{component}" />
</Layout>
