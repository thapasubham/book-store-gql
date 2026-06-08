import { prisma } from "../lib/prisma.js";
import { AuthorService } from "../modules/author/author.service.js";
import { AuthorStore } from "../modules/author/author.store.js";
import { BookService } from "../modules/book/book.service.js";
import { BookStore } from "../modules/book/book.store.js";

const authorStore = new AuthorStore(prisma);
const bookStore = new BookStore(prisma);

export const authorService = new AuthorService(authorStore);
export const bookService = new BookService(bookStore, authorStore);

export const datasource = {
  authorService,
  bookService,
} as const;
