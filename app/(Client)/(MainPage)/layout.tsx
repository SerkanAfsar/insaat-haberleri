import ContainerWrapper from "../Components/Common/container-wrapper";
import NewsLetter from "../Components/Common/newsletter";
import SocialLinksSection from "../Components/Common/social-links-section";
import SpecialNews from "../Components/Common/special-news";
import TabList from "../Components/Common/tab-list";
import {
  getMostReaded3CacheService,
  getTabsListCacheService,
} from "@/CacheFunctions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { latestNews, popularNews, randomNews } =
    await getTabsListCacheService(undefined);

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
