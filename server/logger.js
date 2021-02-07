const { createLogger, format, transports } = require("winston");
const { combine, printf, timestamp, colorize } = format;
const { dev } = require("./config");

const fileFormat = combine(
  timestamp({ format: "YY-MM-DD HH:MM:SS" }),
  printf(({ timestamp, level, message, ...rest }) => {
    const data = Object.keys(rest).length ? JSON.stringify(rest) : "";
    return `[${timestamp}] [${level}] ${message} ${data}`;
  })
);

const consoleFormat = combine(
  printf(({ level, message, ...rest }) => {
    const data = Object.keys(rest).length ? JSON.stringify(rest) : "";
    return `[${level}] ${message} ${data}`;
  })
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
