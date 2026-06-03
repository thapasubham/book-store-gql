import { bookResolvers, bookTypeDefs } from "../modules/book/index.js";

export const typeDefs = [bookTypeDefs];

export const resolvers = {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
  },
};
