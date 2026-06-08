import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../modules/auth/auth.service.js";

export function createAuthMiddleware(authService: AuthService) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
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
