import {
  getLastNewsClientService,
  getLastNewsSkippedClientService,
  getSkipped12NewsClientService,
  mostReadedNewsClientService,
} from "@/ClientServices/news.clientservice";
import dynamic from "next/dynamic";

const SwiperSlideList = dynamic(
  () => import("../Components/Common/swiper-slide-list"),
);

const Slider3Section = dynamic(
  () => import("../Sections/MainPage/slider-3-section"),
);

const CustomWrapper = dynamic(
  () => import("../Components/Common/custom-wrapper"),
);

const MainPageLastNewsSkipped = dynamic(
  () => import("../Sections/MainPage/main-page-last-news-skipped"),
);

const MainPageSkipped12 = dynamic(
  () => import("../Sections/MainPage/main-page-skipped-12"),
);

export default async function Home() {
  const [lastNewsResult, lastNewsSkipped, mostReaded, mostReaded12Skipped] =
    await Promise.all([
      getLastNewsClientService(),
      getLastNewsSkippedClientService(),
      mostReadedNewsClientService(),
      getSkipped12NewsClientService(),
    ]);

  return (
    <>
      <SwiperSlideList
        newses={lastNewsResult.slice(0, 3)}
        nextClass="next1"
        prevClass="prev1"
        key={0}
      />
      <Slider3Section newses={lastNewsResult.slice(3, 6)} key={1} />
      <CustomWrapper
        className="mt-20 flex flex-col gap-4 xl:flex-row"
        component="section"
      >
        {lastNewsSkipped.map((item, index) => {
          return <MainPageLastNewsSkipped newsList={item} key={index} />;
        })}
      </CustomWrapper>
      <SwiperSlideList
        newses={mostReaded}
        nextClass="next2"
        prevClass="prev2"
      />
      <MainPageSkipped12
        items={mostReaded12Skipped}
        className="mt-20 block"
        key={4}
      />
    </>
  );
}
