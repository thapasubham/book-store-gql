import { Router } from "express";
import { createAuthMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import type { AuthController } from "./auth.controller.js";
import type { AuthService } from "./auth.service.js";

export function createAuthRouter(
  controller: AuthController,
  authService: AuthService,
): Router {
  const router = Router();
  const authenticate = createAuthMiddleware(authService, { required: false });

  router.post("/register", validate(registerSchema), controller.register);
  router.post("/login", validate(loginSchema), controller.login);
  router.get("/me", authenticate, controller.me);

  return router;
}
