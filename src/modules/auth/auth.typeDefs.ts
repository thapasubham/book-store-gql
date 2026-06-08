export const authTypeDefs = /* GraphQL */ `
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String
    role: Role!
  }

  extend type Query {
    me: User
  }
`;
