import type { Request, Response } from "express";
import { HttpError } from "../../lib/http-error.js";
import type { AuthService } from "./auth.service.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body as RegisterInput;
      const result = await this.authService.register(input);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body as LoginInput;
      const result = await this.authService.login(input);
      res.json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      res.json({ user: req.user });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): void {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
