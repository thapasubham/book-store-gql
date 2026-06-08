import type { PrismaClient } from "../../generated/prisma/client.js";
import { toBook } from "../../lib/mappers.js";
import type { Book, CreateBookInput } from "./book.types.js";

export class BookStore {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      orderBy: { title: "asc" },
    });
    return books.map(toBook);
  }

  async findById(id: string): Promise<Book | undefined> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    return book ? toBook(book) : undefined;
  }

  async findByAuthorId(authorId: string): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: { authorId },
      orderBy: { title: "asc" },
    });
    return books.map(toBook);
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
