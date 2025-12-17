import { getImageFromCdn } from "@/lib/utils";
import Image from "next/image";
import { NewsDetailProps } from "../types/news.types";

export default function NewsDetail({
  createdAt,
  imageId,
  subDescription,
  content,
  title,
}: NewsDetailProps) {
  console.log(createdAt);
  const imageUrl = getImageFromCdn(imageId);

  return (
    <article className="font-openSans flex w-full flex-col gap-4 text-[#333]">
      <header className="flex flex-col gap-4">
        <h1 className="font-oswald text-2xl font-bold">{title}</h1>
        <Image
          src={imageUrl.ExtraLarge}
          width={500}
          height={400}
          className="h-auto w-full object-cover object-center"
          alt={title}
        />
        <h2 className="leading-8 font-bold">{subDescription}</h2>
      </header>
      <div
        className="prose customNews block w-full max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </article>
  );
}
