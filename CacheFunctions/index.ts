import { getCategoryDetailWithPaginatitedNews } from "@/ClientServices/category.clientservice";
import {
  getNewsById,
  LatestTabListNews,
  mostReadede3NewsList,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";
import { CACHE_KEYS } from "@/lib/utils";
import { unstable_cache as cache } from "next/cache";

export async function getTabsListCacheService(categoryId?: number) {
  const dependent = categoryId?.toString() ?? "undefined_category_dependent";

  const result = cache(
    async () => {
      const [latestNews, popularNews, randomNews] = await Promise.all([
        LatestTabListNews(categoryId),
        PopularTabListNews(categoryId),
        RandomTabListNews(categoryId),
      ]);
      return { latestNews, popularNews, randomNews };
    },
    [dependent],
    {
      revalidate: 3600,
      tags: [CACHE_KEYS.TAB_LIST],
    },
  );
  return await result();
}

export async function getMostReaded3CacheService() {
  const result = cache(
    async () => {
      return await mostReadede3NewsList();
    },
    [],
    { revalidate: 3600, tags: [CACHE_KEYS.MOST_READED] },
  );
  return await result();
}

export async function getNewsDetailCacheService(newsId: number) {
  const result = cache(
    async () => {
      return await getNewsById(newsId);
    },
    [newsId.toString()],
    {
      revalidate: 3600,
      tags: [CACHE_KEYS.NEWS_DETAIL, `${CACHE_KEYS.NEWS_DETAIL}_${newsId}`],
    },
  );
  return await result();
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
        tags: [CACHE_KEYS.CATEGORY_DETAIL, `category_${categoryId}`],
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
