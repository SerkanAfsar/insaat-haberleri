"use server";

import { createSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { BcryptHelper } from "@/lib/utils";
import { LoginType, SessionPayload } from "@/Types";
import { cookies } from "next/headers";

export async function AuthLogin(loginData: LoginType) {
  const cookieStore = await cookies();
  const user = await prisma.users.findUnique({
    where: {
      email: loginData.email,
    },
  });
  if (!user) {
    throw new Error("Kullanıcı Bulunamadı!");
  }
  const passCompare = await BcryptHelper.comparePassword(
    loginData.password,
    user.password,
  );
  if (!passCompare) {
    throw new Error("Şifre Yanlış");
  }
  const session: SessionPayload = {
    userEmail: user.email,
    userId: user.id.toString(),
    userName: user.name,
    userSurname: user.surname,
  };
  const { token: accessToken, expiresAt: accessExpire } = await createSession(
    session,
    "accessToken",
  );

  const { token: refreshToken, expiresAt: refreshExpire } = await createSession(
    session,
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
  return true;
}
