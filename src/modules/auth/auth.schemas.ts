import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string("Email is required")
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((value) => value.toLowerCase()),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  username: z
    .string("Username is required")
    .trim()
    .min(1, "Username is required"),
  name: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((value) => value.toLowerCase()),
  password: z.string("Password is required").min(1, "Password is required"),
});
