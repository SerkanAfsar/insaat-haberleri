"use server";
import prisma from "@/lib/db";
import { AddCategoryType, GetAllServiceType } from "@/Types";
import { Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function AddCategoryService(item: AddCategoryType) {
  const existData = await prisma.category.findFirst({
    where: {
      categoryName: item.categoryName,
    },
  });
  if (existData) {
    throw new Error("Kategori Zaten Kayıtlı");
  }
  return await prisma.category.create({
    data: {
      categoryName: item.categoryName,
      seoDescription: item.seoDescription,
      seoTitle: item.seoTitle,
      updatedAt: new Date(),
    },
  });
}
export async function GetAllCategoriesService({
  offset,
  count,
  globalFilter,
  sorting,
  filters,
}: GetAllServiceType) {
  let query: Prisma.CategoryWhereInput = {};
  let orderByCondition: any = {};

  if (globalFilter) {
    const isNumber = Number(globalFilter);
    query = {
      OR: [
        {
          categoryName: {
            contains: globalFilter,
            // mode: "insensitive",
          },
        },
      ],
    };
    if (!isNaN(isNumber)) {
      query.OR?.push({
        id: {
          equals: isNumber,
        },
      });
    }
  }

  const parsedColumnFilters = JSON.parse(filters) as ColumnFiltersState;
  if (parsedColumnFilters?.length && !globalFilter) {
    let resultCumle: any = {};
    parsedColumnFilters.map((filter) => {
      const { id: columnId, value: filterValue } = filter;
      let innerItem: any = {};
      if (columnId == "id" && !isNaN(filterValue as number)) {
        innerItem = {
          ["id"]: {
            equals: Number(filterValue),
          },
        };
      } else {
        innerItem = {
          [columnId]: {
            contains: filterValue,
            mode: "insensitive",
          },
        };
      }

      resultCumle = {
        ...resultCumle,
        ...innerItem,
      };
    });
    query = {
      AND: [resultCumle],
    };
  }

  if (sorting) {
    const parsedSorting = JSON.parse(sorting) as SortingState;
    if (parsedSorting?.length) {
      const sort = parsedSorting[0];
      const { id, desc } = sort;
      orderByCondition = [
        {
          [id]: desc ? "desc" : "asc",
        },
      ];
    }
  }

  const [categories, rowCount] = await prisma.$transaction([
    prisma.category.findMany({
      where: query,
      skip: offset,
      take: count,
      orderBy: orderByCondition,
    }),
    prisma.category.count({ where: query }),
  ]);
  return { data: categories, rowCount };
}
export async function DeleteCategoryService(id: number) {
  const data = await prisma.category.delete({ where: { id } });
  if (!data) {
    throw new Error("Kategori Bulunamadı");
  }
  return data;
}
export async function GetCategoryByIdService(id: number) {
  const data = await prisma.category.findFirst({ where: { id } });
  if (!data) {
    throw new Error("Kategori Bulunamadı");
  }
  return data;
}

export async function UpdateCategoryService(
  id: number,
  updateData: AddCategoryType,
) {
  const existed = await prisma.category.findFirst({
    where: {
      id: {
        not: id,
      },
      AND: {
        categoryName: updateData.categoryName,
      },
    },
  });
  if (existed) {
    throw new Error("Kayıtlı Kategori Mevcut");
  }
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      categoryName: updateData.categoryName,
      seoTitle: updateData.seoTitle,
      seoDescription: updateData.seoDescription,
    },
  });
  if (!updateData) {
    throw new Error("Kategori Bulunamadı!..");
  }
  return updatedCategory;
}
