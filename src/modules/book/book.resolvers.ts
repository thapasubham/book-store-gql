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
      _args: any,
      { datasource }: GraphQLContext,
    ): Book[] {
      return datasource.bookStore.findAll();
    },

    book(
      _parent: unknown,
      { id }: BookQueryArgs,
      { datasource }: GraphQLContext,
    ): Book | null {
      return datasource.bookStore.findById(id) ?? null;
    },
  },

  Mutation: {
    addBook(
      _parent: unknown,
      { input }: AddBookArgs,
      { datasource }: GraphQLContext,
    ): Book {
      return datasource.bookStore.create(input);
    },
  },
};
