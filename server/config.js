const { name, version } = require("../package");
const path = require("path");

const port = 5425;
const host = "localhost";
const address = `http://${host}:${port}`;
const clientPath = path.join(__dirname, "../client");
const dev = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  dev,
  host,
  port,
  name,
  version,
  address,
  clientPath,
};
