"use client";
import { CustomDataTable } from "@/components/datatable";
import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import DatatableRowActions from "@/components/datatable/datatable-row-actions";
import { Users } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { ENDPOINTS } from "@/lib/utils";

export default function UserListContainer() {
  const columns = useMemo<ColumnDef<Users>[]>(
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
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ad" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("name")}</div>;
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "surname",
        accessorKey: "surname",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Soyad" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("surname")}</div>;
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("email")}</div>;
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
              componentKey="users"
              column={column}
              detailUrl="/Admin/Users/Add"
            />
          );
        },
      },
    ],
    [],
  );
  return (
    <CustomDataTable
      columns={columns}
      validateKey={ENDPOINTS.users.validateKey}
      fetchUrl={ENDPOINTS.users.url}
    />
  );
}
