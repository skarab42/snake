<script>
  import Inputs from "./Inputs.svelte";
  import socket from "./libs/socket";

  function onKeyDown({ detail }) {
    socket.emit("keydown", detail);
  }
</script>

<Inputs on:keydown="{onKeyDown}" />
