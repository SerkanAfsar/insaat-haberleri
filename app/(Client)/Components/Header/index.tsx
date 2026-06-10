import { Suspense } from "react";
import ContainerWrapper from "../Common/container-wrapper";
import HeaderMobileMenuAside from "./header-mobile-menu-aside";
import HeaderNav from "./header-nav";
import HeaderSearch from "./header-seach";
import CommonWrapper from "../../Wrappers/common-wrapper";
import { getCategoryListClientService } from "@/ClientServices/news.clientservice";

export default function Header() {
  // const categories = await getCategoryListCacheFunction();

  return (
    <header className="relative z-10 block w-full">
      <ContainerWrapper className="text-theme-primary font-openSans text-2xl font-bold uppercase">
        İnşaat Haberleri
      </ContainerWrapper>
      <ContainerWrapper className="font-roboto bg-theme-secodary relative mt-5 flex items-center text-white">
        <Suspense fallback={<div>Loading</div>}>
          <CommonWrapper
            component={HeaderMobileMenuAside}
            func={getCategoryListClientService}
            propName="categories"
          />
        </Suspense>
        <Suspense fallback={<div>Loading</div>}>
          <CommonWrapper
            component={HeaderNav}
            func={getCategoryListClientService}
            propName="categories"
          />
        </Suspense>

        <HeaderSearch className="ml-auto transition-all duration-300 hover:cursor-pointer hover:bg-gray-700" />
      </ContainerWrapper>
    </header>
  );
}
