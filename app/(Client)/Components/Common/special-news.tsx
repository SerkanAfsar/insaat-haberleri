import { mostReadede3NewsList } from "@/ClientServices/news.clientservice";
import SmallSectionTitle from "./small-section-title";
import NewsItemMiddleComponent from "./news-item-middle-component";

type MostReadedResultType = Awaited<ReturnType<typeof mostReadede3NewsList>>;

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_NAME}/api/newses/most-readed`,
    {
      method: "GET",
      next: {
        tags: ["mostReaded"],
        revalidate: 300,
      },
      cache: "default",
    },
  );

  if (!response.ok) {
    throw new Error("Most Readed Error");
  }
  const result = await response.json();
  return result as MostReadedResultType;
}

export default async function SpecialNews() {
  const result = await getData();
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
