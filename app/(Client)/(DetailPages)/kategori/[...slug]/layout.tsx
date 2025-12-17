import ContainerWrapper from "@/app/(Client)/Components/Common/container-wrapper";
import NewsLetter from "@/app/(Client)/Components/Common/newsletter";
import SocialLinksSection from "@/app/(Client)/Components/Common/social-links-section";
import TabList from "@/app/(Client)/Components/Common/tablist";
import {
  LatestTabListNews,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";
import { notFound } from "next/navigation";

import SpecialNews from "@/app/(Client)/Components/Common/special-news";
import { DetailPageLayoutProps } from "../../haberler/types/news.types";
import { GetCategoryByIdService } from "@/Services/Category.service";

export default async function Layout({
  children,
  params,
}: DetailPageLayoutProps) {
  const { slug } = await params;
  const id = Number(slug[1]);

  const categoryDetailData = await GetCategoryByIdService(id);

  if (!categoryDetailData) {
    return notFound();
  }

  const [latestNews, popularNews, randomNews] = await Promise.all([
    LatestTabListNews(categoryDetailData.id),
    PopularTabListNews(categoryDetailData.id),
    RandomTabListNews(categoryDetailData.id),
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
          <SpecialNews />
        </div>
      </div>
    </ContainerWrapper>
  );
}
