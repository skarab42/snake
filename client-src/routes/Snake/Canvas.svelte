<script>
  import {
    createEventDispatcher,
    getContext,
    onDestroy,
    onMount,
  } from "svelte";

  const { socket } = getContext("snake");
  const dispatch = createEventDispatcher();

  export let topOffset = 0;
  export let fontSize = 142;
  export let fontFamily = "Roboto";
  export let foodColor = "#e80d40";
  export let gameOverColor = "#e80d40";
  export let backgroundColor = "#111111";

  let snake = [];
  let food = null;
  let canvas = null;
  let context = null;
  let settings = null;
  let blockSize = null;
  let isGameOver = null;

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

    canvas.setAttribute("width", settings.width);
    canvas.setAttribute("height", settings.height);
    canvas.style.transformOrigin = `0 0`;
    canvas.style.transform = `scale(${scale})`;

    dispatch("resize", { top, left });
  }

  function clearScreen() {
    context.clearRect(0, 0, settings.width, settings.height);
  }

  function drawBackground() {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, settings.width, settings.height);
  }

  function shadow() {
    context.shadowColor = "black";
    context.shadowBlur = 4;
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
  }

  function drawSnake() {
    const div = Math.round(150 / snake.length);

    context.save();
    shadow();
    snake.forEach(({ x, y }, i) => {
      context.fillStyle = `black`;
      context.fillRect(x, y, blockSize, blockSize);
    });
    context.restore();

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
    context.fillStyle = foodColor;
    const halSize = blockSize / 2;
    context.save();
    shadow();
    context.beginPath();
    context.arc(
      food.x + halSize,
      food.y + halSize,
      halSize,
      0,
      Math.PI * 2,
      true
    );
    context.fill();
    context.restore();
  }

  function drawGameOver() {
    context.lineWidth = 4;
    context.strokeStyle = gameOverColor;
    context.strokeRect(0, 0, settings.width, settings.height);
    context.font = `${fontSize}px ${fontFamily}`;
    context.textAlign = "center";
    context.fillStyle = gameOverColor;
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

<canvas bind:this="{canvas}" class="absolute"></canvas>
