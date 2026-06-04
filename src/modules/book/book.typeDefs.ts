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

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

   type Mutation {
    addBook(input: CreateBookInput!): Book!
  }
`;
