import Link from "next/link";
import { categorySlugUrl } from "@/lib/utils";
import { HeaderNavProps } from "../types";
import HeaderNavItem from "./header-nav-item";

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
        return <HeaderNavItem key={category.id} category={category} />;
      })}
      <div className="group">
        <span className="hover:bg-theme-primary group-hover:bg-theme-primary block cursor-pointer p-4 text-[18px] font-medium uppercase transition-all duration-200 ease-in-out">
          Diğer Kategoriler
        </span>
        <div className="group-hover:animate-fadeUp absolute top-full right-0 left-0 hidden w-full grid-cols-4 gap-4 border bg-white p-4 text-black shadow group-hover:grid">
          <h3 className="col-span-4 block text-lg font-bold uppercase">
            Diğer Kategoriler
          </h3>
          {categories.slice(6, categories.length).map((item) => {
            const url = categorySlugUrl({
              categoryName: item.categoryName,
              categoryId: item.id,
            });
            return (
              <Link
                href={url}
                className="underline"
                key={item.id}
                title={item.categoryName}
              >
                {item.categoryName} Haberleri
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
