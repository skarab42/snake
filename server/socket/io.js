const { address } = require("../config");
const socketIO = require("socket.io");
const logger = require("../logger");

let io = null;

function init(server) {
  if (io) return io;

  io = socketIO(server, {
    cors: {
      origin: address,
      methods: ["GET", "POST"],
    },
  });

  return io;
}

module.exports = init;
