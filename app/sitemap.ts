import { getCategoryListWithNewsCount } from "@/ClientServices/category.clientservice";
import {
  getAllNewsWithCategoryNameClientService,
  getLastNewsClientService,
} from "@/ClientServices/news.clientservice";

import { categorySlugUrl, newsSlugUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_NAME!;

  const categories = await getCategoryListWithNewsCount();

  const arr: MetadataRoute.Sitemap = [];

  categories.map((item) => {
    const categoryUrl = categorySlugUrl({
      categoryName: item.categoryName,
      categoryId: item.id,
    });

    arr.push({
      url: `${siteUrl}${categoryUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });

    const pageSize = Math.ceil(item._count.Newses / 10);

    for (let i = 1; i < pageSize + 1; i++) {
      arr.push({
        url: `${siteUrl}${categoryUrl}?page=${i}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      });
    }
  });

  const newsList = await getAllNewsWithCategoryNameClientService();

  newsList.map((item) => {
    const url = newsSlugUrl({
      newsTitle: item.title,
      categoryName: item.category.categoryName,
      id: item.id,
    });

    arr.push({
      url: `${siteUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...arr,
  ];
}
