<script>
  import { getContext } from "svelte";
  import Inputs from "./Inputs.svelte";

  const { socket } = getContext("snake");

  let percent = 0;
  let stats = [];

  function onKeyDown({ detail }) {
    $socket.emit("keydown", detail);
  }

  function getTotal(actions) {
    return Object.values(actions).reduce((acc, val) => acc + val, 0);
  }

  function getPercent(value, total) {
    return Math.round((value / total) * 100);
  }

  $socket.on("tick", (data) => {
    percent = data.percent;
    stats = Object.entries(data.actions).map(([key, value]) => {
      return {
        key,
        value,
        percent: getPercent(value, getTotal(data.actions)),
      };
    });
  });

  $socket.on("action", (data) => {
    console.log("action:", data);
  });
</script>

<div class="relative bg-gray-600">
  <div class="h-6 bg-green-600" style="width:{percent}%"></div>
  <div class="absolute inset-0 flex gap-2 items-center justify-center">
    {#each stats as state}
      <div class="px-2 bg-pink-600 text-md rounded-lg">
        {state.key}
        {state.percent}%
      </div>
    {/each}
  </div>
</div>

<div class="p-2">
  <Inputs on:keydown="{onKeyDown}" />
</div>
