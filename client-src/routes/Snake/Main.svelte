<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import ProgressBar from "./ProgressBar.svelte";
  import Inputs from "./Inputs.svelte";

  const { socket } = getContext("snake");

  let snake = [];
  let food = null;
  let canvas = null;
  let context = null;
  let topOffset = 72;
  let settings = null;
  let blockSize = null;
  let isGameOver = null;

  let inputs = { top: 0, left: 0 };

  let redColor = "#e80d40";
  let backgroundColor = "#111111";

  function onKeyDown({ detail }) {
    $socket.emit("keydown", detail);
  }

  function setSize() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight - topOffset;
    const wRatio = maxWidth / settings.width;
    const hRatio = maxHeight / settings.height;
    const scale = Math.min(wRatio, hRatio);

    const top = (maxHeight - settings.height * scale) / 2;
    const left = (maxWidth - settings.width * scale) / 2;

    canvas.style.top = `${topOffset + top}px`;
    canvas.style.left = `${left}px`;

    inputs.top = top + topOffset;
    inputs.left = left;

    canvas.setAttribute("width", settings.width);
    canvas.setAttribute("height", settings.height);
    canvas.style.transformOrigin = `0 0`;
    canvas.style.transform = `scale(${scale})`;
  }

  function clearScreen() {
    context.clearRect(0, 0, settings.width, settings.height);
  }

  function drawBackground() {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, settings.width, settings.height);
  }

  function drawSnake() {
    const div = Math.round(150 / snake.length);
    snake.forEach(({ x, y }, i) => {
      context.lineWidth = 1;
      context.strokeStyle = `rgba(0,0,0,0.2)`;
      context.fillStyle = `rgb(20,${250 - div * (i + 1)},20)`;
      context.fillRect(x, y, blockSize, blockSize);
      context.strokeRect(x, y, blockSize, blockSize);
    });
  }

  function drawFood() {
    if (!food) return;
    context.lineWidth = 1;
    context.fillStyle = redColor;
    context.strokeStyle = `rgba(0,0,0,0.2)`;
    context.fillRect(food.x, food.y, blockSize, blockSize);
    context.strokeRect(food.x, food.y, blockSize, blockSize);
  }

  function drawGameOver() {
    context.lineWidth = 4;
    context.strokeStyle = redColor;
    context.strokeRect(0, 0, settings.width, settings.height);
    context.font = "142px Roboto";
    context.textAlign = "center";
    context.fillStyle = redColor;
    context.fillText(
      "Game Over!",
      settings.width / 2,
      settings.height / 2,
      settings.width - 100
    );
  }

  function draw() {
    if (isGameOver) {
      return drawGameOver();
    }
    clearScreen();
    drawBackground();
    drawSnake();
    drawFood();
  }

  function emitPromise(...args) {
    return new Promise((resolve) => {
      $socket.emit(...args, (data) => {
        resolve(data);
      });
    });
  }

  function onResize() {
    setSize();
    draw();
  }

  async function init() {
    settings = await emitPromise("getSettings");
    context = canvas.getContext("2d");
    isGameOver = settings.isGameOver;
    blockSize = settings.blockSize;
    snake = settings.snake;
    food = settings.food;
    onResize();
  }

  onMount(async () => {
    await init();
    window.addEventListener("resize", onResize);
    $socket.on("action", (data) => {
      isGameOver = data.isGameOver;
      snake = data.snake;
      food = data.food;
      draw();
    });
  });

  onDestroy(() => {
    window.removeEventListener("resize", onResize);
  });
</script>

<ProgressBar />

<canvas bind:this="{canvas}" class="absolute"></canvas>

<div
  class="absolute m-5 p-2 bg-gray-800 bg-opacity-25 rounded-lg"
  style="top:{inputs.top}px;left:{inputs.left}px"
>
  <Inputs on:keydown="{onKeyDown}" />
</div>
