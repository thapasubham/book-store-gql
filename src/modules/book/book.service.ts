import { GraphQLError } from "graphql";
import type {
  PaginatedResult,
  PaginationInput,
} from "../../lib/pagination.js";
import { normalizePagination, toPaginatedResult } from "../../lib/pagination.js";
import type { AuthorStore } from "../author/author.store.js";
import type { BookStore } from "./book.store.js";
import type { Book, CreateBookInput } from "./book.types.js";

export class BookService {
  constructor(
    private readonly store: BookStore,
    private readonly authorStore: AuthorStore,
  ) {}

  async findAll(
    paginationInput?: PaginationInput | null,
  ): Promise<PaginatedResult<Book>> {
    const pagination = normalizePagination(paginationInput);
    const { nodes, totalCount } =
      await this.store.findManyPaginated(pagination);
    return toPaginatedResult(nodes, totalCount, pagination);
  }

  async findByAuthorId(
    authorId: string,
    paginationInput?: PaginationInput | null,
  ): Promise<PaginatedResult<Book>> {
    const pagination = normalizePagination(paginationInput);
    const { nodes, totalCount } = await this.store.findByAuthorIdPaginated(
      authorId,
      pagination,
    );
    return toPaginatedResult(nodes, totalCount, pagination);
  }

  findById(id: string): Promise<Book | undefined> {
    return this.store.findById(id);
  }

  async create(input: CreateBookInput): Promise<Book> {
    const author = await this.authorStore.findById(input.authorId);
    if (!author) {
      throw new GraphQLError(
        `Author with id "${input.authorId}" does not exist`,
        { extensions: { code: "BAD_USER_INPUT" } },
      );
    }
    return this.store.create(input);
  }
}
