import pino from "pino";
import type { Options } from "pino-http";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        singleLine: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});

export const httpLoggerOptions = {
  logger,
  autoLogging: {
    ignore: (req) => req.url === "/health",
  },
  serializers: {
    req: (req) => ({ method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
  customSuccessMessage: (req, res, responseTime) =>
    `${req.method} ${req.url} ${res.statusCode} ${responseTime}ms`,
  customErrorMessage: (req, _res, err) =>
    `${req.method} ${req.url} failed: ${err.message}`,
} satisfies Options;
