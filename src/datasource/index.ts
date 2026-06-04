import { BookService } from "../modules/book/book.service.js";
import { BookStore } from "../modules/book/book.store.js";

const bookStore = new BookStore();

export const bookService = new BookService(bookStore);

export const datasource = {
  bookService,
} as const;
