import { DEFAULT_SEED_AUTHORS } from "../../seed/author.seed.js";
import type { Author, CreateAuthorInput } from "./author.types.js";

export class AuthorStore {
  private readonly authors: Author[];
  private nextId: number;

  constructor(seedAuthors: Author[] = DEFAULT_SEED_AUTHORS) {
    this.authors = [...seedAuthors];
    this.nextId = this.authors.length + 1;
  }

  findAll(): Promise<Author[]> {
    return Promise.resolve([...this.authors]);
  }

  findById(id: string): Promise<Author | undefined> {
    return Promise.resolve(this.authors.find((author) => author.id === id));
  }

  create(input: CreateAuthorInput): Promise<Author> {
    const author: Author = {
      id: String(this.nextId++),
      name: input.name,
      ...(input.bio !== undefined ? { bio: input.bio } : {}),
    };

    this.authors.push(author);
    return Promise.resolve(author);
  }
}
