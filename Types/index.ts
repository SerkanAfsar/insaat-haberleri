import {
  addCategorySchema,
  addCategorySourceSchema,
  addRoleSchema,
  addUserSchema,
  claimSchema,
  loginSchema,
  ModuleClaimSchema,
  updateUserSchema,
} from "@/lib/schemas";
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
  userName?: string;
  userId: string;
  userEmail?: string;
  userSurname?: string;
  claims?: string[];
};

export type TokenTypes = Record<
  "accessToken" | "refreshToken",
  {
    expiresAt: string;
    encodedTokenKey: Uint8Array<ArrayBuffer>;
    tokenKey: string;
  }
>;

export type AddCategoryType = z.infer<typeof addCategorySchema>;

export type GetAllServiceType = {
  offset: number;
  count: number;
  globalFilter: string;
  sorting: string;
  filters: string;
};

export type LoginType = z.infer<typeof loginSchema>;

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

export type ClaimType = z.infer<typeof claimSchema>;

export type ModuleClaimType = z.infer<typeof ModuleClaimSchema>;

export type AddRoleType = z.infer<typeof addRoleSchema>;

export type EnvData = {
  ACCESS_TOKEN_SECRET_KEY: string;
  REFRESH_TOKEN_SECRET_KEY: string;
};

export type ContentType = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export type AddUserType = z.infer<typeof addUserSchema>;

export type UpdateUserType = z.infer<typeof updateUserSchema>;
