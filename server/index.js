const { dev, host, port, name, version, clientPath } = require("./config");
const socketIO = require("socket.io");
const logger = require("./logger");
const polka = require("polka");
const sirv = require("sirv");

const client = sirv(clientPath, { dev });
const address = `http://${host}:${port}`;

const { server } = polka()
  .use(client)
  .listen(port, (err) => {
    if (err) throw err;
    logger.info(`${name} v${version}`);
    logger.info(`running on ${address}`);
  });

const io = socketIO(server, {
  cors: {
    origin: address,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});
