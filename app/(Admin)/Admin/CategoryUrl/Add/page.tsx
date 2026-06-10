import { Suspense } from "react";
import CategoryAddWrapper from "../Wrappers/category-add-wrapper";

export default async function Page() {
  return (
    <Suspense>
      <CategoryAddWrapper />
    </Suspense>
  );
}
