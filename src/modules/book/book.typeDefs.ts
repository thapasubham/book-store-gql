export const bookTypeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    author: Author!
    publishedYear: Int
  }

  input CreateBookInput {
    title: String!
    authorId: ID!
    publishedYear: Int
  }

  extend type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  extend type Mutation {
    addBook(input: CreateBookInput!): Book!
  }
`;
