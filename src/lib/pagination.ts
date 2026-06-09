import { GraphQLError } from "graphql";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export interface PaginationInput {
  page?: number | null;
  pageSize?: number | null;
}

export interface PageInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

export interface NormalizedPagination {
  skip: number;
  take: number;
  page: number;
  pageSize: number;
}

export function normalizePagination(
  input?: PaginationInput | null,
): NormalizedPagination {
  const page = input?.page ?? DEFAULT_PAGE;
  const pageSize = input?.pageSize ?? DEFAULT_PAGE_SIZE;

  if (!Number.isInteger(page) || page < 1) {
    throw new GraphQLError("page must be a positive integer", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new GraphQLError("pageSize must be a positive integer", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const clampedPageSize = Math.min(pageSize, MAX_PAGE_SIZE);

  return {
    page,
    pageSize: clampedPageSize,
    skip: (page - 1) * clampedPageSize,
    take: clampedPageSize,
  };
}

export function buildPageInfo({
  page,
  pageSize,
  totalCount,
}: {
  page: number;
  pageSize: number;
  totalCount: number;
}): PageInfo {
  const totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / pageSize);

  return {
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1 && totalPages > 0,
  };
}

export function toPaginatedResult<T>(
  nodes: T[],
  totalCount: number,
  pagination: NormalizedPagination,
): PaginatedResult<T> {
  return {
    nodes,
    pageInfo: buildPageInfo({
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalCount,
    }),
  };
}
