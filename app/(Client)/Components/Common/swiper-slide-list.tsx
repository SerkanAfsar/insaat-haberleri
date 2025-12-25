"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SliderProps } from "../types";
import SlideNewsItem from "./slide-news-item";

export default function SwiperSlideList({
  newses,
  nextClass,
  prevClass,
}: SliderProps) {
  return (
    <div className="group relative h-[350px] w-full overflow-hidden">
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
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        className="block h-full"
      >
        {newses.map((item, index) => (
          <SwiperSlide key={index} className="block h-full">
            <SlideNewsItem news={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
