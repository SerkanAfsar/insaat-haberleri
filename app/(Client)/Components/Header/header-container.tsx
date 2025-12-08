"use client";

import HeaderSearch from "./header-seach";

import { getCategoryListClientService } from "@/ClientServices/news.clientservice";
import HeaderNav from "./header-nav";
import HeaderMobileMenuAside from "./header-mobile-menu-aside";

export type HeaderContainerProps = {
  categories: Awaited<ReturnType<typeof getCategoryListClientService>>;
};

export default function HeaderContainer({ categories }: HeaderContainerProps) {
  return (
    <header className="relative z-10 block w-full">
      <div className="font-roboto bg-theme-secodary relative container mt-5 flex items-center text-white">
        <HeaderMobileMenuAside categories={categories} />
        <HeaderNav categories={categories} />
        <HeaderSearch className="ml-auto transition-all duration-300 hover:cursor-pointer hover:bg-gray-700" />
      </div>
    </header>
  );
}
