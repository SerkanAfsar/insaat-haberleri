import {
  getLastNewsClientService,
  getLastNewsSkippedClientService,
  getSkipped12NewsClientService,
  mostReadedNewsClientService,
} from "@/ClientServices/news.clientservice";

import dynamic from "next/dynamic";
import MainPageSkipped12 from "../Sections/MainPage/main-page-skipped-12";

const CustomWrapper = dynamic(
  () => import("../Components/Common/custom-wrapper"),
);
const SwiperSlideList = dynamic(
  () => import("../Components/Common/swiper-slide-list"),
);
const Slider3Section = dynamic(
  () => import("../Sections/MainPage/slider-3-section"),
);
const MainPageLastNewsSkipped = dynamic(
  () => import("../Sections/MainPage/main-page-last-news-skipped"),
);

export type MainPageContainerProps = {
  lastNews: Awaited<ReturnType<typeof getLastNewsClientService>>;
  lastSkippedNews: Awaited<ReturnType<typeof getLastNewsSkippedClientService>>;
  mostReadedNews: Awaited<ReturnType<typeof mostReadedNewsClientService>>;
  mostReaded12Skipped?: Awaited<
    ReturnType<typeof getSkipped12NewsClientService>
  >;
};

export default function MainPageContainer({
  lastNews,
  lastSkippedNews,
  mostReadedNews,
  mostReaded12Skipped,
}: MainPageContainerProps) {
  return (
    <div className="container mx-auto mt-4">
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="w-full space-y-8 xl:w-[65%]">
          <SwiperSlideList
            newses={lastNews.slice(0, 3)}
            nextClass="next1"
            prevClass="prev1"
          />
          <Slider3Section newses={lastNews.slice(3, 6)} />
          <CustomWrapper
            className="mt-20 flex flex-col gap-4 xl:flex-row"
            component="section"
          >
            {lastSkippedNews.map((item, index) => {
              return <MainPageLastNewsSkipped newsList={item} key={index} />;
            })}
          </CustomWrapper>
          <SwiperSlideList
            newses={mostReadedNews}
            nextClass="next2"
            prevClass="prev2"
          />
          <MainPageSkipped12
            items={mostReaded12Skipped}
            className="mt-20 block"
          />
        </div>
        <div className="w-full xl:w-[35%]"></div>
      </div>
    </div>
  );
}
