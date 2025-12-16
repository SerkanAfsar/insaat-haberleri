import { dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import Image from "next/image";
import NewsLink from "./news-link";

export default function NewsItemComponentOne({ news }: { news: any }) {
  const imgUrl = getImageFromCdn(news.imageId);
  const dateTime = dateTimeConvert(news.createdAt);

  return (
    <article className="flex w-full flex-col gap-2">
      <Image
        src={imgUrl.small}
        alt={news.title}
        width={200}
        height={200}
        className="m-0 w-full object-cover object-center p-0 xl:h-[150px]"
      />
      <NewsLink
        categoryName={news.category.categoryName}
        newsId={news.id}
        title={news.title}
      >
        <h3 className="text-[14px] font-bold text-[#333]">{news.title}</h3>
      </NewsLink>
      <time
        className="text-xs text-[#999]"
        dateTime={`${news.createdAt.toISOString()}`}
      >
        {dateTime}
      </time>
    </article>
  );
}
