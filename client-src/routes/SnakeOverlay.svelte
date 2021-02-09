<script>
  import Connecting from "@/components/App/Connecting.svelte";
  import SnakeCanvas from "./Snake/Canvas.svelte";

  import { onDestroy, onMount, setContext } from "svelte";
  import { socket } from "./Snake/store";
  import io from "socket.io-client";

  let connected = false;

  setContext("snake", {
    socket,
  });

  onMount(() => {
    $socket = io("/snake");
    $socket.on("connect", () => (connected = true));
    $socket.on("disconnect", () => (connected = false));
  });

  onDestroy(() => {
    $socket.disconnect();
    $socket = null;
  });
</script>

{#if connected}
  <SnakeCanvas backgroundColor="transparent" />
{:else}
  <Connecting />
{/if}
