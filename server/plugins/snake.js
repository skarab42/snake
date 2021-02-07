const logger = require("../logger");
const io = require("../socket/io");

let ticks = 0;
let division = 10;
let interval = 5000;

let snake = null;
let action = null;

function runAction() {
  console.log("run action:", action);
  snake.emit("action", { action });
}

function init() {
  logger.info(`snake: init`);
  snake = io().of("/snake");

  snake.on("connection", (socket) => {
    logger.info(`snake: user connected`);

    socket.on("disconnect", () => {
      logger.info("snake: user disconnected");
    });

    socket.on("keydown", (input) => {
      logger.info("snake: keydown", { input });
      action = input;
    });
  });

  setInterval(() => {
    const max = division - 1;
    const tick = ticks % division;
    const lastTick = max === tick;
    const percent = Math.round((tick / max) * 100);
    snake.emit("tick", { tick, percent, lastTick });
    if (action && lastTick) runAction();
    ticks++;
  }, interval / division);

  return io;
}

module.exports = {
  init,
};
