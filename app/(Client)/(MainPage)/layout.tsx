import { Suspense } from "react";
import ContainerWrapper from "../Components/Common/container-wrapper";
import NewsLetter from "../Components/Common/newsletter";
import SocialLinksSection from "../Components/Common/social-links-section";
import SpecialNews from "../Components/Common/special-news";
import TabList from "../Components/Common/tab-list";
import CommonWrapper from "../Wrappers/common-wrapper";
import { getTabsListCacheService } from "@/CacheFunctions";
import { mostReadede3NewsList } from "@/ClientServices/news.clientservice";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContainerWrapper>
      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="w-full space-y-8 xl:w-[65%]">{children}</div>
        <div className="flex w-full flex-col gap-8 xl:w-[35%]">
          <Suspense fallback={<div>Loading...</div>}>
            <CommonWrapper
              component={TabList}
              func={getTabsListCacheService}
              propName="result"
            />
          </Suspense>
          <NewsLetter />
          <SocialLinksSection />
          <Suspense fallback={<div>Loading...</div>}>
            <CommonWrapper
              component={SpecialNews}
              func={mostReadede3NewsList}
              propName="data"
            />
          </Suspense>
        </div>
      </div>
    </ContainerWrapper>
  );
}
