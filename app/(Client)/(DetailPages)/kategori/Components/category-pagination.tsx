"use client";

import { useParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useRouter } from "nextjs-toploader/app";
export default function CategoryPagination({
  pageCount,
  url,
}: {
  pageCount: number;
  url: string;
}) {
  const router = useRouter();
  const { slug }: { slug: string[] } = useParams();

  const handlePageClick = (event: any) => {
    const page = Number(event.selected) + 1;
    return router.push(`${url}/${page}`);
  };

  const currentPage =
    slug.length && slug.length == 3 && Number(slug[2]) > 0
      ? Number(slug[2]) - 1
      : 0;

  const goFirst = () => router.push(`${url}/1`);
  const goLast = () => router.push(`${url}/${pageCount}`);

  return (
    <div className="flex w-full items-center justify-center gap-2 bg-gray-100">
      <button
        onClick={goFirst}
        disabled={currentPage === 0}
        className="mt-[1px] cursor-pointer bg-gray-800 px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        « İlk
      </button>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        forcePage={currentPage}
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
      <button
        onClick={goLast}
        disabled={currentPage === pageCount - 1}
        className="mt-[1px] cursor-pointer bg-gray-800 px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        Son »
      </button>
    </div>
  );
}
