import { getCategoryDetailWithPaginatitedNews } from "@/ClientServices/category.clientservice";
import { notFound } from "next/navigation";
import CategoryNewsItem from "../Components/category-news-item";
import SmallSectionTitle from "@/app/(Client)/Components/Common/small-section-title";
import CategoryPagination from "../Components/category-pagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page: number }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  const categoryId = Number(slug[1]);

  if (isNaN(categoryId)) {
    return notFound();
  }

  const categoryItem = await getCategoryDetailWithPaginatitedNews(
    categoryId,
    page ? page : 1,
  );

  if (!categoryItem) {
    return notFound();
  }

  return (
    <section className="flex flex-col space-y-6">
      <SmallSectionTitle title={`${categoryItem.categoryName} Haberleri`} />
      {categoryItem.Newses.map((item) => (
        <CategoryNewsItem
          key={item.id}
          item={{ ...item, categoryName: categoryItem.categoryName }}
        />
      ))}
      <CategoryPagination
        pageCount={Math.ceil(categoryItem._count.Newses / 10)}
      />
    </section>
  );
}
