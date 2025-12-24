import Image from "next/image";
import { dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import NewsLink from "./news-link";
import { SmallNewsComponentProps } from "../types";

export default function NewsItemSmallComponent({
  item,
}: {
  item: SmallNewsComponentProps;
}) {
  const imageSrc = getImageFromCdn(item.imageId).small;
  const dateTime = dateTimeConvert(item.createdAt);

  return (
    <article className="flex w-full items-stretch space-x-4 border-b border-[#eee] pb-4">
      <Image
        src={imageSrc}
        alt={item.title}
        width={70}
        height={60}
        className="h-[60px] w-[70px] shrink-0 grow-0 object-cover object-center"
      />
      <div className="flex h-full flex-col gap-1">
        <NewsLink
          categoryName={item.categoryName}
          newsId={item.id}
          title={item.title}
        >
          <h3 className="font-roboto -mt-1 text-sm font-bold text-black">
            {item.title}
          </h3>
        </NewsLink>
        <time
          className="mt-auto font-sans text-xs font-semibold text-[#333]"
          // dateTime={item.createdAt.toISOString()}
        >
          {dateTime}
        </time>
      </div>
    </article>
  );
}
