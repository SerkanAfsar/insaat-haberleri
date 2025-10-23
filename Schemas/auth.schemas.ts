import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "EPosta Adresinizi Giriniz" })
    .email({ message: "E-Posta Formatı Yanlış" }),
  password: z.string().min(1, { message: "Şifrenizi Giriniz" }),
});

export type LoginType = z.infer<typeof loginSchema>;
