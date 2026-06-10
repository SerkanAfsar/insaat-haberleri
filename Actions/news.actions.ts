"use server";

import { prisma } from "@/lib/db";
import { revalidateTag } from "next/cache";

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

export async function updateCacheTags(tagsList: string[]) {
  for (const item of tagsList) {
    revalidateTag(item, "default");
  }
}
