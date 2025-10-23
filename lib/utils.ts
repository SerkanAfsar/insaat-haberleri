import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AdminMenuList } from "./admin.data";
import { EnvData } from "@/Types/common.types";
import { AdminDataType, OptionsType } from "@/Types";
import { keyof } from "zod";

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
} as const;

export function ConvertData<
  T extends object,
  K extends keyof T,
  L extends keyof T,
>(data: T[], idKey: K, valueKey: L): OptionsType[] {
  return data.map((item) => ({
    id: item[idKey] as number,
    label: item[valueKey] as string,
    value: item[valueKey] as string,
  }));
}
