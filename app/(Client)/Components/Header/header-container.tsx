"use client";

import dynamic from "next/dynamic";
const HeaderSearch = dynamic(() => import("./header-seach"));
const HeaderNav = dynamic(() => import("./header-nav"));
const HeaderMobileMenuAside = dynamic(
  () => import("./header-mobile-menu-aside"),
);
import { HeaderContainerProps } from "../types";

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
