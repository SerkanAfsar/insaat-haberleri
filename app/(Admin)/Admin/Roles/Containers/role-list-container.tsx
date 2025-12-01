"use client";

import { CustomDataTable } from "@/components/datatable";
import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import DatatableRowActions from "@/components/datatable/datatable-row-actions";
import { Roles } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ENDPOINTS } from "@/lib/utils";

export default function RoleListContainer() {
  const endPointValues = ENDPOINTS.roles;
  const columns = useMemo<ColumnDef<Roles>[]>(
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
        id: "roleName",
        accessorKey: "roleName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rol Adı" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("roleName")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Rol Adı",
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
              componentKey="roles"
              detailUrl="/Admin/Roles/Add"
              column={column}
            />
          );
        },
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [],
  );

  return (
    <CustomDataTable
      columns={columns}
      validateKey={endPointValues.validateKey}
      fetchUrl={endPointValues.url}
    />
  );
}
