import prisma from "@/lib/db";

export async function getCategoryListClientService() {
  return await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      categoryName: true,
      id: true,
      Newses: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          title: true,
          imageId: true,
        },
        take: 4,
      },
    },
  });
}

export async function getLastNewsClientService() {
  return prisma.newses.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
}
