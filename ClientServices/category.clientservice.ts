import prisma from "@/lib/db";

export async function getCategoryDetailWithPaginatitedNews(
  categorId: number,
  page: number,
) {
  return await prisma.category.findUnique({
    where: {
      id: categorId,
    },
    select: {
      categoryName: true,
      seoTitle: true,
      seoDescription: true,
      _count: {
        select: {
          Newses: true,
        },
      },
      Newses: {
        take: 10,
        skip: (page - 1) * 10,
        select: {
          title: true,
          subDescription: true,
          createdAt: true,
          imageId: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
