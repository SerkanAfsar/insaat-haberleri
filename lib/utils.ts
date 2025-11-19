import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { AdminMenuList, NEWS_SOURCES } from "./admin.data";
import { AdminDataType, EnvData, OptionsType } from "@/Types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const envData: EnvData = {
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY!,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY!,
};

export const isCurrentItem = (item: AdminDataType, pathName: string) => {
  return (
    pathName == item.href ||
    item.title ==
      AdminMenuList.find((a) => a.subItems?.find((b) => b.href == pathName))
        ?.title
  );
};

export type ResponseResult<T> = {
  data?: T | T[] | null;
  success: boolean;
  error?: string | null;
  statusCode: number;
  totalCount: number;
};

export function errorHandler<T>(
  err: unknown,
  responseResult: ResponseResult<T>,
): ResponseResult<T> {
  const errResult = errTypeHandler(err);
  responseResult.success = false;
  responseResult.statusCode = 400;
  responseResult.error = errResult;
  return responseResult;
}

export function errTypeHandler(err: unknown) {
  let errResult = "";
  if (typeof err == "string") {
    errResult = err;
  } else if (err instanceof Error) {
    errResult = err.message;
  } else {
    errResult = "Something went wrong";
  }
  return errResult;
}

export type ModuleList = "categories" | "categorySources";

export const ENDPOINTS = {
  categories: {
    url: "/api/category",
    validateKey: "categories",
  },
  categorySources: {
    url: "/api/categorysources",
    validateKey: "categorySources",
  },
  roles: {
    url: "/api/roles",
    validateKey: "roles",
  },
  users: {
    url: "/api/users",
    validateKey: "users",
  },
} as const;

export function ConvertData<
  T extends object,
  K extends keyof T,
  L extends keyof T,
>(data: T[], idKey: K, valueKey: L): OptionsType[] {
  return data.map((item) => ({
    label: item[valueKey] as string,
    value: item[idKey] as number,
  }));
}

export const newsSourceArr: OptionsType[] = Object.entries(NEWS_SOURCES).reduce<
  OptionsType[]
>((acc, [key, value]) => {
  acc.push({
    label: value.title,
    value: key,
  });
  return acc;
}, []);

export const BcryptHelper = {
  hashPassword: async (plain: string, saltRounds = 10): Promise<string> => {
    return await bcrypt.hash(plain, saltRounds);
  },

  comparePassword: async (plain: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
  },
};

export const createNewUrl = (url: string, sourceUrl: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    const newUrl = new URL(url, new URL(sourceUrl).origin);
    return newUrl.toString();
  }
  return url;
};
