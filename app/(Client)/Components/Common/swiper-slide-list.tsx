"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import SlideNewsItem from "./slide-news-item";
import { MainPageContainerProps } from "../MainPage/main-page-container";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

export type SliderProps = {
  newses: MainPageContainerProps["lastNews"];
};
export default function SwiperSlideList({ newses }: SliderProps) {
  return (
    <div className="group relative max-h-[600px] w-full overflow-hidden">
      <div className="invisible absolute top-0 right-0 z-10 text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        <button
          type="button"
          className="hover:bg-theme-primary swiper1-button-prev-custom cursor-pointer bg-black/30 p-2 transition-all duration-300"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          className="hover:bg-theme-primary swiper1-button-next-custom cursor-pointer bg-black/30 p-2 transition-all duration-300"
        >
          <ChevronRight size={15} />
        </button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper1-button-next-custom",
          prevEl: ".swiper1-button-prev-custom",
        }}
      >
        {newses.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideNewsItem news={item} slideType="first" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
