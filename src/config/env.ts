const port = Number(process.env.PORT);

export const env = {
  port: Number.isFinite(port) && port > 0 ? port : 4000,
} as const;
