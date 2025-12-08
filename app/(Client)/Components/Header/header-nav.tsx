import Link from "next/link";
import { HeaderContainerProps } from "./header-container";
import { getImageFromCdn } from "@/lib/utils";
import Image from "next/image";

export type HeaderNavProps = {
  categories: HeaderContainerProps["categories"];
};

export default function HeaderNav({ categories }: HeaderNavProps) {
  return (
    <nav className="font-oswald hidden items-center xl:flex">
      <Link
        href={"#"}
        title="Anasayfa"
        className="hover:bg-theme-primary p-4 text-[18px] font-medium uppercase transition-all duration-200 ease-in-out"
      >
        Anasayfa
      </Link>
      {categories.slice(0, 6).map((category) => {
        return (
          <div key={category.id} className="group">
            <Link
              href={"#"}
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
                const url = getImageFromCdn(newsItem.imageId ?? "");
                return (
                  <Link href={"#"} key={index} title={newsItem.title}>
                    <Image
                      src={url ? url.small : ""}
                      width={200}
                      height={150}
                      className="border-theme-secodary h-[150px] w-full border-2 object-center"
                      alt={newsItem.title}
                    />
                    <h4 className="mt-2 line-clamp-2 font-semibold">
                      {newsItem.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
