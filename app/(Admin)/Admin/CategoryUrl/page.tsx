import { Suspense } from "react";
import CategoryUrlListWrapper from "./Wrappers/category-url-list-wrapper";

export default function Page() {
  return (
    <Suspense>
      <CategoryUrlListWrapper />
    </Suspense>
  );
}
