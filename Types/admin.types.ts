import { NEWS_SOURCES } from "@/lib/admin.data";
import { ColumnDef } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import { keyof, number, string, z } from "zod";

export type AdminDataType = {
  title: string;
  icon: LucideIcon;
  href?: `/Admin/${string}` | null;
  subItems?: AdminDataType[] | null;
};

export type SessionPayload = {
  userName: string;
  expiresAt: Date;
};

export type TokenTypes = Record<
  "accessToken" | "refreshToken",
  {
    expiresAt: string;
    tokenKey: Uint8Array<ArrayBuffer>;
  }
>;

export const addCategorySchema = z.object({
  categoryName: z.string().min(1, { error: "Kategori Adı Giriniz" }),
  seoTitle: z.string().min(1, { error: "Seo Title  Giriniz" }),
  seoDescription: z.string().min(1, { error: "Seo Description  Giriniz" }),
});

export type AddCategoryType = z.infer<typeof addCategorySchema>;

export type GetAllServiceType = {
  offset: number;
  count: number;
  globalFilter: string;
  sorting: string;
  filters: string;
};

export const addCategorySourceSchema = z.object({
  sourceUrl: z.string().min(1, { error: "Kaynak Url Giriniz" }),
  sourceSiteName: z.enum(Object.keys(NEWS_SOURCES) as string[]),
  categoryId: z.number().min(1, { error: "Kategori Seçiniz" }),
});

export type AddCategorySourceType = z.infer<typeof addCategorySourceSchema>;

export type UpdateComponentType<TData extends object> = {
  id: number;
  validateKey: string;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  meta?: ColumnDef<TData>["meta"];
};

export type OptionsType = {
  label: string;
  value: string;
  id: number;
};
