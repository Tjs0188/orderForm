// logger.js
import winston from "winston";
import { v4 as uuidv4 } from "uuid";
import { format } from "winston";
import { inspect } from "util";

const customFormat = format.combine(
  format.timestamp(),
  format.colorize(),
  format.prettyPrint(),
  format.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length
      ? `\n${inspect(meta, { colors: true, depth: 5 })}`
      : "";

    return `${timestamp} ${level}: ${
      typeof message === "object"
        ? inspect(message, { colors: true, depth: 5 })
        : message
    }${metaStr}`;
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: customFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: format.json(),
    }),
    new winston.transports.File({
      filename: "combined.log",
      format: format.json(),
    }),
  ],
});

export const requestLogger = (req, res, next) => {
  req.requestId = uuidv4();
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.url,
      status: `${res.statusCode}`,
      duration: `${duration}ms`,
      query: Object.keys(req.query).length ? req.query : undefined,
      body: Object.keys(req.body || {}).length ? req.body : undefined,
      userEmail: req.currentUser?.email,
    });
  });

  next();
};

export default logger;
