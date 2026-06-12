import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { datasource } from "./datasource/index.js";
import { authRouter, authService } from "./modules/auth/index.js";
import { formatError, resolvers, typeDefs } from "./schema/index.js";
import type { GraphQLContext } from "./types/context.js";
import { context } from "./context/context.js";
import { createAuthMiddleware } from "./middleware/auth.middleware.js";
import { httpLoggerOptions, logger } from "./lib/logging.js";
import { pinoHttp } from "pino-http";

async function main(): Promise<void> {
  const app = express();

  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    formatError,
  });

  await server.start();
  app.use(pinoHttp(httpLoggerOptions));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(express.json());
  app.use("/auth", authRouter);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    createAuthMiddleware(authService, { required: false }),
    expressMiddleware(server, {
      context,
    }),
  );

  app.listen(env.port, () => {
    logger.info(
      {
        port: env.port,
        graphql: `http://localhost:${env.port}/graphql`,
        auth: `http://localhost:${env.port}/auth`,
        health: `http://localhost:${env.port}/health`,
      },
      "Server started",
    );
  });
}

main().catch((error: unknown) => {
  logger.error(error, "Failed to start server");
  process.exit(1);
});
