import ContainerWrapper from "@/app/(Client)/Components/Common/container-wrapper";
import NewsLetter from "@/app/(Client)/Components/Common/newsletter";
import SocialLinksSection from "@/app/(Client)/Components/Common/social-links-section";
import SpecialNews from "@/app/(Client)/Components/Common/special-news";
import { DetailPageLayoutProps } from "../../haberler/types/news.types";
import TabList from "@/app/(Client)/Components/Common/tab-list";
import { getTabsListCacheService } from "@/CacheFunctions";
import { Suspense } from "react";
import CommonWrapper from "@/app/(Client)/Wrappers/common-wrapper";
import { mostReadede3NewsList } from "@/ClientServices/news.clientservice";

export default async function Layout({
  children,
  params,
}: DetailPageLayoutProps) {
  const { slug } = await params;
  const id = Number(slug[1]);

  return (
    <ContainerWrapper>
      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="w-full space-y-8 xl:w-[65%]">{children}</div>
        <div className="flex w-full flex-col gap-8 xl:w-[35%]">
          <Suspense fallback={<div>Loading...</div>}>
            <CommonWrapper
              component={TabList}
              func={() => getTabsListCacheService(id)}
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
