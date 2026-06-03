import { bookStore } from "./book.store.js";
import type { Book, CreateBookInput } from "./book.types.js";

interface BookQueryArgs {
  id: string;
}

interface AddBookArgs {
  input: CreateBookInput;
}

export const bookResolvers = {
  Query: {
    books(): Book[] {
      return bookStore.findAll();
    },

    book(_parent: unknown, { id }: BookQueryArgs): Book | null {
      return bookStore.findById(id) ?? null;
    },
  },

  Mutation: {
    addBook(_parent: unknown, { input }: AddBookArgs): Book {
      return bookStore.create(input);
    },
  },
};
