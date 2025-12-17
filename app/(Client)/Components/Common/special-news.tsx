import { mostReadede3NewsList } from "@/ClientServices/news.clientservice";
import SmallSectionTitle from "./small-section-title";
import NewsItemMiddleComponent from "./news-item-middle-component";

export default async function SpecialNews() {
  const result = await mostReadede3NewsList();
  return (
    <section className="flex flex-col">
      <SmallSectionTitle title="En Çok Okunanlar" />
      <div className="flex flex-col gap-2 bg-[#333] p-6 !text-white [&>article]:last:mb-0">
        {result.map((item, index) => (
          <NewsItemMiddleComponent
            item={{
              categoryName: item.category.categoryName,
              createdAt: item.createdAt,
              imageId: item.imageId,
              title: item.title,
              subDescription: item.subDescription,
              type: "first",
              id: item.id,
              hideHeader: true,
            }}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
