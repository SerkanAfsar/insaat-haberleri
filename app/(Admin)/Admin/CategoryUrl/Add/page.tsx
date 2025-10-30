import prisma from "@/lib/db";
import { ConvertData } from "@/lib/utils";
import AddCategoryUrlContainer from "../Containers/add-category-url-container";

export default async function Page() {
  const categoryList = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  const categoryData = ConvertData(categoryList, "id", "categoryName");
  return <AddCategoryUrlContainer categoryList={categoryData} />;
}
