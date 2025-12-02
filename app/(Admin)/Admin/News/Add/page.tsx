import prisma from "@/lib/db";
import { ConvertData } from "@/lib/utils";
import AddUpdateNewsContainer from "./Containers/add-update-news-container";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
  const categoryResult = ConvertData(categories, "id", "categoryName");
  console.log(categoryResult);
  return (
    <AddUpdateNewsContainer
      categoryList={categoryResult}
      type="ADD"
      defaultDataValues={undefined}
    />
  );
}
