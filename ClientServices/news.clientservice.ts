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
          createdAt: true,
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
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
    take: 6,
  });
}

export async function getLastNewsSkippedClientService() {
  return prisma.newses.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 6,
    distinct: "categoryId",
    select: {
      category: {
        select: {
          categoryName: true,
          Newses: {
            select: {
              imageId: true,
              title: true,
              subDescription: true,
              createdAt: true,
            },
            take: 6,
          },
        },
      },
    },
    take: 2,
  });
}

export async function mostReadedNewsClientService() {
  return prisma.newses.findMany({
    distinct: "categoryId",
    orderBy: {
      readedCount: "desc",
    },
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });
}

export async function getSkipped12NewsClientService() {
  return await prisma.newses.findMany({
    skip: 12,
    take: 7,
    orderBy: {
      readedCount: "desc",
    },
    select: {
      category: {
        select: {
          categoryName: true,
        },
      },
      title: true,
      subDescription: true,
      imageId: true,
      createdAt: true,
    },
  });
}
