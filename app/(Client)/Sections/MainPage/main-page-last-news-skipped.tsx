import NewsItemMiddleComponent from "../../Components/Common/news-item-middle-component";
import NewsItemSmallComponent from "../../Components/Common/news-item-small-component";

export type MainPageLastNewsSkippedProps = {
  newsList: any;
};
export default function MainPageLastNewsSkipped({
  newsList,
}: MainPageLastNewsSkippedProps) {
  const firstNewsItem = newsList.category.Newses.slice(0, 1)[0];
  const restItems = newsList.category.Newses.slice(
    1,
    newsList.category.Newses.length,
  ) as any[];
  return (
    <section className="flex w-full flex-col space-y-4 first:mb-10 xl:first:mb-0">
      <NewsItemMiddleComponent
        item={{
          ...firstNewsItem,
          categoryName: newsList.category.categoryName,
          type: "first",
        }}
      />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1">
        {restItems.map((newsItem, index) => {
          return (
            <NewsItemSmallComponent
              item={{
                ...newsItem,
                categoryName: newsList.category.categoryName,
              }}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}
