import {
  LatestTabListNews,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";
import { CACHE_KEYS } from "@/lib/utils";

import { cacheLife, cacheTag } from "next/cache";

export async function getTabsListCacheService(categoryId?: number) {
  "use cache";
  cacheTag(CACHE_KEYS.NEWS_LIST);
  cacheLife("days");

  const [latestNews, popularNews, randomNews] = await Promise.all([
    LatestTabListNews(categoryId),
    PopularTabListNews(categoryId),
    RandomTabListNews(categoryId),
  ]);
  return { latestNews, popularNews, randomNews };
}

// export async function getMostReaded3CacheService() {
//   "use cache";
//   cacheTag("most-readed");
//   cacheLife("days");

//   return await mostReadede3NewsList();
// }

// export async function getNewsDetailCacheService(newsId: number) {
//   const result = cache(
//     async () => {
//       return await getNewsById(newsId);
//     },
//     [newsId.toString()],
//     {
//       revalidate: 3600,
//       tags: [CACHE_KEYS.NEWS_DETAIL, `${CACHE_KEYS.NEWS_DETAIL}_${newsId}`],
//     },
//   );
//   return await result();
// }

// export async function getCategoryDetailCacheService(
//   categoryId: number,
//   page: number,
// ) {
//   const result = cache(
//     async () => {
//       return await getCategoryDetailWithPaginatitedNews(categoryId, page);
//     },
//     [categoryId.toString(), page.toString()],
//     {
//       revalidate: 3600,
//       tags: [
//         CACHE_KEYS.CATEGORY_DETAIL,
//         `${CACHE_KEYS.CATEGORY_DETAIL}_${categoryId.toString()}`,
//         `${CACHE_KEYS.CATEGORY_DETAIL}_${categoryId.toString()}_${page.toString()}`,
//       ],
//     },
//   );
//   return await result();
// }
