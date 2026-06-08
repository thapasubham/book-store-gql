import { GraphQLError } from "graphql";
import type { AuthUser } from "../modules/auth/auth.types.js";

export function requireAuth(
  user: AuthUser | null | undefined,
): asserts user is AuthUser {
  if (!user) {
    throw new GraphQLError("You must be logged in to perform this action", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
}
