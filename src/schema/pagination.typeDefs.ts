export const paginationTypeDefs = /* GraphQL */ `
  input PaginationInput {
    page: Int = 1
    pageSize: Int = 20
  }

  type PageInfo {
    page: Int!
    pageSize: Int!
    totalCount: Int!
    totalPages: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;
