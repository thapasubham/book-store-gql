import { BookStore } from "../modules/book/book.store.js";

export const bookStore = new BookStore();

export const datasource = {
  bookStore,
} as const;
