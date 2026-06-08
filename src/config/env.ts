const port = Number(process.env.PORT);

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set");
}

export const env = {
  port: Number.isFinite(port) && port > 0 ? port : 4000,
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
} as const;
