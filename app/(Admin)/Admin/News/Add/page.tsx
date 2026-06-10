import { prisma } from "@/lib/db";
import { ConvertData } from "@/lib/utils";
import AddUpdateNewsContainer from "./Containers/add-update-news-container";
import { cacheTag } from "next/cache";
import { Suspense } from "react";

async function getData() {
  "use cache";
  cacheTag("category-list");
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
  const categoryResult = ConvertData(categories, "id", "categoryName");
  return categoryResult;
}

export default async function Page() {
  const data = await getData();
  return (
    <Suspense>
      <AddUpdateNewsContainer
        categoryList={data}
        type="ADD"
        defaultDataValues={undefined}
      />
    </Suspense>
  );
}
