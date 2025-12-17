import { getCategoryListClientService } from "@/ClientServices/news.clientservice";
import { slugUrl } from "@/lib/utils";
import Link from "next/link";

export default async function FooterLinks() {
  const categories = await getCategoryListClientService();
  return (
    <section className="block w-[60%]">
      <h3 className="font-oswald mb-2 block text-xl font-bold text-white uppercase">
        Hızlı Menü
      </h3>
      <ul className="flex w-full flex-row flex-wrap gap-3">
        {categories.map((item, index) => (
          <li key={index}>
            <Link
              className="uppercase transition-all duration-300 hover:text-white"
              href={`/kategori/${slugUrl(item.categoryName)}/${item.id}`}
              title={item.categoryName}
            >
              {item.categoryName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
