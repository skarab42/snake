const { dev, host, port, name, version, clientPath } = require("./config");
const polka = require("polka");
const sirv = require("sirv");

const client = sirv(clientPath, { dev });

polka()
  .use(client)
  .listen(port, (err) => {
    if (err) throw err;
    /* eslint-disable no-console */
    console.log(`> ${name} v${version}`);
    console.log(`> running on http://${host}:${port}`);
    /* eslint-enable no-console */
  });
