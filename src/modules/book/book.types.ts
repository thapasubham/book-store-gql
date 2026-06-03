export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear?: number;
}

export interface CreateBookInput {
  title: string;
  author: string;
  publishedYear?: number;
}
