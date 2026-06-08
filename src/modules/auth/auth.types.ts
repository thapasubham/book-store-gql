import type { z } from "zod";
import type { Role } from "../../generated/prisma/client.js";
import type { loginSchema, registerSchema } from "./auth.schemas.js";

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string | null;
  role: Role;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
}

export interface JwtPayload {
  sub: string;
  email: string;
}
