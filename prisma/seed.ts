import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { DEFAULT_SEED_AUTHORS } from "../src/seed/author.seed.js";
import { DEFAULT_SEED_BOOKS } from "../src/seed/book.seed.js";

async function main(): Promise<void> {
  for (const author of DEFAULT_SEED_AUTHORS) {
    await prisma.author.upsert({
      where: { id: author.id },
      create: {
        id: author.id,
        name: author.name,
        bio: author.bio ?? null,
      },
      update: {
        name: author.name,
        bio: author.bio ?? null,
      },
    });
  }

  for (const book of DEFAULT_SEED_BOOKS) {
    await prisma.book.upsert({
      where: { id: book.id },
      create: {
        id: book.id,
        title: book.title,
        authorId: book.authorId,
        publishedYear: book.publishedYear ?? null,
      },
      update: {
        title: book.title,
        authorId: book.authorId,
        publishedYear: book.publishedYear ?? null,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
