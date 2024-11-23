// logger.js
import winston from "winston";
import { v4 as uuidv4 } from "uuid";
import { format } from "winston";
import { inspect } from "util";
import chalk from "chalk";
// Add performance monitoring
import { performance } from "perf_hooks";

// Configure thresholds
const SLOW_REQUEST_THRESHOLD = 1000; // 1 second
const MEMORY_WARNING_THRESHOLD = 1024 * 1024 * 100; // 100MB

// Custom colors for different methods
const methodColors = {
  GET: chalk.green,
  POST: chalk.yellow,
  PUT: chalk.blue,
  DELETE: chalk.red,
  PATCH: chalk.magenta,
};

// Status code colors
const getStatusColor = (status) => {
  if (status < 200) return chalk.blue(status);
  if (status < 300) return chalk.green(status);
  if (status < 400) return chalk.cyan(status);
  if (status < 500) return chalk.yellowBright(status);
  return chalk.red(status);
};

const getStatusTextColor = (statusText, status) => {
  if (status < 200) return chalk.blue(statusText);
  if (status < 300) return chalk.green(statusText);
  if (status < 400) return chalk.cyan(statusText);
  if (status < 500) return chalk.yellowBright(statusText);
  return chalk.red(statusText);
};

// Duration colors
const getDurationColor = (duration) => {
  if (duration < 100) return chalk.green(`${duration}ms`);
  if (duration < 500) return chalk.yellow(`${duration}ms`);
  return chalk.red(`${duration}ms`);
};

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.colorize(),
  format.printf(({ level, message, timestamp, ...meta }) => {
    const levelEmoji =
      {
        error: "❌",
        warn: "⚠️ ",
        info: "ℹ️ ",
        debug: "🔍",
      }[level] || "📝";

    if (typeof message === "object" && message.method) {
      const {
        method,
        url,
        status,
        statusText,
        duration,
        requestId,
        query,
        body,
        userEmail,
      } = message;

      const coloredMethod = (methodColors[method] || chalk.white)(
        method.padEnd(6)
      );
      const coloredStatus = getStatusColor(parseInt(status));
      const coloredDuration = getDurationColor(parseInt(duration));
      const coloredStatusText = getStatusTextColor(statusText, status);

      return `${chalk.gray(
        timestamp
      )} ${levelEmoji} ${coloredMethod} ${chalk.cyan(
        url
      )} ${coloredStatus} ${coloredStatusText} ${coloredDuration}\n${chalk.gray(
        "├"
      )} RequestID: ${chalk.dim(requestId)}\n${chalk.gray(
        "├"
      )} User: ${chalk.blue(userEmail || "anonymous")}\n${
        query
          ? `${chalk.gray("├")} Query: ${inspect(query, {
              colors: true,
              depth: 3,
            })}\n`
          : ""
      }${
        body
          ? `${chalk.gray("└")} Body: ${inspect(body, {
              colors: true,
              depth: 3,
            })}`
          : chalk.gray("└")
      }`;
    }

    const metaStr = Object.keys(meta).length
      ? `\n${inspect(meta, { colors: true, depth: 5 })}`
      : "";

    return `${timestamp} ${levelEmoji} ${level}: ${
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
  const start = performance.now();
  req.requestId = uuidv4();
  const startMemory = process.memoryUsage().heapUsed;

  // Preserve request context
  const reqContext = {
    ip: req.ip,
    userAgent: req.get("user-agent"),
    referer: req.get("referer"),
    correlationId: req.get("x-correlation-id") || req.requestId,
  };

  res.on("finish", () => {
    const duration = performance.now() - start;
    const memoryUsed = process.memoryUsage().heapUsed - startMemory;

    // Extract route parameters if they exist
    const routeParams = req.params || {};

    const logData = {
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      correlationId: reqContext.correlationId,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      statusText: res.statusMessage,
      duration: Math.round(duration),
      memoryUsed: Math.round(memoryUsed / 1024 / 1024) + "MB",
      query: Object.keys(req.query).length ? req.query : undefined,
      params: Object.keys(routeParams).length ? routeParams : undefined,
      body: Object.keys(req.body || {}).length ? req.body : undefined,
      userEmail: req.currentUser?.email,
      context: reqContext,
      headers: {
        contentType: res.get("Content-Type"),
        contentLength: res.get("Content-Length"),
      },
    };

    // Log at different levels based on conditions
    if (res.statusCode >= 500) {
      logger.error(logData);
    } else if (duration > SLOW_REQUEST_THRESHOLD) {
      logger.warn({ ...logData, message: "Slow request detected" });
    } else if (memoryUsed > MEMORY_WARNING_THRESHOLD) {
      logger.warn({ ...logData, message: "High memory usage detected" });
    } else {
      logger.info(logData);
    }
  });

  // Log unhandled errors
  res.on("error", (error) => {
    logger.error({
      requestId: req.requestId,
      error: error.message,
      stack: error.stack,
      context: reqContext,
    });
  });

  next();
};

export default logger;
