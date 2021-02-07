const { name, version } = require("../package");
const path = require("path");

const port = 5425;
const host = "localhost";
const clientPath = path.join(__dirname, "../client");
const dev = process.argv.includes("--watch") || process.argv.includes("-w");

module.exports = {
  dev,
  host,
  port,
  name,
  version,
  clientPath,
};
