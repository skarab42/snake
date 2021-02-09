<script>
  import { getContext } from "svelte";
  import Inputs from "./Inputs.svelte";

  const { socket } = getContext("snake");

  let percent = 0;

  function onKeyDown({ detail }) {
    $socket.emit("keydown", detail);
  }

  $socket.on("tick", (data) => {
    percent = data.percent;
  });

  $socket.on("action", (data) => {
    console.log(data);
  });
</script>

<div class="bg-gray-600">
  <div class="h-6 bg-green-600" style="width:{percent}%"></div>
</div>

<div class="p-2">
  <Inputs on:keydown="{onKeyDown}" />
</div>
