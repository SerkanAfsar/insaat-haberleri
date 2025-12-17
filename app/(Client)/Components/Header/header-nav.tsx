import Link from "next/link";

import { categorySlugUrl, dateTimeConvert, getImageFromCdn } from "@/lib/utils";
import Image from "next/image";
import NewsLink from "../Common/news-link";
import { HeaderNavProps } from "../types";

export default function HeaderNav({ categories }: HeaderNavProps) {
  return (
    <nav className="font-oswald hidden items-center xl:flex">
      <Link
        href={"/"}
        title="Anasayfa"
        className="hover:bg-theme-primary p-4 text-[18px] font-medium uppercase transition-all duration-200 ease-in-out"
      >
        Anasayfa
      </Link>
      {categories.slice(0, 6).map((category) => {
        const categoryUrl = categorySlugUrl({
          categoryName: category.categoryName,
          categoryId: category.id,
        });
        return (
          <div key={category.id} className="group">
            <Link
              href={categoryUrl}
              title={category.categoryName}
              className="hover:bg-theme-primary group-hover:bg-theme-primary block p-4 text-[18px] font-medium uppercase transition-all duration-200 ease-in-out"
            >
              {category.categoryName}
            </Link>
            <div className="group-hover:animate-fadeUp absolute top-full right-0 left-0 hidden grid-cols-4 gap-4 border bg-white p-4 text-black shadow group-hover:grid">
              <h3 className="col-span-4 block text-lg font-bold uppercase">
                {category.categoryName} Son Haberler
              </h3>
              {category.Newses.map((newsItem, index) => {
                const url = getImageFromCdn(newsItem.imageId).small;
                return (
                  <NewsLink
                    key={index}
                    categoryName={category.categoryName}
                    newsId={newsItem.id}
                    title={newsItem.title}
                  >
                    <Image
                      src={url}
                      width={200}
                      height={150}
                      className="border-theme-secodary h-[150px] w-full border-2 object-center"
                      alt={newsItem.title}
                    />
                    <h4 className="my-2 line-clamp-2 text-sm font-semibold">
                      {newsItem.title}
                    </h4>
                    <time
                      className="mt-auto text-xs text-gray-600"
                      dateTime={newsItem.createdAt.toISOString()}
                    >
                      {dateTimeConvert(newsItem.createdAt)}
                    </time>
                  </NewsLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
