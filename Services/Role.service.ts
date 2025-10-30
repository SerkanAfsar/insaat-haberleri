import prisma from "@/lib/db";
import { AddRoleType, GetAllServiceType } from "@/Types";
import { Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function AddRoleService(role: AddRoleType) {
  return await prisma.roles.create({
    data: { roleName: role.roleName, claims: JSON.stringify(role.claims) },
  });
}

export async function GetAllRolesService({
  offset,
  count,
  globalFilter,
  sorting,
  filters,
}: GetAllServiceType) {
  let query: Prisma.RolesWhereInput = {};
  let orderByCondition: any = {};

  if (globalFilter) {
    const isNumber = Number(globalFilter);
    query = {
      OR: [
        {
          roleName: {
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

  const [roles, rowCount] = await prisma.$transaction([
    prisma.roles.findMany({
      where: query,
      skip: offset,
      take: count,
      orderBy: orderByCondition,
    }),
    prisma.roles.count({ where: query }),
  ]);
  return { data: roles, rowCount };
}

export async function DeleteRoleService(id: number) {
  const data = await prisma.roles.delete({
    where: {
      id,
    },
  });
  if (!data) {
    throw new Error("Rol Bulunamadı!");
  }
  return data;
}

export async function GetSingleRoleById(id: number) {
  const data = await prisma.roles.findFirst({
    where: {
      id,
    },
  });
  if (!data) {
    throw new Error("Rol Bulunamadı!");
  }
  return data;
}

export async function UpdateRoleService(id: number, role: AddRoleType) {
  const existedData = await prisma.roles.findFirst({
    where: {
      id: {
        not: id,
      },
      AND: {
        roleName: role.roleName,
      },
    },
  });
  if (existedData) {
    throw new Error("Bu Rol Adında Rol Mevcut! Başka isim Seçiniz");
  }

  const result = await prisma.roles.update({
    where: {
      id,
    },
    data: {
      roleName: role.roleName,
      claims: JSON.stringify(role.claims),
    },
  });
  if (!result) {
    throw new Error("Rol Bulunamadı...");
  }
  return result;
}
