const logger = require("../logger");
const io = require("../socket/io");

let ticks = 0;
let division = 10;
let interval = 5000;

let snake = null;
let action = "up";
let actions = {};

let clientsCount = 0;
let tickIntervalId = null;

function getAction() {
  const newAction = Object.entries(actions).sort((a, b) => {
    return b[1] - a[1];
  })[0];

  return newAction ? newAction[0] : action;
}

function runAction() {
  action = getAction();
  logger.info(`snake: run action: ${action}`);
  snake.emit("action", { action });
  actions = {};
}

function addAction(input) {
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
  tickIntervalId = setInterval(() => {
    const max = division - 1;
    const tick = ticks % division;
    const lastTick = max === tick;
    const percent = Math.round((tick / max) * 100);
    snake.emit("tick", { tick, percent, lastTick });
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
  snake = io().of("/snake");

  snake.on("connection", (socket) => {
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
  });

  return io;
}

module.exports = {
  init,
  startGame,
};
