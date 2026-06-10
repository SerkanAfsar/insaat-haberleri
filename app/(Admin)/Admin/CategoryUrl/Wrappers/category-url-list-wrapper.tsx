import { prisma } from "@/lib/db";

import { ConvertData } from "@/lib/utils";
import CategoryUrlListContainer from "../Containers/category-url-list-container";
import { cacheLife, cacheTag } from "next/cache";

export default async function CategoryUrlListWrapper() {
  "use cache";
  cacheTag("categories");
  cacheLife("hours");

  const categoryList = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  const categoryData = ConvertData(categoryList, "id", "categoryName");
  return (
    <>
      <h1 className="border-b p-4">Kategori Url Listesi</h1>
      <div className="m-4">
        <CategoryUrlListContainer categoryList={categoryData} />
      </div>
    </>
  );
}
