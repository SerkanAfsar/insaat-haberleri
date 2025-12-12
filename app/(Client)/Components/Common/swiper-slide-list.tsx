"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";

const SlideNewsItem = dynamic(() => import("./slide-news-item"));
import { MainPageContainerProps } from "../../Containers/main-page-container";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SliderProps = {
  newses: MainPageContainerProps["lastNews"];
  nextClass?: string;
  prevClass?: string;
};
export default function SwiperSlideList({
  newses,
  nextClass,
  prevClass,
}: SliderProps) {
  return (
    <div className="group relative w-full overflow-hidden xl:h-[400px]">
      <div className="invisible absolute top-0 right-0 z-10 text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
        <button
          type="button"
          className={cn(
            "hover:bg-theme-primary cursor-pointer bg-black/30 p-2 transition-all duration-300",
            prevClass,
          )}
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          className={cn(
            "hover:bg-theme-primary cursor-pointer bg-black/30 p-2 transition-all duration-300",
            nextClass,
          )}
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
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        className="h-full"
      >
        {newses.map((item, index) => (
          <SwiperSlide key={index} className="h-full">
            <SlideNewsItem news={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
