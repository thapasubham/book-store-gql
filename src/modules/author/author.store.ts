import type { PrismaClient } from "../../generated/prisma/client.js";
import { toAuthor } from "../../lib/mappers.js";
import type { NormalizedPagination } from "../../lib/pagination.js";
import type { Author, CreateAuthorInput } from "./author.types.js";

export class AuthorStore {
  constructor(private readonly prisma: PrismaClient) {}

  async findManyPaginated(pagination: NormalizedPagination): Promise<{
    nodes: Author[];
    totalCount: number;
  }> {
    const [authors, totalCount] = await Promise.all([
      this.prisma.author.findMany({
        orderBy: { name: "asc" },
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.author.count(),
    ]);

    return {
      nodes: authors.map(toAuthor),
      totalCount,
    };
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
