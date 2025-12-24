"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ItemsType, TabListItemType, TabListProps } from "../types";
import NewsItemSmallComponent from "./news-item-small-component";

export default function TabList({
  latestNews,
  popularNews,
  randomNews,
}: TabListProps) {
  const items = {
    "En Son": latestNews,
    Popüler: popularNews,
    Rastege: randomNews,
  } as const satisfies TabListItemType;

  const [activeState, setActiveState] = useState<ItemsType>("En Son");

  return (
    <section className="w-full" role="tablist">
      <header className="text-md font-oswald flex bg-[#eee] uppercase">
        {Object.keys(items).map((key, index) => {
          return (
            <div
              role="tab"
              aria-selected={activeState == key}
              aria-controls={`panel-${key}`}
              className={cn(
                "p-4 py-3 text-black hover:cursor-pointer",
                key == activeState && "bg-theme-primary text-white",
              )}
              key={index}
              onClick={() => setActiveState(key as ItemsType)}
            >
              {key}
            </div>
          );
        })}
      </header>
      <div
        className="mt-5 flex w-full flex-col gap-4"
        role="tabpanel"
        id={`panel-${activeState}`}
        aria-labelledby={activeState}
      >
        {items[activeState].map((news, key) => {
          return (
            <NewsItemSmallComponent
              item={{ ...news, categoryName: news.category.categoryName }}
              key={key}
            />
          );
        })}
      </div>
    </section>
  );
}
