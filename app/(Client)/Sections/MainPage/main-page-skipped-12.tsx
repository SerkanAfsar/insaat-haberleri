import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const NewsItemMiddleComponent = dynamic(
  () => import("../../Components/Common/news-item-middle-component"),
);

const NewsItemSmallComponent = dynamic(
  () => import("../../Components/Common/news-item-small-component"),
);

import { MainPageContainerProps } from "../../Containers/main-page-container";

export type MainPageSkipped12Props = {
  items: MainPageContainerProps["mostReaded12Skipped"];
  className?: string;
};

export default function MainPageSkipped12({
  items,
  className,
}: MainPageSkipped12Props) {
  const firstItem = items?.[0] || null;
  const restItems = items?.slice(1, items.length);

  return (
    <section className={cn("flex w-full flex-col", className)}>
      {firstItem && (
        <NewsItemMiddleComponent
          item={{
            categoryName: firstItem.category.categoryName,
            createdAt: firstItem.createdAt,
            imageId: firstItem.imageId,
            subDescription: firstItem.subDescription,
            title: firstItem.title,
            type: "second",
          }}
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        {restItems?.map((item, key) => {
          return <NewsItemSmallComponent item={item} key={key} />;
        })}
      </div>
    </section>
  );
}
