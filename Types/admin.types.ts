import { NEWS_SOURCES } from "@/lib/admin.data";
import { Column } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import { z } from "zod";

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
  sourceSiteName: z.enum(Object.keys(NEWS_SOURCES) as string[], {
    error: "Kaynak Seçiniz",
  }),
  categoryId: z.number().min(1, { error: "Kategori Seçiniz" }),
});

export type AddCategorySourceType = z.infer<typeof addCategorySourceSchema>;

export type UpdateComponentType<TData extends object> = {
  id: number;
  validateKey: string;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  column?: Column<TData>;
};

export type OptionsType = {
  label: string;
  value: number | string;
};

export const ModuleTypes = [
  "Dashboard",
  "Categories",
  "CategoryUrl",
  "Roles",
  "Users",
  "Settings",
] as const;

export type ModuleType = (typeof ModuleTypes)[number];

const ClaimSchema = z.object({
  read: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export type ClaimType = z.infer<typeof ClaimSchema>;

const ModuleClaimSchema = z.object(
  ModuleTypes.reduce(
    (acc, module) => {
      acc[module] = ClaimSchema;
      return acc;
    },
    {} as Record<ModuleType, typeof ClaimSchema>,
  ),
);

export type ModuleClaimType = z.infer<typeof ModuleClaimSchema>;

export const addRoleSchema = z.object({
  roleName: z.string().min(1, { error: "Rol Adını Giriniz" }),
  claims: ModuleClaimSchema,
});

export type AddRoleType = z.infer<typeof addRoleSchema>;
