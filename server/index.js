const { dev, host, port, name, version, clientPath } = require("./config");
const logger = require("./logger");
const polka = require("polka");
const sirv = require("sirv");

const client = sirv(clientPath, { dev });

polka()
  .use(client)
  .listen(port, (err) => {
    if (err) throw err;
    logger.info(`${name} v${version}`);
    logger.info(`running on http://${host}:${port}`);
  });
