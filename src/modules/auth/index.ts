import { prisma } from "../../lib/prisma.js";
import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { createAuthRouter } from "./auth.routes.js";
import { AuthService } from "./auth.service.js";

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export const authRouter = createAuthRouter(authController, authService);
export { AuthService } from "./auth.service.js";
