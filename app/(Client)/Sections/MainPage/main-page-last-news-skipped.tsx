import dynamic from "next/dynamic";

import { MainPageContainerProps } from "../../Containers/main-page-container";

const NewsItemSmallComponent = dynamic(
  () => import("../../Components/Common/news-item-small-component"),
);

const NewsItemMiddleComponent = dynamic(
  () => import("../../Components/Common/news-item-middle-component"),
);

export type MainPageLastNewsSkippedProps = {
  newsList: MainPageContainerProps["lastSkippedNews"][number];
};
export default function MainPageLastNewsSkipped({
  newsList,
}: MainPageLastNewsSkippedProps) {
  const firstNewsItem = newsList.category.Newses.slice(0, 1)[0];
  const restItems = newsList.category.Newses.slice(
    1,
    newsList.category.Newses.length,
  );
  return (
    <section className="flex w-full flex-col space-y-4">
      <NewsItemMiddleComponent
        item={{
          ...firstNewsItem,
          categoryName: newsList.category.categoryName,
          type: "first",
        }}
      />
      {restItems.map((newsItem, index) => {
        return <NewsItemSmallComponent item={newsItem} key={index} />;
      })}
    </section>
  );
}
