import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { datasource } from "./datasource/index.js";
import { resolvers, typeDefs } from "./schema/index.js";
import type { GraphQLContext } from "./types/context.js";

async function main(): Promise<void> {
  const app = express();

  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async (): Promise<GraphQLContext> => ({ datasource }),
    }),
  );

  app.listen(env.port, () => {
    console.log(`GraphQL ready at http://localhost:${env.port}/graphql`);
    console.log(`Health check at http://localhost:${env.port}/health`);
  });
}

main().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
