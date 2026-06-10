import type { datasource } from "../datasource/index.js";
import type { Loaders } from "../dataloaders/index.js";
import type { AuthUser } from "../modules/auth/auth.types.js";

export interface GraphQLContext {
  datasource: typeof datasource;
  user: AuthUser | null;
  loaders: Loaders;
}
