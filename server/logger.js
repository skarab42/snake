const { createLogger, format, transports } = require("winston");
const { combine, printf, timestamp, colorize } = format;
const { dev } = require("./config");

const fileFormat = combine(
  timestamp({ format: "YY-MM-DD HH:MM:SS" }),
  printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`)
);

const consoleFormat = combine(
  printf((info) => `[${info.level}] ${info.message}`)
);

const logger = createLogger({
  transports: [
    new transports.File({
      format: fileFormat,
      filename: "combined.log",
    }),
  ],
});

if (dev) {
  logger.add(
    new transports.Console({ format: combine(colorize(), consoleFormat) })
  );
}

module.exports = logger;
