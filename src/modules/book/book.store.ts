import { DEFAULT_SEED_BOOKS } from "../../seed/book.seed.js";
import type { Book, CreateBookInput } from "./book.types.js";


export class BookStore {
  private readonly books: Book[];
  private nextId: number;

  constructor(seedBooks: Book[] = DEFAULT_SEED_BOOKS) {
    this.books = [...seedBooks];
    this.nextId = this.books.length + 1;
  }

  async findAll(): Promise<Book[]> {
    return [...this.books];
  }

  async findById(id: string): Promise<Book | undefined> {
    return this.books.find((book) => book.id === id);
  }

  async create(input: CreateBookInput): Promise<Book> {
    const book: Book = {
      id: String(this.nextId++),
      title: input.title,
      authorId: input.authorId,
      ...(input.publishedYear !== undefined
        ? { publishedYear: input.publishedYear }
        : {}),
    };

    this.books.push(book);
    return book;
  }
}
