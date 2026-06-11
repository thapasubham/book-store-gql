import type { GraphQLFormattedError } from "graphql";

export function formattedError(
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError {
  console.error(error);

  const code = formattedError.extensions?.code ?? "INTERNAL_SERVER_ERROR";

  return {
    message: formattedError.message,
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
    },
  };
}
