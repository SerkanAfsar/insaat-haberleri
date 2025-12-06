import { getCategoryListClientService } from "@/ClientServices/news.clientservice";
import { envVariables } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
export default async function Header() {
  const result = await getCategoryListClientService();
  return (
    <header className="block w-full">
      <div className="font-roboto bg-theme-secodary container mt-5">
        <nav className="font-oswald relative flex items-center text-white">
          <Link
            href={"#"}
            title="Anasayfa"
            className="hover:bg-theme-primary p-4 text-[18px] font-medium uppercase transition-all duration-200 ease-in-out"
          >
            Anasayfa
          </Link>
          {result.slice(0, 6).map((category) => {
            return (
              <div key={category.id} className="group">
                <Link
                  href={"#"}
                  title={category.categoryName}
                  className="hover:bg-theme-primary group-hover:bg-theme-primary block p-4 text-[18px] font-medium uppercase transition-all duration-200 ease-in-out"
                >
                  {category.categoryName}
                </Link>
                <div className="group-hover:animate-fadeUp bg-theme-primary absolute top-full right-0 left-0 hidden grid-cols-4 gap-4 p-4 group-hover:grid">
                  {category.Newses.map((newsItem, index) => {
                    const url = {
                      large: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${newsItem.imageId}/Big`,
                      medium: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${newsItem.imageId}/Medium`,
                      small: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${newsItem.imageId}/Small`,
                      ExtraLarge: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${newsItem.imageId}/ExtraLarge`,
                    } as const;
                    return (
                      <Link href={"#"} key={index} title={newsItem.title}>
                        <Image
                          src={url.medium}
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
      </div>
    </header>
  );
}
