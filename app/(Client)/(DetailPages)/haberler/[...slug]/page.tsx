import {
  getAllNewsWithCategoryNameClientService,
  getNewsById,
  relatedNewsList,
} from "@/ClientServices/news.clientservice";
import { Metadata } from "next";

import { notFound } from "next/navigation";
import NewsDetail from "../Components/news-detail";
import Slider3Section from "@/app/(Client)/Sections/MainPage/slider-3-section";
import { slugUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = Number(slug[2]);

  const result = await getNewsById(id);

  return {
    title: result?.seoTitle,
    description: result?.seoDescription,
    robots: "index,follow",
    publisher: "İnşaat Haberleri",
    authors: [
      {
        name: "İnşaat Haberleri",
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
    ],

    openGraph: {
      title: result?.seoTitle ?? "İnşaat Haberleri",
      description: result?.seoDescription ?? "İnşaat Haberleri",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug.join("/")}`,
      locale: "tr_TR",
      siteName: "İnşaat Haberleri",
      authors: ["İnşaat Haberleri"],
      emails: ["info@insaathaberleri.org"],
    },

    twitter: {
      card: "summary",
      description: result?.seoDescription ?? "İnşaat Haberleri",
      title: result?.seoTitle ?? "İnşaat Haberleri",
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
  const { slug }: { slug: string[] } = await params;

  if (slug.length != 3) {
    return notFound();
  }

  const id = Number(slug[2]);

  if (isNaN(id)) {
    return notFound();
  }

  const newsDetailData = await getNewsById(id);

  if (!newsDetailData) {
    return notFound();
  }

  // const readedCountResult = await updateReadedCountNewsClientServe(id);

  const relatedNews = await relatedNewsList(
    newsDetailData.categoryId,
    newsDetailData.id,
  );

  return (
    <>
      <NewsDetail
        createdAt={newsDetailData.createdAt}
        imageId={newsDetailData.imageId}
        subDescription={newsDetailData.subDescription}
        title={newsDetailData.title}
        content={newsDetailData.content}
        readedCount={newsDetailData.readedCount}
        sourceUrl={newsDetailData.sourceUrl ?? "İnşaat Haberleri"}
      />
      <Slider3Section newses={relatedNews} title="Benzer Haberler" />
    </>
  );
}

export async function generateStaticParams() {
  const result = await getAllNewsWithCategoryNameClientService();

  return result.map((item) => ({
    slug: [
      slugUrl(item.category.categoryName),
      slugUrl(item.title),
      item.id.toString(),
    ],
  }));
}
