import type { PrismaClient } from "../../generated/prisma/client.js";
import { toAuthor } from "../../lib/mappers.js";
import type { Author, CreateAuthorInput } from "./author.types.js";

export class AuthorStore {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Author[]> {
    const authors = await this.prisma.author.findMany({
      orderBy: { name: "asc" },
    });
    return authors.map(toAuthor);
  }

  async findById(id: string): Promise<Author | undefined> {
    const author = await this.prisma.author.findUnique({ where: { id } });
    return author ? toAuthor(author) : undefined;
  }

  async create(input: CreateAuthorInput): Promise<Author> {
    const author = await this.prisma.author.create({
      data: {
        name: input.name,
        bio: input.bio ?? null,
      },
    });
    return toAuthor(author);
  }
}
