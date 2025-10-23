import CategoryListContainer from "./Containers/category-list-container";

export default function Page() {
  return (
    <>
      <h1 className="border-b p-4">Kategoriler</h1>
      <div className="m-4">
        <CategoryListContainer />
      </div>
    </>
  );
}
