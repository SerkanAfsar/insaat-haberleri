import {
  getNewsById,
  relatedNewsList,
} from "@/ClientServices/news.clientservice";

import dynamicImport from "next/dynamic";
import { notFound } from "next/navigation";

const NewsDetail = dynamicImport(() => import("../Components/news-detail"));
const Slider3Section = dynamicImport(
  () => import("../../../Sections/MainPage/slider-3-section"),
);

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
      />
      <Slider3Section newses={relatedNews} title="Benzer Haberler" />
    </>
  );
}

export const dynamic = "force-dynamic";
