"use client";
import { CustomDataTable } from "@/components/datatable";
import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import DatatableRowActions from "@/components/datatable/datatable-row-actions";
import { Category } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import UpdateCategory from "../Components/update-category";
import { ENDPOINTS } from "@/lib/utils";

export default function CategoryListContainer() {
  const columns = useMemo<ColumnDef<Category>[]>(
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
        enableSorting: false,
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
        enableHiding: true,
        meta: {
          title: "Id Numarası",
        },
      },
      {
        id: "categoryName",
        accessorKey: "categoryName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori Adı" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("categoryName")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Kategori Adı",
        },
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
              componentKey="categories"
              column={column}
              CustomUpdateComponent={UpdateCategory}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        meta: {
          updateTitle: "Kategori Güncelleme",
          updateDescription: "Kategori Güncelleme İşlemleri",
        },
      },
    ],
    [],
  );
  return (
    <CustomDataTable
      columns={columns}
      validateKey={ENDPOINTS.categories.validateKey}
      fetchUrl={ENDPOINTS.categories.url}
    />
  );
}
