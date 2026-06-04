import { authorResolvers, authorTypeDefs } from "../modules/author/index.js";
import { bookResolvers, bookTypeDefs } from "../modules/book/index.js";
import { rootTypeDefs } from "./root.typeDefs.js";

export const typeDefs = [rootTypeDefs, authorTypeDefs, bookTypeDefs];

export const resolvers = {
  Query: {
    ...authorResolvers.Query,
    ...bookResolvers.Query,
  },
  Mutation: {
    ...authorResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
  Book: bookResolvers.Book,
};
