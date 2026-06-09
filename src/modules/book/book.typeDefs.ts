export const bookTypeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    author: Author!
    publishedYear: Int
  }

  type BookConnection {
    nodes: [Book!]!
    pageInfo: PageInfo!
  }

  input CreateBookInput {
    title: String!
    authorId: ID!
    publishedYear: Int
  }

  extend type Query {
    books(pagination: PaginationInput): BookConnection!
    book(id: ID!): Book
  }

  extend type Mutation {
    addBook(input: CreateBookInput!): Book!
  }
`;
