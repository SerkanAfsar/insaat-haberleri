import { NEWS_SOURCES } from "@/lib/admin.data";
import { ModuleType, ModuleTypes } from "@/Types";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "EPosta Adresinizi Giriniz" })
    .email({ message: "E-Posta Formatı Yanlış" }),
  password: z.string().min(1, { message: "Şifrenizi Giriniz" }),
});

export const addCategorySchema = z.object({
  categoryName: z.string().min(1, { error: "Kategori Adı Giriniz" }),
  seoTitle: z.string().min(1, { error: "Seo Title  Giriniz" }),
  seoDescription: z.string().min(1, { error: "Seo Description  Giriniz" }),
});

export const addCategorySourceSchema = z.object({
  sourceUrl: z.string().min(1, { error: "Kaynak Url Giriniz" }),
  sourceSiteName: z.enum(Object.keys(NEWS_SOURCES) as string[], {
    error: "Kaynak Seçiniz",
  }),
  categoryId: z.number().min(1, { error: "Kategori Seçiniz" }),
});

export const claimSchema = z.object({
  read: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export const ModuleClaimSchema = z.object(
  ModuleTypes.reduce(
    (acc, module) => {
      acc[module] = claimSchema;
      return acc;
    },
    {} as Record<ModuleType, typeof claimSchema>,
  ),
);

export const addRoleSchema = z.object({
  roleName: z.string().min(1, { error: "Rol Adını Giriniz" }),
  claims: ModuleClaimSchema,
});

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const addUserSchema = z
  .object({
    name: z.string().min(1, { error: "İsim Alanı Boş Bırakılamaz" }),
    surname: z.string().min(1, { error: "Soyisim Alanı Boş Bırakılamaz" }),
    email: z
      .string()
      .min(1, { error: "EMail Alanı Boş Bırakılamaz" })
      .email({ error: "EMail Formatı Yanlış" }),
    password: z
      .string({ error: "Şifre Giriniz" })
      .min(6, { error: "Şifre En Az 6 Karakter Olmalı" }),

    rePassword: z
      .string({ error: "Şifre Giriniz" })
      .min(6, { error: "Şifre En Az 6 Karakter Olmalı" }),

    picture: z
      .instanceof(File)
      .refine((file) => ALLOWED_TYPES.includes(file.type), {
        error: "Resim Formatı Yanlış",
      })
      .refine((file) => file.size < MAX_BYTES, {
        error: "Dosya Boyutu 5MB den büyük olamaz",
      })
      .optional(),
    roles: z
      .number()
      .array()
      .refine((arr) => arr.length > 0, { error: "En Az Bir Rol Seçiniz" }),
  })
  .refine(
    (data) => {
      return data.password == data.rePassword;
    },
    {
      error: "Şifreler Uyuşmıyor",
      path: ["rePassword"],
    },
  );

export const updateUserSchema = z
  .object({
    name: z.string().min(1, { error: "İsim Alanı Boş Bırakılamaz" }),
    surname: z.string().min(1, { error: "Soyisim Alanı Boş Bırakılamaz" }),
    email: z
      .string()
      .min(1, { error: "EMail Alanı Boş Bırakılamaz" })
      .email({ error: "EMail Formatı Yanlış" }),
    password: z.string().optional(),
    rePassword: z.string().optional(),
    picture: z
      .instanceof(File)
      .refine((file) => ALLOWED_TYPES.includes(file.type), {
        error: "Resim Formatı Yanlış",
      })
      .refine((file) => file.size < MAX_BYTES, {
        error: "Dosya Boyutu 5MB den büyük olamaz",
      })
      .optional(),
    roles: z
      .number()
      .array()
      .refine((arr) => arr.length > 0, { error: "En Az Bir Rol Seçiniz" }),
  })
  .refine(
    (data) => {
      if (data.password?.length) {
        return data.password.length > 6;
      }
      return true;
    },
    {
      error: "Şifre en az 6 karakter olmalıdır",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      if (data.password) {
        return data.password == data.rePassword;
      }
      return true;
    },
    {
      error: "Şifreler Uyuşmıyor",
      path: ["rePassword"],
    },
  );
