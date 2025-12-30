"use server";
import prisma from "@/lib/db";

export async function ActionUpdateNewsCount(newsId: number) {
  const result = await prisma.newses.update({
    where: {
      id: newsId,
    },
    data: {
      readedCount: {
        increment: 1,
      },
    },
  });
  return result.readedCount;
}
