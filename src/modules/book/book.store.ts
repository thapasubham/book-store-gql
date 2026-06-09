import type { PrismaClient } from "../../generated/prisma/client.js";
import { toBook } from "../../lib/mappers.js";
import type { NormalizedPagination } from "../../lib/pagination.js";
import type { Book, CreateBookInput } from "./book.types.js";

export class BookStore {
  constructor(private readonly prisma: PrismaClient) {}

  async findManyPaginated(pagination: NormalizedPagination): Promise<{
    nodes: Book[];
    totalCount: number;
  }> {
    const [books, totalCount] = await Promise.all([
      this.prisma.book.findMany({
        orderBy: { title: "asc" },
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.book.count(),
    ]);

    return {
      nodes: books.map(toBook),
      totalCount,
    };
  }

  async findById(id: string): Promise<Book | undefined> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    return book ? toBook(book) : undefined;
  }

  async findByAuthorIdPaginated(
    authorId: string,
    pagination: NormalizedPagination,
  ): Promise<{ nodes: Book[]; totalCount: number }> {
    const where = { authorId };

    const [books, totalCount] = await Promise.all([
      this.prisma.book.findMany({
        where,
        orderBy: { title: "asc" },
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      nodes: books.map(toBook),
      totalCount,
    };
  }

  async create(input: CreateBookInput): Promise<Book> {
    const book = await this.prisma.book.create({
      data: {
        title: input.title,
        authorId: input.authorId,
        publishedYear: input.publishedYear ?? null,
      },
    });
    return toBook(book);
  }
}
