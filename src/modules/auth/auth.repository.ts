import type { PrismaClient } from "../../generated/prisma/client.js";
import type { AuthUser } from "./auth.types.js";

const publicUserSelect = {
  id: true,
  email: true,
  username: true,
  name: true,
  role: true,
} as const;

type UserRecord = {
  id: string;
  email: string;
  username: string;
  name: string | null;
  role: AuthUser["role"];
  password?: string;
};

function toAuthUser(user: UserRecord): AuthUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    role: user.role,
  };
}

export class AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<AuthUser | undefined> {
    const user = await this.prisma.user.findFirst({
      where: { id, isDeleted: false },
      select: publicUserSelect,
    });
    return user ? toAuthUser(user) : undefined;
  }

  async findByEmail(
    email: string,
  ): Promise<(AuthUser & { password: string }) | undefined> {
    const user = await this.prisma.user.findFirst({
      where: { email, isDeleted: false },
      select: { ...publicUserSelect, password: true },
    });
    return user ? { ...toAuthUser(user), password: user.password } : undefined;
  }

  async findByUsername(username: string): Promise<AuthUser | undefined> {
    const user = await this.prisma.user.findFirst({
      where: { username, isDeleted: false },
      select: publicUserSelect,
    });
    return user ? toAuthUser(user) : undefined;
  }

  async create(data: {
    email: string;
    username: string;
    password: string;
    name?: string;
  }): Promise<AuthUser> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        name: data.name ?? null,
      },
      select: publicUserSelect,
    });
    return toAuthUser(user);
  }
}
