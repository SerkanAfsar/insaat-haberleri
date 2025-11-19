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
    select: {
      password: true,
      email: true,
      name: true,
      surname: true,
      id: true,
      UserRoles: {
        select: {
          role: {
            select: {
              claims: true,
            },
          },
        },
      },
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
  const accessTokenSession: SessionPayload = {
    userEmail: user.email,
    userId: user.id.toString(),
    userName: user.name,
    userSurname: user.surname,
    claims: [
      ...new Set(user.UserRoles.flatMap((a) => JSON.parse(a.role.claims))),
    ],
  };

  const { token: accessToken, expiresAt: accessExpire } = await createSession(
    accessTokenSession,
    "accessToken",
  );

  const { token: refreshToken, expiresAt: refreshExpire } = await createSession(
    { userId: accessTokenSession.userId },
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
