import prisma from "@/lib/db";
import CategoryUrlListContainer from "./Containers/category-url-list-container";
import { ConvertData } from "@/lib/utils";

export default async function Page() {
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
