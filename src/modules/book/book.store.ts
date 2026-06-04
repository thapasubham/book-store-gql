import { DEFAULT_SEED_BOOKS } from "../../seed/book.seed.js";
import type { Book, CreateBookInput } from "./book.types.js";

export class BookStore {
  private readonly books: Book[];
  private nextId: number;

  constructor(seedBooks: Book[] = DEFAULT_SEED_BOOKS) {
    this.books = [...seedBooks];
    this.nextId = this.books.length + 1;
  }

  findAll(): Book[] {
    return [...this.books];
  }

  findById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(input: CreateBookInput): Book {
    const book: Book = {
      id: String(this.nextId++),
      title: input.title,
      author: input.author,
      ...(input.publishedYear !== undefined
        ? { publishedYear: input.publishedYear }
        : {}),
    };

    this.books.push(book);
    return book;
  }
}
