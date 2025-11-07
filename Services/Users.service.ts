"use server";
import prisma from "@/lib/db";
import { BcryptHelper } from "@/lib/utils";
import { AddUserType, GetAllServiceType, UpdateUserType } from "@/Types";
import { Prisma } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export async function AddUserService(data: AddUserType) {
  const existedUser = await prisma.users.findFirst({
    where: {
      email: data.email,
    },
  });
  if (existedUser) {
    throw new Error("Bu E-Mail Adresinde Kullanıcı Mevcut");
  }
  return await prisma.users.create({
    data: {
      email: data.email,
      name: data.name,
      password: await BcryptHelper.hashPassword(data.password),
      surname: data.surname,
      UserRoles: {
        createMany: {
          data: data.roles.map((item) => ({ rolesId: item })),
        },
      },
    },
  });
}

export async function GetAllUsersService({
  offset,
  count,
  globalFilter,
  sorting,
  filters,
}: GetAllServiceType) {
  let query: Prisma.UsersWhereInput = {};
  let orderByCondition: any = {};

  if (globalFilter) {
    const isNumber = Number(globalFilter);
    query = {
      OR: [
        {
          email: {
            contains: globalFilter,
            // mode: "insensitive",
          },
        },
        {
          name: {
            contains: globalFilter,
          },
        },
        {
          surname: {
            contains: globalFilter,
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

  const [users, rowCount] = await prisma.$transaction([
    prisma.users.findMany({
      where: query,
      skip: offset,
      take: count,
      orderBy: orderByCondition,
    }),
    prisma.users.count({ where: query }),
  ]);
  return { data: users, rowCount };
}

export async function DeleteUserService(id: number) {
  const user = await prisma.users.delete({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error("Kullanıcı Bulunamadı!");
  }
  return user;
}

export async function GetUserById(id: number) {
  return await prisma.users.findFirst({
    where: {
      id,
    },
    include: {
      UserRoles: true,
    },
  });
}

export async function UpdateUserService(id: number, data: UpdateUserType) {
  const existedUser = await prisma.users.findFirst({
    where: {
      id: {
        not: id,
      },
      AND: {
        email: data.email,
      },
    },
  });
  if (existedUser) {
    throw new Error("Bu EMailde Kayıtlı Kullanıcı Mevcut");
  }

  const newData = {
    email: data.email,
    name: data.name,
    surname: data.surname,
  } as any;

  if (data.password) {
    newData.password = await BcryptHelper.hashPassword(data.password);
  }

  await prisma.userRoles.deleteMany({
    where: {
      usersId: id,
    },
  });

  await prisma.userRoles.createMany({
    data: data.roles.map((item) => ({ usersId: id, rolesId: item })),
  });

  return await prisma.users.update({
    where: {
      id,
    },
    data: newData,
  });
}
