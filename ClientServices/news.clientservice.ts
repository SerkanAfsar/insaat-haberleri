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
          id: true,
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
              id: true,
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
      id: true,
    },
  });
}

export async function LatestTabListNews(categoryId: number | undefined) {
  return await prisma.newses.findMany({
    where: {
      categoryId: categoryId ? categoryId : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      imageId: true,
      category: {
        select: {
          categoryName: true,
        },
      },
    },

    take: 5,
  });
}

export async function PopularTabListNews(categoryId: number | undefined) {
  return await prisma.newses.findMany({
    where: {
      categoryId: categoryId ? categoryId : undefined,
    },
    orderBy: {
      readedCount: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      imageId: true,
      category: {
        select: {
          categoryName: true,
        },
      },
    },

    take: 5,
  });
}

export async function RandomTabListNews(categoryId: number | undefined) {
  const count = await prisma.newses.count({
    where: categoryId !== undefined ? { categoryId } : undefined,
  });

  const skip = Math.floor(Math.random() * count);

  return await prisma.newses.findMany({
    where: categoryId !== undefined ? { categoryId } : undefined,
    take: 5,
    select: {
      id: true,
      title: true,
      createdAt: true,
      imageId: true,
      category: {
        select: {
          categoryName: true,
        },
      },
    },

    skip,
  });
}

export async function getNewsById(id: number) {
  return await prisma.newses.findUnique({
    where: { id },
  });
}

export async function relatedNewsList(categoryId: number, newsId: number) {
  return prisma.newses.findMany({
    where: {
      categoryId,
      id: {
        not: newsId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
    take: 3,
  });
}

export async function mostReadede3NewsList() {
  return prisma.newses.findMany({
    orderBy: {
      readedCount: "desc",
    },
    include: {
      category: true,
    },
    take: 3,
  });
}
