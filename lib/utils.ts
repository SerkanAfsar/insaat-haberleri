import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { AdminMenuList, NEWS_SOURCES } from "./admin.data";

import {
  AdminDataType,
  CloudFlareResponseType,
  EnvData,
  EnvType,
  OptionsType,
} from "@/Types";

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
  newses: {
    url: "/api/newses",
    validateKey: "newses",
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

export const envVariables: EnvType = {
  DATABASE_URL: process.env.DATABASE_URL!,
  ACCESS_TOKEN_SECRET_KEY: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET_KEY!,
  REFRESH_TOKEN_SECRET_KEY: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET_KEY!,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
  NEXT_PUBLIC_CDN_ACCOUNT_ID: process.env.NEXT_PUBLIC_CDN_ACCOUNT_ID!,
  NEXT_PUBLIC_CDN_ACCOUNT_TOKEN: process.env.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN!,
  NEXT_PUBLIC_ACCOUNT_KEY: process.env.NEXT_PUBLIC_ACCOUNT_KEY!,
  NEXT_PUBLIC_PAGINATION_ITEM_COUNT: Number(
    process.env.NEXT_PUBLIC_PAGINATION_ITEM_COUNT!,
  ),
};

export const slugUrl = (value: string): string => {
  if (value) {
    value = value.replace("'", "-");
    return value
      .toLowerCase()
      .normalize("NFD") // ü -> u + ¨
      .replace("'", "-")
      .replace(/&#039;/g, "")
      .replace(/&039;/g, "")
      .replace(/['"]/g, "")
      .replace(/[\u0300-\u036f]/g, "") // ¨ gibi işaretleri sil
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/[’‘“”'"`´]/g, "") // tüm tırnak çeşitlerini kaldır
      .replace(/[^a-z0-9\s-]/g, "") // harf, sayı, boşluk ve tire dışındakileri sil
      .replace(/\s+/g, "-") // boşlukları - yap
      .replace(/-+/g, "-") // birden fazla - varsa sadeleştir
      .replace(/^-+|-+$/g, ""); // baş/son tireleri sil
  }
  return "";
};

export const getImageTypeFromPath = (path: string) => {
  const match = path.match(/\.(\w+)(?:\?.*)?$/);
  return match ? match[1].toLowerCase() : "jpeg";
};

export async function RegisterImageToCdn(
  file: File,
  fileName: string,
): Promise<string | null> {
  const form = new FormData();

  form.append("file", file, fileName);
  form.append("requireSignedURLs", "false");

  const url = `https://api.cloudflare.com/client/v4/accounts/${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_ID}/images/v1`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${envVariables.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN}`,
    },
    body: form,
  });

  if (response.ok) {
    const data: CloudFlareResponseType = await response.json();
    if (!data.success) {
      return null;
    }
    return data.result.id;
  }
  return null;
}

export const getImageFromCdn = (imageId: string | null) => {
  if (!imageId) {
    return {
      large: "../public/default-news-image.jpg",
      medium: "../public/default-news-image.jpg",
      small: "../public/default-news-image.jpg",
      ExtraLarge: "../public/default-news-image.jpg",
    };
  }
  const url = {
    large: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Big`,
    medium: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Medium`,
    small: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/Small`,
    ExtraLarge: `https://imagedelivery.net/${envVariables.NEXT_PUBLIC_ACCOUNT_KEY}/${imageId}/ExtraLarge`,
  } as const;

  return url;
};

export const dateTimeConvert = (date: Date | null) => {
  if (!date) return;
  const dateTime = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "full",
  }).format();
  return dateTime;
};
