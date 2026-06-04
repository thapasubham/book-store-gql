import type { BookStore } from "./book.store.js";
import type { Book, CreateBookInput } from "./book.types.js";

export class BookService {
  constructor(private readonly store: BookStore) {}

  findAll(): Promise<Book[]> {
    return this.store.findAll();
  }

  findById(id: string): Promise<Book | undefined> {
    return this.store.findById(id);
  }

  create(input: CreateBookInput): Promise<Book> {
    return this.store.create(input);
  }
}
