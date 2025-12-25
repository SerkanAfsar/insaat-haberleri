import { getCategoryDetailWithPaginatitedNews } from "@/ClientServices/category.clientservice";

export async function getTabsListCacheService(categoryId?: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/newses/tab-list?id=${categoryId}`,
    {
      next: {
        revalidate: 3000,
        tags: ["tabsList"],
      },
      cache: "default",
    },
  );

  if (!response.ok) {
    throw new Error("Tabs List Error");
  }
  const result = await response.json();
  return result;
}

export async function getMostReaded3CacheService() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/newses/most-readed`,
    {
      next: {
        revalidate: 3000,
        tags: ["mostReaded"],
      },
      cache: "default",
    },
  );

  if (!response.ok) {
    throw new Error("Most Readed Error");
  }
  const result = await response.json();
  return result;
}

export async function getNewsDetailCacheService(newsId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/newses/${newsId}`,
    {
      next: {
        revalidate: 10000,
        tags: ["newsDetail", `newsDetail_${newsId}`],
      },
      cache: "default",
    },
  );

  if (!response.ok) {
    throw new Error("News Detail Error");
  }
  const result = await response.json();
  return result;
}

export async function getCategoryDetailCacheService(
  categoryId: number,
  page: number,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/categorydetail?id=${categoryId}&page=${page}`,
    {
      method: "GET",
      next: {
        tags: ["categories", `category_${categoryId}`],
        revalidate: 3000,
      },
      cache: "force-cache",
    },
  );
  if (!response.ok && response.status != 404) {
    throw new Error("Error Accoured");
  }
  const result = await response.json();
  return result as Awaited<
    ReturnType<typeof getCategoryDetailWithPaginatitedNews>
  >;
}
