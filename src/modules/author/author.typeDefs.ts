export const authorTypeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    name: String!
    bio: String
    books: [Book!]!
  }

  input CreateAuthorInput {
    name: String!
    bio: String
  }

  extend type Query {
    authors: [Author!]!
    author(id: ID!): Author
  }

  extend type Mutation {
    addAuthor(input: CreateAuthorInput!): Author!
  }
`;
