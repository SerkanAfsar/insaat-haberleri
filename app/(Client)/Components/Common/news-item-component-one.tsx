import { getImageFromCdn } from "@/lib/utils";
import { SliderProps } from "./swiper-slide-list";
import Image from "next/image";

type SmallNewsComponentProps = {
  news: SliderProps["newses"][number];
};
export default function NewsItemComponentOne({
  news,
}: SmallNewsComponentProps) {
  const imgUrl = getImageFromCdn(news.imageId!);
  const dateTime = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "full",
  }).format(news.createdAt);

  return (
    <article className="flex w-full flex-col gap-2">
      <Image
        src={imgUrl?.small || ""}
        alt={news.title}
        width={200}
        height={200}
        className="m-0 w-full object-cover object-center p-0 xl:h-[150px]"
      />
      <h3 className="text-[14px] font-bold text-[#333]">{news.title}</h3>
      <time className="text-xs text-[#999]" dateTime={`${news.createdAt}`}>
        {dateTime}
      </time>
    </article>
  );
}
