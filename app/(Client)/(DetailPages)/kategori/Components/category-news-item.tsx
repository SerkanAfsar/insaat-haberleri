import NewsLink from "@/app/(Client)/Components/Common/news-link";
import { CategoryDetailNewsItemProps } from "@/app/(Client)/Components/types";
import { dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import Image from "next/image";

export default function CategoryNewsItem({
  item,
}: {
  item: CategoryDetailNewsItemProps & {
    categoryName: string;
  };
}) {
  const imageUrl = getImageFromCdn(item.imageId);

  return (
    <article className="flex w-full flex-row items-start gap-4 border-b border-[#eee] pb-6 last:border-none">
      <Image
        src={imageUrl.medium}
        width={300}
        height={200}
        className="h-auto object-contain object-center"
        alt={item.title}
      />
      <header className="flex w-full flex-col gap-2">
        <NewsLink
          categoryName={item.categoryName}
          newsId={item.id}
          title={item.title}
        >
          <h4 className="font-oswald text-lg font-bold text-black">
            {item.title}
          </h4>
        </NewsLink>
        <time
          className="text-xs text-gray-400"
          dateTime={item.createdAt.toISOString()}
        >
          {dateTimeConvert(item.createdAt)}
        </time>
        <p className="font-openSans text-sm text-[#333]">
          {item.subDescription}
        </p>
      </header>
    </article>
  );
}
