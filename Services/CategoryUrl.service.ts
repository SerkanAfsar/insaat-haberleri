import prisma from "@/lib/db";
import { AddCategorySourceType, GetAllServiceType } from "@/Types";
import { Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function GetAllCategoryUrlService({
  offset,
  count,
  globalFilter,
  sorting,
  filters,
}: GetAllServiceType) {
  let query: Prisma.CategorySourcesWhereInput = {};
  let orderByCondition: any = {};

  if (globalFilter) {
    const isNumber = Number(globalFilter);
    query = {
      OR: [
        {
          sourceUrl: {
            contains: globalFilter,
            // mode: "insensitive",
          },
        },
        {
          sourceSiteName: {
            contains: globalFilter,
            // mode: "insensitive",
          },
        },
        {
          category: {
            categoryName: {
              contains: globalFilter,
            },
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

  const [categorySources, rowCount] = await prisma.$transaction([
    prisma.categorySources.findMany({
      where: query,
      skip: offset,
      take: count,
      orderBy: orderByCondition,
    }),
    prisma.categorySources.count({ where: query }),
  ]);
  return { data: categorySources, rowCount };
}

export async function DeleteCategoryUrlService(id: number) {
  const data = await prisma.categorySources.delete({ where: { id } });
  if (!data) {
    throw new Error("Kategori Url Bulunamadı");
  }
  return data;
}

export async function GetCategorySourceUrlByIdService(id: number) {
  const data = await prisma.categorySources.findFirst({ where: { id } });
  if (!data) {
    throw new Error("Kategori Url Bulunamadı");
  }
  return data;
}

export async function UpdateCategoryUrlService(
  id: number,
  updateData: AddCategorySourceType,
) {
  const existed = await prisma.categorySources.findFirst({
    where: {
      id: {
        not: id,
      },
      AND: {
        sourceSiteName: updateData.sourceSiteName,
        categoryId: updateData.categoryId,
        sourceUrl: updateData.sourceUrl,
      },
    },
  });
  if (existed) {
    throw new Error("Kayıtlı Kategori Url Mevcut");
  }
  const updatedCategoryUrl = await prisma.categorySources.update({
    where: { id },
    data: {
      categoryId: updateData.categoryId,
      sourceSiteName: updateData.sourceSiteName,
      sourceUrl: updateData.sourceUrl,
    },
  });
  if (!updateData) {
    throw new Error("Kategori Url Bulunamadı!..");
  }
  return updatedCategoryUrl;
}

export async function AddCategoryUrlService(item: AddCategorySourceType) {
  const existData = await prisma.categorySources.findFirst({
    where: {
      categoryId: item.categoryId,
      sourceSiteName: item.sourceSiteName,
      sourceUrl: item.sourceUrl,
    },
    include: {
      category: true,
    },
  });
  if (existData) {
    throw new Error(
      `${existData.category.categoryName} Kategorisinde ${existData.sourceUrl} Zaten Kayıtlı`,
    );
  }
  return await prisma.categorySources.create({
    data: {
      sourceSiteName: item.sourceSiteName,
      sourceUrl: item.sourceUrl,
      updatedAt: new Date(),
      categoryId: item.categoryId,
    },
  });
}
