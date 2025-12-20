"use client";

import { usePathname, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function CategoryPagination({
  pageCount,
}: {
  pageCount: number;
}) {
  const router = useRouter();

  const url = usePathname();
  const handlePageClick = (event: any) => {
    const page = Number(event.selected) + 1;
    const newParams = new URLSearchParams();
    newParams.set("page", page.toString());
    return router.push(`${url}?${newParams.toString()}`);
  };
  return (
    <div className="flex w-full items-center justify-center gap-4 bg-gray-100">
      {/* <button
        type="button"
        className="bg-gray-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        <ChevronFirst size={15} />
      </button> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="font-oswald flex items-center justify-center gap-2  py-4"
        pageClassName="cursor-pointer"
        pageLinkClassName="px-4 py-2 bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition"
        previousClassName=""
        previousLinkClassName="px-4 py-2 cursor-pointer bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition"
        nextClassName=""
        nextLinkClassName="px-4 py-2 cursor-pointer bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition"
        activeClassName=""
        activeLinkClassName="px-4 py-2 bg-red-500 text-white font-semibold"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakLinkClassName="px-4 py-2 bg-gray-800 text-white"
      />
    </div>
  );
}
