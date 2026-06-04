import type { GraphQLContext } from "../../types/context.js";
import type { Book, CreateBookInput } from "./book.types.js";

interface BookQueryArgs {
  id: string;
}

interface AddBookArgs {
  input: CreateBookInput;
}

export const bookResolvers = {
  Query: {
    books(
      _parent: unknown,
      _args: Record<string, never>,
      { datasource }: GraphQLContext,
    ): Promise<Book[]> {
      return datasource.bookService.findAll();
    },

    book(
      _parent: unknown,
      { id }: BookQueryArgs,
      { datasource }: GraphQLContext,
    ): Promise<Book | null> {
      return datasource.bookService.findById(id).then((book) => book ?? null);
    },
  },

  Mutation: {
    addBook(
      _parent: unknown,
      { input }: AddBookArgs,
      { datasource }: GraphQLContext,
    ): Promise<Book> {
      return datasource.bookService.create(input);
    },
  },
};
