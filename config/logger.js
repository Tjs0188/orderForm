import winston from "winston";
import { v4 as uuidv4 } from "uuid";
import { format } from "winston";
import { inspect } from "util";
import chalk from "chalk";
import { performance } from "perf_hooks";
import { type } from "os";

const SLOW_REQUEST_THRESHOLD = 1000;
const MEMORY_WARNING_THRESHOLD = 1024 * 1024 * 100;

// Remove format.colorize() and handle colors manually
const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ level, message, timestamp, ...meta }) => {
    const levelColors = {
      error: chalk.red,
      warn: chalk.yellow,
      info: chalk.blue,
      debug: chalk.gray,
      query: chalk.cyan,
    };

    const levelEmoji =
      {
        error: "❌",
        warn: "⚠️ ",
        info: "ℹ️ ",
        debug: "🔍",
        query: "🛢️ ",
      }[level] || "📝";

    if (typeof message === "object" && message.method) {
      const { method, url, status, statusText, duration } = message;

      const coloredMethod =
        {
          GET: chalk.green(method.padEnd(6)),
          POST: chalk.yellow(method.padEnd(6)),
          PUT: chalk.blue(method.padEnd(6)),
          DELETE: chalk.red(method.padEnd(6)),
          PATCH: chalk.magenta(method.padEnd(6)),
        }[method] || chalk.white(method.padEnd(6));

      const statusColor =
        status >= 500
          ? chalk.red
          : status >= 400
          ? chalk.yellow
          : status >= 300
          ? chalk.cyan
          : status >= 200
          ? chalk.green
          : chalk.blue;

      const durationColor =
        duration > 1000
          ? chalk.red
          : duration > 500
          ? chalk.yellow
          : chalk.green;

      return formatLogMessage({
        timestamp,
        levelEmoji,
        coloredMethod,
        url,
        status,
        statusText,
        duration,
        message,
        statusColor,
        durationColor,
      });
    } else if (typeof message === "object" && level === "query") {
      const { type, query, params, duration } = message;
      const formattedQuery = formatSqlQuery(query, params);

      const durationColor =
        duration > SLOW_REQUEST_THRESHOLD ? chalk.red : chalk.green;

      const coloredMethod =
        {
          SELECT: chalk.cyan(type.padEnd(6)),
          INSERT: chalk.green(type.padEnd(6)),
          CREATE: chalk.green(type.padEnd(6)),
          UPDATE: chalk.yellow(type.padEnd(6)),
          DELETE: chalk.red(type.padEnd(6)),
        }[type] || chalk.white(type.padEnd(6));

      return formatLogMessage({
        timestamp,
        levelEmoji,
        coloredMethod,
        url: chalk.dim(formattedQuery),
        status: "",
        statusText: "",
        duration: duration.replace("ms", ""),
        message: {
          ...message,
          query: formattedQuery, // Replace original query with formatted one
        },
        statusColor: chalk.dim,
        durationColor,
      });
    }

    return `${timestamp} ${levelEmoji} ${levelColors[level](level)}: ${
      typeof message === "object"
        ? inspect(message, { colors: true, depth: 5 })
        : message
    }${
      Object.keys(meta).length
        ? `\n${inspect(meta, { colors: true, depth: 5 })}`
        : ""
    }`;
  })
);

const formatSqlQuery = (query, params) => {
  try {
    const paramArray = JSON.parse(JSON.parse(params));
    let formattedQuery = query;
    // Replace ? placeholders with actual values
    paramArray.forEach((param) => {
      formattedQuery = formattedQuery.replace(
        "?",
        typeof param === "string" ? `'${param}'` : param
      );
    });

    return formattedQuery;
  } catch (e) {
    return query; // Return original if parsing fails
  }
};

function formatLogMessage({
  timestamp,
  levelEmoji,
  coloredMethod,
  url,
  status,
  statusText,
  duration,
  message,
  statusColor,
  durationColor,
}) {
  const parts = [
    chalk.gray(timestamp),
    levelEmoji,
    coloredMethod,
    chalk.cyan(url),
    statusColor(`${status} ${statusText}`),
    durationColor(`${duration}ms`),
  ];

  if (message.requestId) {
    parts.push(
      `\n${chalk.gray("├")} RequestID: ${chalk.dim(message.requestId)}`
    );
  }

  if (message.userEmail) {
    parts.push(
      `\n${chalk.gray("├")} User: ${chalk.blue(
        message.userEmail || "anonymous"
      )}`
    );
  }

  return parts.join(" ");
}

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    query: 2,
    info: 3,
    debug: 4,
  },
  // level: process.env.LOG_LEVEL || "info",
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
