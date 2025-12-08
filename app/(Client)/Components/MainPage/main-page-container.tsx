import { getLastNewsClientService } from "@/ClientServices/news.clientservice";
import SwiperSlideList from "../Common/swiper-slide-list";
import Slider3Section from "../Sections/slider-3-section";

export type MainPageContainerProps = {
  lastNews: Awaited<ReturnType<typeof getLastNewsClientService>>;
};

export default function MainPageContainer({
  lastNews,
}: MainPageContainerProps) {
  return (
    <div className="container mx-auto mt-4">
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="w-full xl:w-[70%]">
          <SwiperSlideList newses={lastNews.slice(0, 3)} />
          <Slider3Section newses={lastNews.slice(3, 6)} />
        </div>
        <div className="w-full xl:w-[30%]"></div>
      </div>
    </div>
  );
}
