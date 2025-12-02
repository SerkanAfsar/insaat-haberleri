"use client";

import { CustomDataTable } from "@/components/datatable";
import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import DatatableRowActions from "@/components/datatable/datatable-row-actions";
import { Newses } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ENDPOINTS, envVariables } from "@/lib/utils";
import { NEWS_SOURCES } from "@/lib/admin.data";
import NewsItemImage from "./news-item-image";

export type NewsListContainerType = Newses & {
  select: string;
  categoryName: string;
  sourceUrl: string;
};

export default function NewsListContainer() {
  const columns = useMemo<ColumnDef<NewsListContainerType>[]>(
    () => [
      {
        id: "select",
        accessorKey: "select",
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
        meta: {
          title: "Select",
        },
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
        id: "title",
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Haber Başlık" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("title")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Haber Başlık",
        },
      },
      {
        id: "imageId",
        accessorKey: "imageId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Resim" />
        ),
        cell: ({ row }) => {
          const { imageId } = row.original;
          const url = {
            large: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Big`,
            medium: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Medium`,
            small: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Small`,
            ExtraLarge: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/ExtraLarge`,
          } as const;
          return (
            <NewsItemImage bigImage={url.ExtraLarge} thumbnail={url.small} />
          );
        },
        enableSorting: false,
        enableHiding: true,
        meta: {
          title: "Resim",
        },
      },
      {
        id: "category.categoryName",
        accessorKey: "categoryName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori" />
        ),
        cell: ({ row }) => {
          return <div>{(row.original as any).categoryName}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Kategori Adı",
        },
      },
      {
        id: "sourceUrl",
        accessorKey: "sourceUrl",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kaynak" />
        ),
        cell: ({ row }) => {
          const value = row.original.sourceUrl as keyof typeof NEWS_SOURCES;
          return <div>{NEWS_SOURCES[value]?.title ?? ""}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Kaynak Url",
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
              componentKey={ENDPOINTS.newses.validateKey}
              column={column}
              detailUrl="/Admin/News/Add"
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        // meta: {
        //   categoryList,
        //   updateTitle: "Kategori Url Güncelleme",
        //   updateDescription: "Kategori Url Güncelleme İşlemleri",
        // },
      },
    ],
    [],
  );
  return (
    <CustomDataTable
      columns={columns}
      validateKey={ENDPOINTS.newses.validateKey}
      fetchUrl={ENDPOINTS.newses.url}
    />
  );
}
