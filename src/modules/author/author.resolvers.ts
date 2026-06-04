import type { GraphQLContext } from "../../types/context.js";
import type { Author, CreateAuthorInput } from "./author.types.js";

interface AuthorQueryArgs {
  id: string;
}

interface AddAuthorArgs {
  input: CreateAuthorInput;
}

export const authorResolvers = {
  Query: {
    authors(
      _parent: unknown,
      _args: any,
      { datasource }: GraphQLContext,
    ): Promise<Author[]> {
      return datasource.authorService.findAll();
    },

    author(
      _parent: unknown,
      { id }: AuthorQueryArgs,
      { datasource }: GraphQLContext,
    ): Promise<Author | null> {
      return datasource.authorService.findById(id).then((author) => author ?? null);
    },
  },

  Mutation: {
    addAuthor(
      _parent: unknown,
      { input }: AddAuthorArgs,
      { datasource }: GraphQLContext,
    ): Promise<Author> {
      return datasource.authorService.create(input);
    },
  },

};
