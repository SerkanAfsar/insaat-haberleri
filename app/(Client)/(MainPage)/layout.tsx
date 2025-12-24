import {
  LatestTabListNews,
  mostReadede3NewsList,
  mostReadedNewsClientService,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";
import ContainerWrapper from "../Components/Common/container-wrapper";
import NewsLetter from "../Components/Common/newsletter";
import SocialLinksSection from "../Components/Common/social-links-section";

import SpecialNews from "../Components/Common/special-news";
import TabList from "../Components/Common/tab-list";
import { getTabsListData } from "../Functions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { latestNews, popularNews, randomNews } = await getTabsListData();
  const mostReaded3Data = await mostReadede3NewsList();
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
          <SpecialNews data={mostReaded3Data} />
        </div>
      </div>
    </ContainerWrapper>
  );
}

export const revalidate = 60;
