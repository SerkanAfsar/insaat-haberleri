import { notFound } from "next/navigation";
import CategoryNewsItem from "../Components/category-news-item";
import SmallSectionTitle from "@/app/(Client)/Components/Common/small-section-title";
import CategoryPagination from "../Components/category-pagination";
import { Metadata } from "next";

import { getCategoryDetailCacheService } from "@/CacheFunctions";
import { categorySlugUrl, slugUrl } from "@/lib/utils";
import { getCategoryListWithNewsCount } from "@/ClientServices/category.clientservice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = Number(slug[1]);

  const result = await getCategoryDetailCacheService(categoryId, 1);

  if (!result) {
    return {};
  }

  return {
    title: result.seoTitle,
    description: result.seoDescription,
    robots: "index,follow",
    publisher: "İnşaat Haberleri",
    authors: [
      {
        name: "İnşaat Haberleri",
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
    ],

    openGraph: {
      title: result.seoTitle ?? "İnşaat Haberleri",
      description: result.seoDescription ?? "İnşaat Haberleri",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug.join("/")}`,
      locale: "tr_TR",
      siteName: "İnşaat Haberleri",
      authors: ["İnşaat Haberleri"],
      emails: ["info@insaathaberleri.org"],
    },

    twitter: {
      card: "summary",
      description: result.seoDescription ?? "İnşaat Haberleri",
      title: result.seoTitle ?? "İnşaat Haberleri",
      creator: "@insaathaberleri",
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug.join("/")}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const categoryId = Number(slug[1]);
  const page = Number(slug[2]);

  if (isNaN(categoryId) || (slug[2] && isNaN(page))) {
    return notFound();
  }

  const categoryItem = await getCategoryDetailCacheService(
    categoryId,
    slug[2] ? page : 1,
  );

  const pageCount = categoryItem
    ? Math.ceil(categoryItem._count.Newses / 12)
    : 1;

  if (!categoryItem || page > pageCount) {
    return notFound();
  }

  const categoryUrl = categorySlugUrl({
    categoryName: categoryItem.categoryName,
    categoryId: categoryId,
  });

  return (
    <section className="flex flex-col space-y-6">
      <SmallSectionTitle title={`${categoryItem.categoryName} Haberleri`} />
      {categoryItem?.Newses.map((item) => (
        <CategoryNewsItem
          key={item.id}
          item={{ ...item, categoryName: categoryItem.categoryName }}
        />
      ))}
      <CategoryPagination url={categoryUrl} pageCount={pageCount} />
    </section>
  );
}

export async function generateStaticParams() {
  const result = await getCategoryListWithNewsCount();
  const arr: any = [];
  result.map((item) => {
    const url = slugUrl(item.categoryName);
    const newsPageCount = Math.ceil(item._count.Newses / 12);
    arr.push({
      slug: [url, item.id.toString()],
    });
    for (let i = 1; i < newsPageCount + 1; i++) {
      arr.push([url, item.id.toString(), i.toString()]);
    }
  });
  return arr;
}
