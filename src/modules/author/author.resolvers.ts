import type { GraphQLContext } from "../../types/context.js";
import { requireAuth } from "../../lib/require-auth.js";
import type { PaginationInput } from "../../lib/pagination.js";
import type { Author, CreateAuthorInput } from "./author.types.js";
import { authResolvers } from "../auth/auth.resolvers.js";
import { id } from "zod/v4/locales";

interface AuthorQueryArgs {
  id: string;
}

interface AuthorsQueryArgs {
  pagination?: PaginationInput | null;
}

interface AuthorBooksArgs {
  pagination?: PaginationInput | null;
}

interface AddAuthorArgs {
  input: CreateAuthorInput;
}

export const authorResolvers = {
  Query: {
    authors(
      _parent: unknown,
      { pagination }: AuthorsQueryArgs,
      { datasource }: GraphQLContext,
    ) {
      return datasource.authorService.findAll(pagination);
    },

    async author(
      _parent: unknown,
      { id }: AuthorQueryArgs,
      { datasource }: GraphQLContext,
    ): Promise<Author | null> {
      const author = await datasource.authorService.findById(id);
      return author ?? null;
    },
  },

  Mutation: {
    addAuthor(
      _parent: unknown,
      { input }: AddAuthorArgs,
      { datasource, user }: GraphQLContext,
    ): Promise<Author> {
      requireAuth(user);
      return datasource.authorService.create(input);
    },
  },
  Author: {
    books(
      parent: Author,
      { pagination }: AuthorBooksArgs,
      { datasource }: GraphQLContext,
    ) {
      return datasource.bookService.findByAuthorId(parent.id, pagination);
    },
  },
};
