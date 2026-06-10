import { prisma } from "@/lib/db";
import { ConvertData } from "@/lib/utils";
import AddCategoryUrlContainer from "../Containers/add-category-url-container";
import { cacheLife, cacheTag } from "next/cache";

export default async function CategoryAddWrapper() {
  "use cache";
  cacheTag("categories");
  cacheLife("hours");
  const categoryList = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  const categoryData = ConvertData(categoryList, "id", "categoryName");
  return <AddCategoryUrlContainer categoryList={categoryData} />;
}
