// prisma.js
import { PrismaClient } from "@prisma/client";
import logger from "./logger.js";

const SLOW_QUERY_THRESHOLD = 1000; // 1 second

// Helper to classify query type
const getQueryType = (query) => {
  const type = query.split(" ")[0].toUpperCase();
  return ["SELECT", "INSERT", "UPDATE", "DELETE"].includes(type)
    ? type
    : "OTHER";
};

// Helper to format parameters
const formatParams = (params) => {
  try {
    return JSON.stringify(params, null, 2);
  } catch (e) {
    return params;
  }
};

const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

// Enhanced query logging
prisma.$on("query", (e) => {
  const queryType = getQueryType(e.query);
  const formattedParams = formatParams(e.params);
  const duration = Number(e.duration);

  const logData = {
    type: queryType,
    query: e.query,
    params: formattedParams,
    duration: `${duration}ms`,
    timestamp: e.timestamp,
  };

  if (duration > SLOW_QUERY_THRESHOLD) {
    logger.warn({
      ...logData,
      message: "Slow query detected",
    });
  } else {
    logger.query(logData);
  }
});

// Enhanced error logging
prisma.$on("error", (e) => {
  logger.error({
    type: "PRISMA_ERROR",
    message: e.message,
    target: e.target,
    stack: e.stack,
  });
});

// Info logging with context
prisma.$on("info", (e) => {
  logger.info({
    type: "PRISMA_INFO",
    ...e,
  });
});

// Warning logging with context
prisma.$on("warn", (e) => {
  logger.warn({
    type: "PRISMA_WARN",
    ...e,
  });
});

export default prisma;
