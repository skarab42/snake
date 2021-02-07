const { dev, address, port, name, version, clientPath } = require("./config");
const snake = require("./plugins/snake");
const logger = require("./logger");
const io = require("./socket/io");
const polka = require("polka");
const sirv = require("sirv");

const client = sirv(clientPath, { dev, single: true });

function banner() {
  logger.info(`${name} v${version}`);
  logger.info(`running on ${address}`);
}

const { server } = polka()
  .use(client)
  .listen(port, (err) => {
    if (err) throw err;
    banner();
    io(server);
    snake.init();
  });
