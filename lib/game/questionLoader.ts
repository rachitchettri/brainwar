import prisma from "@/lib/db/prisma";

export async function loadQuestions(category: string, count = 5) {
  const questions = await prisma.question.findMany({
    where: { category },
    take: count,
  });
  return questions;
}