import type { datasource } from "../datasource/index.js";

export interface GraphQLContext {
  datasource: typeof datasource;
}
