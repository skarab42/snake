const logger = require("../logger");
const io = require("../socket/io");

function init() {
  logger.info(`snake: init`);
  const snake = io().of("/snake");

  snake.on("connection", (socket) => {
    logger.info(`snake: user connected`);

    socket.on("disconnect", () => {
      logger.info("snake: user disconnected");
    });

    socket.on("keydown", (action) => {
      logger.info("snake: keydown", { action });
    });
  });

  return io;
}

module.exports = {
  init,
};
