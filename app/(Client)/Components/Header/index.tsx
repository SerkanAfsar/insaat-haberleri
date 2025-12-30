import ContainerWrapper from "../Common/container-wrapper";
import HeaderMobileMenuAside from "./header-mobile-menu-aside";
import HeaderNav from "./header-nav";
import HeaderSearch from "./header-seach";
import { getCategoryListCacheFunction } from "@/CacheFunctions";

export default async function Header() {
  const categories = await getCategoryListCacheFunction();

  return (
    <header className="relative z-10 block w-full">
      <ContainerWrapper className="text-theme-primary font-openSans text-2xl font-bold uppercase">
        İnşaat Haberleri
      </ContainerWrapper>
      <ContainerWrapper className="font-roboto bg-theme-secodary relative mt-5 flex items-center text-white">
        <HeaderMobileMenuAside categories={categories} />
        <HeaderNav categories={categories} />
        <HeaderSearch className="ml-auto transition-all duration-300 hover:cursor-pointer hover:bg-gray-700" />
      </ContainerWrapper>
    </header>
  );
}
