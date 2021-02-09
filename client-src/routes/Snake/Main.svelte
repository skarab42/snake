<script>
  import ProgressBar from "./ProgressBar.svelte";
  import Canvas from "./Canvas.svelte";
  import Inputs from "./Inputs.svelte";
  import { getContext } from "svelte";

  const { socket } = getContext("snake");
  const isOverlay = location.search.slice(1) === "overlay";

  let topOffset = isOverlay ? 0 : 72;
  let inputs = { top: 0, left: 0 };

  function onKeyDown({ detail }) {
    $socket.emit("keydown", detail);
  }

  function onResize({ detail }) {
    inputs.top = detail.top + topOffset;
    inputs.left = detail.left;
  }
</script>

<ProgressBar />

<Canvas topOffset="{topOffset}" on:resize="{onResize}" />

<div
  class="absolute m-5 p-2 bg-gray-800 bg-opacity-25 rounded-lg"
  style="top:{inputs.top}px;left:{inputs.left}px"
>
  <Inputs on:keydown="{onKeyDown}" />
</div>
