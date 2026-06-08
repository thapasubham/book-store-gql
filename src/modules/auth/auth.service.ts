import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { HttpError } from "../../lib/http-error.js";
import type { AuthRepository } from "./auth.repository.js";
import type {
  AuthResult,
  AuthUser,
  JwtPayload,
  LoginInput,
  RegisterInput,
} from "./auth.types.js";

const SALT_ROUNDS = 12;

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async register(input: RegisterInput): Promise<AuthResult> {
    const { email, username } = input;

    const [existingEmail, existingUsername] = await Promise.all([
      this.repository.findByEmail(email),
      this.repository.findByUsername(username),
    ]);

    if (existingEmail) {
      throw new HttpError(409, "Email is already registered");
    }

    if (existingUsername) {
      throw new HttpError(409, "Username is already taken");
    }

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await this.repository.create({
      email,
      username,
      password: passwordHash,
      ...(input.name !== undefined ? { name: input.name } : {}),
    });

    return this.buildAuthResult(user);
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const { email } = input;

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(input.password, user.password);
    if (!passwordMatches) {
      throw new HttpError(401, "Invalid email or password");
    }

    const { password: _password, ...publicUser } = user;
    return this.buildAuthResult(publicUser);
  }

  getMe(userId: string): Promise<AuthUser> {
    return this.repository.findById(userId).then((user) => {
      if (!user) {
        throw new HttpError(401, "Unauthorized");
      }
      return user;
    });
  }

  verifyToken(token: string): JwtPayload {
    try {
      const payload = jwt.verify(token, env.jwtSecret);
      if (
        typeof payload !== "object" ||
        payload === null ||
        typeof payload.sub !== "string" ||
        typeof payload.email !== "string"
      ) {
        throw new HttpError(401, "Unauthorized");
      }
      return { sub: payload.sub, email: payload.email };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(401, "Unauthorized");
    }
  }

  private buildAuthResult(user: AuthUser): AuthResult {
    const token = jwt.sign(
      { sub: user.id, email: user.email } satisfies JwtPayload,
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn } as SignOptions,
    );

    return { token, user };
  }
}
