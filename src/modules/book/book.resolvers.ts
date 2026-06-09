import type { GraphQLContext } from "../../types/context.js";
import { requireAuth } from "../../lib/require-auth.js";
import type { PaginationInput } from "../../lib/pagination.js";
import type { Book, CreateBookInput } from "./book.types.js";

interface BookQueryArgs {
  id: string;
}

interface BooksQueryArgs {
  pagination?: PaginationInput | null;
}

interface AddBookArgs {
  input: CreateBookInput;
}

export const bookResolvers = {
  Query: {
    books(
      _parent: unknown,
      { pagination }: BooksQueryArgs,
      { datasource }: GraphQLContext,
    ) {
      return datasource.bookService.findAll(pagination);
    },

    async book(
      _parent: unknown,
      { id }: BookQueryArgs,
      { datasource }: GraphQLContext,
    ): Promise<Book | null> {
      const book = await datasource.bookService.findById(id);
      return book ?? null;
    },
  },

  Mutation: {
    addBook(
      _parent: unknown,
      { input }: AddBookArgs,
      { datasource, user }: GraphQLContext,
    ): Promise<Book> {
      requireAuth(user);
      return datasource.bookService.create(input);
    },
  },
  Book: {
    author(
      parent: Book,
      _args: Record<string, never>,
      { datasource }: GraphQLContext,
    ) {
      return datasource.authorService.findByIdOrThrow(parent.authorId);
    },
  },
};
