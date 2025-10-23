"use server";

import { LoginType } from "@/Schemas/auth.schemas";
import { createSession, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthLogin(loginData: LoginType) {
  const cookieStore = await cookies();
  const user = await prisma.users.findUnique({
    where: {
      email: loginData.email,
    },
  });
  if (!user) {
    return {
      error: "Kullanıcı Bulunamadı",
    };
  }
  const passCompare = await verifyPassword(loginData.password, user.password);
  if (!passCompare) {
    return {
      error: "Şifre Yanlış",
    };
  }
  const { token: accessToken, expiresAt: accessExpire } = await createSession(
    user.email,
    "accessToken",
  );

  const { token: refreshToken, expiresAt: refreshExpire } = await createSession(
    user.email,
    "refreshToken",
  );

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: accessExpire,
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: refreshExpire,
  });

  redirect("/Admin/Dashboard");
}
