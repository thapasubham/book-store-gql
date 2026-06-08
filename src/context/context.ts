import type { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { datasource } from "../datasource/index.js";
import type { GraphQLContext } from "../types/context.js";

export async function context({
  req,
}: ExpressContextFunctionArgument): Promise<GraphQLContext> {
  return {
    datasource,
    user: req.user ?? null,
  };
}
