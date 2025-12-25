"use client";
import { dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import Image from "next/image";
import { NewsDetailProps } from "../types/news.types";
import ShareArticle from "./share-article";

export default function NewsDetail({
  createdAt,
  imageId,
  subDescription,
  content,
  title,
  readedCount,
}: NewsDetailProps) {
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
          fetchPriority="high"
          priority
        />
        <h2 className="leading-8 font-bold">{subDescription}</h2>
        <div className="flex w-full items-center justify-between">
          <time
            className="text-xs text-gray-500"
            dateTime={createdAt.toISOString()}
          >
            {dateTimeConvert(createdAt)}
          </time>
          <b className="text-xs">{readedCount} Okunma </b>
        </div>
      </header>
      <div
        className="prose customNews block w-full max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <ShareArticle />
    </article>
  );
}
