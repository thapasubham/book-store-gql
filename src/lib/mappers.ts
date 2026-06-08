import type { Author as PrismaAuthor, Book as PrismaBook } from "../generated/prisma/client.js";
import type { Author } from "../modules/author/author.types.js";
import type { Book } from "../modules/book/book.types.js";

export function toAuthor(record: PrismaAuthor): Author {
  return {
    id: record.id,
    name: record.name,
    ...(record.bio !== null ? { bio: record.bio } : {}),
  };
}

export function toBook(record: PrismaBook): Book {
  return {
    id: record.id,
    title: record.title,
    authorId: record.authorId,
    ...(record.publishedYear !== null
      ? { publishedYear: record.publishedYear }
      : {}),
  };
}
