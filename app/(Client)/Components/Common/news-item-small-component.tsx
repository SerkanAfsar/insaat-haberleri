import Image from "next/image";
import { dateTimeConvert, getImageFromCdn } from "@/lib/utils";
export type SmallNewsComponentProps = {
  imageId: string | null;
  title: string;
  subDescription: string;
  createdAt: Date;
};

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
        <h3 className="font-roboto -mt-1 text-sm font-bold text-black">
          {item.title}
        </h3>
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
