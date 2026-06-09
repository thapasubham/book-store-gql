export const authorTypeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    name: String!
    bio: String
    books(pagination: PaginationInput): BookConnection!
  }

  type AuthorConnection {
    nodes: [Author!]!
    pageInfo: PageInfo!
  }

  input CreateAuthorInput {
    name: String!
    bio: String
  }

  extend type Query {
    authors(pagination: PaginationInput): AuthorConnection!
    author(id: ID!): Author
  }

  extend type Mutation {
    addAuthor(input: CreateAuthorInput!): Author!
  }
`;
