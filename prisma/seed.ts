// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.question.create({
    data: {
      category: 'Math',
      content: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1,
    },
  });
}

main().then(() => prisma.$disconnect());
