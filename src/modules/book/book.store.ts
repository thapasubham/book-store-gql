import type { Book, CreateBookInput } from "./book.types.js";

const seedBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949,
  },
];

const books: Book[] = [...seedBooks];
let nextId = books.length + 1;

export const bookStore = {
  findAll(): Book[] {
    return [...books];
  },

  findById(id: string): Book | undefined {
    return books.find((book) => book.id === id);
  },

  create(input: CreateBookInput): Book {
    const book: Book = {
      id: String(nextId++),
      title: input.title,
      author: input.author,
      ...(input.publishedYear !== undefined
        ? { publishedYear: input.publishedYear }
        : {}),
    };

    books.push(book);
    return book;
  },
};
