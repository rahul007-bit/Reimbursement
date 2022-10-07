import "winston-daily-rotate-file";

import {
  format as _format,
  createLogger,
  transports as _transports,
} from "winston";
import { existsSync, mkdirSync } from "fs";

const logDir = "log";

let level = "debug";

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const colorizer = _format.colorize();

const myFormat = (msg) =>
  `${msg.timestamp} - [${msg.level.toUpperCase()}]: ${msg.message}`;

const logger = createLogger({
  format: _format.combine(
    _format.timestamp(),
    _format.simple(),
    _format.printf((msg) => myFormat(msg))
  ),
  transports: [
    // Does not print to console, only file write
    new _transports.DailyRotateFile({
      filename: `${logDir}/results-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      maxSize: "7d",
    }),
  ],
});

// Allows printing to console with pretty colors
// we don't want color escape characters in our log files

logger.add(
  new _transports.Console({
    level,
    format: _format.printf((msg) =>
      colorizer.colorize(msg.level, myFormat(msg))
    ),
  })
);

logger.stream = {
  write: function (message) {
    logger.info(message);
  },
};

export default logger;
