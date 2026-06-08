import { authResolvers } from "../modules/auth/auth.resolvers.js";
import { authTypeDefs } from "../modules/auth/auth.typeDefs.js";
import { authorResolvers, authorTypeDefs } from "../modules/author/index.js";
import { bookResolvers, bookTypeDefs } from "../modules/book/index.js";
import { rootTypeDefs } from "./root.typeDefs.js";

export const typeDefs = [
  rootTypeDefs,
  authTypeDefs,
  authorTypeDefs,
  bookTypeDefs,
];

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...authorResolvers.Query,
    ...bookResolvers.Query,
  },
  Mutation: {
    ...authorResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
  Author: authorResolvers.Author,
  Book: bookResolvers.Book,
};
