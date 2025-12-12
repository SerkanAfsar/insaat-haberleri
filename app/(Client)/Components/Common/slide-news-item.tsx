import { dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import { SliderProps } from "./swiper-slide-list";
import Image from "next/image";

export type SlideNewsItemProps = {
  news: SliderProps["newses"][number];
};
export default function SlideNewsItem({ news }: SlideNewsItemProps) {
  const imgUrl = getImageFromCdn(news.imageId);
  const dateTime = dateTimeConvert(news.createdAt);

  return (
    <article className="relative flex h-full w-full flex-col gap-2">
      <div className="bg-theme-primary font-oswald absolute top-0 left-0 p-4 text-white uppercase">
        {news.category.categoryName}
      </div>
      <Image
        src={imgUrl.ExtraLarge}
        alt={news.title}
        width={500}
        height={400}
        className="m-0 h-full w-full object-cover object-center"
      />
      <div className="absolute right-0 bottom-0 left-0 flex w-full flex-col space-y-10 bg-black/60 p-4 text-white">
        <h3 className="font-roboto m-0 block text-2xl font-semibold">
          {news.title}
        </h3>
        <time
          dateTime={`${news.createdAt.toISOString()}`}
          className="mt-2 block text-sm"
        >
          {dateTime}
        </time>
      </div>
    </article>
  );
}
