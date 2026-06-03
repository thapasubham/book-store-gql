export const bookTypeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int
  }

  input CreateBookInput {
    title: String!
    author: String!
    publishedYear: Int
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(input: CreateBookInput!): Book!
  }
`;
