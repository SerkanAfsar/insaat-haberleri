import ContainerWrapper from "@/app/(Client)/Components/Common/container-wrapper";
import NewsLetter from "@/app/(Client)/Components/Common/newsletter";
import SocialLinksSection from "@/app/(Client)/Components/Common/social-links-section";

import SpecialNews from "@/app/(Client)/Components/Common/special-news";
import { DetailPageLayoutProps } from "../../haberler/types/news.types";

import TabList from "@/app/(Client)/Components/Common/tab-list";
import {
  getMostReaded3CacheService,
  getTabsListCacheService,
} from "@/CacheFunctions";

export default async function Layout({
  children,
  params,
}: DetailPageLayoutProps) {
  const { slug } = await params;
  const id = Number(slug[1]);

  const { latestNews, popularNews, randomNews } =
    await getTabsListCacheService(id);

  const most3NewsData = await getMostReaded3CacheService();

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
          <SpecialNews data={most3NewsData} />
        </div>
      </div>
    </ContainerWrapper>
  );
}

export const revalidate = 3600;
