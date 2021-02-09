const logger = require("../logger");
const io = require("../socket/io");

let ticks = 0;
let division = 10;
let interval = 1000;
let deleyBetweenGame = 5000;

let snake = [];
let food = null;

let action = "up";
let actions = {};

let width = 1920;
let height = 1080;
let blockSize = 40;

let cols = width / blockSize;
let rows = height / blockSize;

let isGameOver = false;
let lastNeckPos = null;
let lastTailPos = null;

let snakeIO = null;
let clientsCount = 0;
let tickIntervalId = null;

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isSameCoords(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function isOutOfBound() {
  const { x, y } = snake[0];

  return x < 0 || y < 0 || x > width - blockSize || y > height - blockSize;
}

function isCannibal() {
  const p1 = snake[0];
  const goback = lastNeckPos && isSameCoords(p1, lastNeckPos);
  return goback || snake.find((p2, i) => i !== 0 && isSameCoords(p1, p2));
}

function hasCollision() {
  return isOutOfBound() || isCannibal();
}

function spawnSnake() {
  snake = [
    {
      x: Math.ceil(cols / 2) * blockSize,
      y: Math.ceil(rows / 2) * blockSize,
    },
  ];
  logger.info("snake: spawn", { snake });
}

function spawnFood() {
  food = {
    x: random(0, cols - 1) * blockSize,
    y: random(0, rows - 1) * blockSize,
  };
  logger.info("snake: spawn", { food });

  if (snake.find((p2) => isSameCoords(food, p2))) {
    logger.info("snake: respawn food");
    spawnFood();
  }
}

function getAction() {
  const newAction = Object.entries(actions).sort((a, b) => {
    return b[1] - a[1];
  })[0];

  return newAction ? newAction[0] : action;
}

const move = {
  up() {
    const { x, y } = snake[0];
    snake.unshift({ x, y: y - blockSize });
    snake.pop();
  },
  down() {
    const { x, y } = snake[0];
    snake.unshift({ x, y: y + blockSize });
    snake.pop();
  },
  left() {
    const { x, y } = snake[0];
    snake.unshift({ x: x - blockSize, y });
    snake.pop();
  },
  right() {
    const { x, y } = snake[0];
    snake.unshift({ x: x + blockSize, y });
    snake.pop();
  },
};

function snakeEat() {
  const p1 = snake[0];
  if (isSameCoords(p1, food)) {
    logger.info("snake: eat food", { snake, food });
    snake.push(lastTailPos);
    spawnFood();
  }
}

function savePosition() {
  lastNeckPos = snake[1];
  lastTailPos = snake[snake.length - 1];
}

function gameOver() {
  logger.info(`snake: game over`);
  isGameOver = true;
  stopGame();
  setTimeout(startGame, deleyBetweenGame);
}

function runAction() {
  action = getAction();
  logger.info(`snake: run action: ${action}`);
  savePosition();
  move[action]();
  snakeEat();

  hasCollision() && gameOver();

  snakeIO.emit("action", { action, snake, food, isGameOver });
  actions = {};
}

const oppositDirections = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function addAction(input) {
  if (action === oppositDirections[input]) {
    logger.info("snake: skip input", { input });
    return;
  }
  if (!actions[input]) {
    actions[input] = 1;
  } else {
    actions[input]++;
  }
}

function startGame() {
  if (tickIntervalId) {
    logger.warn("snake: already stared");
    return false;
  }
  logger.warn("snake: start");
  isGameOver = false;
  spawnSnake();
  spawnFood();
  tickIntervalId = setInterval(() => {
    const max = division - 1;
    const tick = ticks % division;
    const lastTick = max === tick;
    const percent = Math.round((tick / max) * 100);
    snakeIO.emit("tick", { tick, percent, lastTick, actions });
    lastTick && runAction();
    ticks++;
  }, interval / division);
  return true;
}

function stopGame() {
  if (!tickIntervalId) {
    logger.warn("snake: already stopped");
    return false;
  }
  logger.warn("snake: stop");
  clearInterval(tickIntervalId);
  tickIntervalId = null;
  return true;
}

function init() {
  logger.info(`snake: init`);
  snakeIO = io().of("/snake");

  snakeIO.on("connection", (socket) => {
    clientsCount++;
    logger.info(`snake: user connected`, { clientsCount });

    !tickIntervalId && startGame();

    socket.on("disconnect", () => {
      clientsCount--;
      logger.info("snake: user disconnected", { clientsCount });
      if (clientsCount === 0) stopGame();
    });

    socket.on("keydown", (input) => {
      logger.info("snake: keydown", { input });
      addAction(input);
    });

    socket.on("getSettings", (cb) => {
      cb({
        food,
        snake,
        width,
        height,
        blockSize,
        isGameOver,
      });
    });
  });

  return io;
}

module.exports = {
  init,
  startGame,
};
