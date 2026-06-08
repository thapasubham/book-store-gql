import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodType } from "zod";

type RequestSource = "body" | "query" | "params";

interface ValidationErrorResponse {
  error: string;
  fields: Record<string, string>;
}

function formatValidationError(error: ZodError): ValidationErrorResponse {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const field =
      issue.path.length > 0 ? issue.path.map(String).join(".") : "request";

    if (!fields[field]) {
      fields[field] = issue.message;
    }
  }

  const fieldEntries = Object.entries(fields);
  const [firstField] = fieldEntries;

  return {
    error:
      fieldEntries.length === 1 && firstField
        ? firstField[1]
        : "Please fix the highlighted fields and try again.",
    fields,
  };
}

export function validate<T>(
  schema: ZodType<T>,
  source: RequestSource = "body",
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json(formatValidationError(result.error));
      return;
    }

    req[source] = result.data;
    next();
  };
}
