export interface Book {
  id: string;
  title: string;
  authorId: string;
  publishedYear?: number;
}

export interface CreateBookInput {
  title: string;
  authorId: string;
  publishedYear?: number;
}
