"use client";

import { CustomDataTable } from "@/components/datatable";
import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import DatatableRowActions from "@/components/datatable/datatable-row-actions";
import { CategorySources } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { OptionsType } from "@/Types";

import { NEWS_SOURCES } from "@/lib/admin.data";
import { ENDPOINTS } from "@/lib/utils";
import AddUpdateCategoryUrl from "../Components/update-category-url";

export default function CategoryUrlListContainer({
  categoryList,
}: {
  categoryList: OptionsType[];
}) {
  const columns = useMemo<ColumnDef<CategorySources>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "sourceUrl",
        accessorKey: "sourceUrl",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Url" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("sourceUrl")}</div>;
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "categoryId",
        accessorKey: "categoryId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori" />
        ),
        cell: ({ row }) => {
          const categoryId = row.original.categoryId;
          return (
            <div>
              {categoryList.find((a) => a.id == categoryId)?.value ||
                "Not Found"}
            </div>
          );
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "sourceSiteName",
        accessorKey: "sourceSiteName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kaynak" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("sourceSiteName")}</div>;
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "actions",
        header: () => {
          return <span>İşlemler</span>;
        },
        cell: ({ row, column }) => {
          return (
            <DatatableRowActions
              row={row}
              componentKey="categorySources"
              CustomUpdateComponent={AddUpdateCategoryUrl}
              column={column}
            />
          );
        },
        meta: {
          categoryList,
          sourceList: NEWS_SOURCES,
        },
      },
    ],
    [categoryList],
  );
  return (
    <CustomDataTable
      columns={columns}
      validateKey={ENDPOINTS.categorySources.validateKey}
      fetchUrl={ENDPOINTS.categorySources.url}
    />
  );
}
