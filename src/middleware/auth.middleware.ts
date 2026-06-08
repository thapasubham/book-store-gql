import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../modules/auth/auth.service.js";

export interface AuthMiddlewareOptions {
  /** When false, requests without a token continue as anonymous. Default: true. */
  required?: boolean;
}

export function createAuthMiddleware(
  authService: AuthService,
  options: AuthMiddlewareOptions = {},
) {
  const required = options.required ?? true;

  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      if (required) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      next();
      return;
    }

    const token = header.slice("Bearer ".length);
    try {
      const payload = authService.verifyToken(token);
      const user = await authService.getMe(payload.sub);
      req.user = user;
      next();
    } catch {
      res.status(401).json({ error: "Unauthorized" });
    }
  };
}
