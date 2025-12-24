import ContainerWrapper from "@/app/(Client)/Components/Common/container-wrapper";
import NewsLetter from "@/app/(Client)/Components/Common/newsletter";
import SocialLinksSection from "@/app/(Client)/Components/Common/social-links-section";

import {
  getNewsById,
  LatestTabListNews,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";
import { notFound } from "next/navigation";

import { DetailPageLayoutProps } from "../types/news.types";

import TabList from "@/app/(Client)/Components/Common/tab-list";

export default async function Layout({
  children,
  params,
}: DetailPageLayoutProps) {
  const { slug } = await params;
  const id = Number(slug[2]);

  const newsDetailData = await getNewsById(id);

  if (!newsDetailData) {
    return notFound();
  }

  const categoryId = newsDetailData.categoryId;

  const [latestNews, popularNews, randomNews] = await Promise.all([
    LatestTabListNews(categoryId),
    PopularTabListNews(categoryId),
    RandomTabListNews(categoryId),
  ]);

  return (
    <ContainerWrapper>
      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="w-full space-y-8 xl:w-[65%]">{children}</div>
        <div className="flex w-full flex-col gap-8 xl:w-[35%]">
          <TabList
            latestNews={latestNews}
            popularNews={popularNews}
            randomNews={randomNews}
          />
          <NewsLetter />
          <SocialLinksSection />
          {/* <SpecialNews /> */}
        </div>
      </div>
    </ContainerWrapper>
  );
}
