import DataLoader from "dataloader";
import type { datasource } from "../datasource/index.js";
import type { Author } from "../modules/author/author.types.js";

export function createLoaders(ds: typeof datasource) {
  const authorById = new DataLoader<string, Author | undefined>(async (ids) =>
    ds.authorService.findByIds([...ids]),
  );

  return { authorById };
}

export type Loaders = ReturnType<typeof createLoaders>;
