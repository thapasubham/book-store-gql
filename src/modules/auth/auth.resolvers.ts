import type { GraphQLContext } from "../../types/context.js";

export const authResolvers = {
  Query: {
    me(_parent: unknown, _args: Record<string, never>, { user }: GraphQLContext) {
      return user;
    },
  },
};
