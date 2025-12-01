import prisma from "@/lib/db";
import { GetAllServiceType } from "@/Types";
import { Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function GetAllNewsesService({
  offset,
  count,
  globalFilter,
  sorting,
  filters,
}: GetAllServiceType) {
  let query: Prisma.NewsesWhereInput = {};
  let orderByCondition: any = {};

  if (globalFilter) {
    const isNumber = Number(globalFilter);
    query = {
      OR: [
        {
          title: {
            contains: globalFilter,
            // mode: "insensitive",
          },
        },
        {
          category: {
            categoryName: {
              contains: globalFilter,
            },
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
      // orderByCondition = [
      //   {
      //     [id]: desc ? "desc" : "asc",
      //   },
      // ];
      const subId = id.split(".");
      if (subId.length == 1) {
        orderByCondition = [
          {
            [subId[0]]: desc ? "desc" : "asc",
          },
        ];
      } else {
        orderByCondition = [
          {
            [subId[0]]: {
              [subId[1]]: desc ? "desc" : "asc",
            },
          },
        ];
      }
    }
  }

  const [newses, rowCount] = await prisma.$transaction([
    prisma.newses.findMany({
      where: query,
      skip: offset,
      take: count,
      orderBy: orderByCondition,
      select: {
        id: true,
        title: true,
        category: {
          select: {
            categoryName: true,
            id: true,
            CategorySources: {
              select: {
                sourceSiteName: true,
              },
            },
          },
        },
        imageId: true,
      },
    }),
    prisma.newses.count({ where: query }),
  ]);
  return {
    data: newses.map((item) => ({
      id: item.id,
      title: item.title,
      categoryName: item.category.categoryName,
      sourceUrl: item.category.CategorySources[0].sourceSiteName,
      imageId: item.imageId,
      categoryId: item.category.id,
    })),
    rowCount,
  };
}
