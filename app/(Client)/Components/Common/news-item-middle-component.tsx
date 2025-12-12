import { cn, dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import Image from "next/image";
import { SmallNewsComponentProps } from "./news-item-small-component";

export default function NewsItemMiddleComponent({
  item,
}: {
  item: SmallNewsComponentProps & {
    categoryName: string;
    type: "first" | "second";
  };
}) {
  const imageSrc = getImageFromCdn(item.imageId).small;

  const dateTime = dateTimeConvert(item.createdAt);

  return (
    <article
      className={cn(
        "relative mb-8 flex w-full items-start space-y-2",
        item.type == "first" ? "flex-col" : "flex-row space-x-6",
      )}
    >
      <h2 className="bg-theme-primary font-oswald absolute top-0 mb-0 inline-block w-auto -translate-y-full p-3 text-white uppercase">
        {item.categoryName}
      </h2>
      <Image
        src={imageSrc}
        alt={item.title}
        width={360}
        height={200}
        className="h-[200px] shrink-0 grow-0 object-cover object-center"
      />
      <div className="flex flex-col space-y-2">
        <h3 className="font-roboto line-clamp-1 text-lg font-bold text-black">
          {item.title}
        </h3>
        <p className="font-openSans line-clamp-3 text-[13px] text-[#333]">
          {item.subDescription}
        </p>
        <time
          className="mt-auto font-sans text-xs font-semibold text-[#333]"
          dateTime={item.createdAt.toISOString()}
        >
          {dateTime}
        </time>
      </div>
    </article>
  );
}
