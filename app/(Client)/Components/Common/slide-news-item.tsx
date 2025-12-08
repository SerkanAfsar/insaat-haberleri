import { getImageFromCdn } from "@/lib/utils";
import { SliderProps } from "./swiper-slide-list";
import Image from "next/image";

export type SlideNewsItemProps = {
  news: SliderProps["newses"][number];
  slideType: "first" | "second";
};
export default function SlideNewsItem({
  news,
  slideType = "first",
}: SlideNewsItemProps) {
  const imgUrl = getImageFromCdn(news.imageId!);
  const dateTime = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "full",
  }).format(news.createdAt);
  return (
    <article className="flex w-full flex-col gap-2">
      <Image
        src={imgUrl?.ExtraLarge || "deneme"}
        alt={news.title}
        width={500}
        height={400}
        className="m-0 w-full object-cover object-center"
      />
      {slideType == "first" ? (
        <>
          <h3 className="font-roboto m-0 text-3xl font-semibold">
            {news.title}
          </h3>
          <time
            dateTime={`${news.createdAt}`}
            className="text-xs text-gray-500"
          >
            {dateTime}
          </time>
          <p className="line-clamp-4 text-sm">{news.subDescription}</p>
        </>
      ) : (
        <div></div>
      )}
    </article>
  );
}
