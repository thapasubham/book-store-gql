import { GraphQLError } from "graphql";
import type {
  PaginatedResult,
  PaginationInput,
} from "../../lib/pagination.js";
import { normalizePagination, toPaginatedResult } from "../../lib/pagination.js";
import type { AuthorStore } from "./author.store.js";
import type { Author, CreateAuthorInput } from "./author.types.js";

export class AuthorService {
  constructor(private readonly store: AuthorStore) {}

  async findAll(
    paginationInput?: PaginationInput | null,
  ): Promise<PaginatedResult<Author>> {
    const pagination = normalizePagination(paginationInput);
    const { nodes, totalCount } =
      await this.store.findManyPaginated(pagination);
    return toPaginatedResult(nodes, totalCount, pagination);
  }

  findById(id: string): Promise<Author | undefined> {
    return this.store.findById(id);
  }

  findByIdOrThrow(id: string): Promise<Author> {
    return this.findById(id).then((author) => {
      if (!author) {
        throw new GraphQLError(`Author with id "${id}" not found`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return author;
    });
  }

  create(input: CreateAuthorInput): Promise<Author> {
    return this.store.create(input);
  }
}
