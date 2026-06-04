import { GraphQLError } from "graphql";
import type { AuthorStore } from "../author/author.store.js";
import type { BookStore } from "./book.store.js";
import type { Book, CreateBookInput } from "./book.types.js";

export class BookService {
  constructor(
    private readonly store: BookStore,
    private readonly authorStore: AuthorStore,
  ) {}

  findAll(): Promise<Book[]> {
    return this.store.findAll();
  }
  findByAuthorId(authorId: string): Promise<Book[]> {
    return this.store.findByAuthorId(authorId);
  }

  findById(id: string): Promise<Book | undefined> {
    return this.store.findById(id);
  }

  async create(input: CreateBookInput): Promise<Book> {
    const author = await this.authorStore.findById(input.authorId);
    if (!author) {
      throw new GraphQLError(
        `Author with id "${input.authorId}" does not exist`,
        { extensions: { code: "BAD_USER_INPUT" } },
      );
    }
    return this.store.create(input);
  }
}
