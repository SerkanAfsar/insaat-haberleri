"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";

import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetAllData } from "@/CustomHooks/useQueries";
import { GetAllServiceType } from "@/Types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  fetchUrl: string;
  validateKey: string;
}

export function CustomDataTable<TData, TValue>({
  columns,
  validateKey,
  fetchUrl,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const filterOptions: GetAllServiceType = {
    count: pagination.pageSize,
    filters: JSON.stringify(columnFilters ?? []),
    globalFilter: "",
    offset: pagination.pageIndex * pagination.pageSize,
    sorting: JSON.stringify(sorting ?? []),
  };
  const {
    data: mainData,
    error,
    isPending,
  } = useGetAllData(fetchUrl, validateKey, filterOptions);

  const table = useReactTable({
    data: (mainData?.data as TData[]) || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },

    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Hata!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <LoadingRows
                headerCount={table.getHeaderGroups()[0].headers.length}
              />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <DataTablePagination table={table} /> */}
      <div className="mt-4 flex items-center justify-between">
        <TableFooter
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          totalCount={mainData?.rowCount || 0}
        />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Sonraki >"
          onPageChange={(e) => table.setPageIndex(Number(e.selected))}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(
            Number(mainData?.rowCount || 0) /
              Number(table.getState().pagination.pageSize),
          )}
          forcePage={table.getState().pagination.pageIndex}
          previousLabel="< Önceki"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-end text-sm space-x-2"
          pageClassName=" border border-gray-300 w-auto cursor-pointer text-center rounded-md "
          activeClassName="bg-black text-white"
          pageLinkClassName="block w-full h-full  px-3 py-2"
          previousClassName="bg-gray-100 dark:bg-black dark:hover:bg-inherit cursor-pointer border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-200 transition"
          nextClassName="bg-gray-100 dark:bg-black border border-gray-300 dark:hover:bg-inherit rounded-md px-3 py-2 hover:bg-gray-200 transition"
          nextLinkClassName="block cursor-pointer w-full h-full"
          breakClassName="px-3 py-2"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

const TableFooter = ({
  pageIndex,
  pageSize,
  totalCount,
}: {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}) => {
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="p-2 text-sm text-gray-600">
      Gösterim {start}–{end} Toplam {totalCount} Kayıt
    </div>
  );
};

function LoadingRows({ headerCount }: { headerCount: number }) {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: headerCount }).map((item, index) => (
            <TableCell key={index}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
