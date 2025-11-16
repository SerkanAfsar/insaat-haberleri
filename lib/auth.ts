"use server";
import { SignJWT, jwtVerify } from "jose";
import { envData } from "./utils";
import { SessionPayload, TokenTypes } from "@/Types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const tokenTypes: TokenTypes = {
  accessToken: {
    expiresAt: "5m",
    encodedTokenKey: new TextEncoder().encode(envData.ACCESS_TOKEN_SECRET_KEY),
    tokenKey: envData.ACCESS_TOKEN_SECRET_KEY,
  },
  refreshToken: {
    expiresAt: "60d",
    encodedTokenKey: new TextEncoder().encode(envData.REFRESH_TOKEN_SECRET_KEY),
    tokenKey: envData.REFRESH_TOKEN_SECRET_KEY,
  },
};

export async function encrypt(
  payload: SessionPayload,
  keyValue: keyof TokenTypes,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${tokenTypes[keyValue].expiresAt}`)
    .sign(tokenTypes[keyValue].encodedTokenKey);
}

export async function decrypt(
  session: string | undefined = "",
  keyValue: keyof TokenTypes,
) {
  try {
    const { payload } = await jwtVerify(
      session,
      tokenTypes[keyValue].encodedTokenKey,
      {
        algorithms: ["HS256"],
      },
    );
    return payload as SessionPayload;
  } catch (error: any) {
    console.log("Failed to verify session", error);
  }
}

export async function createSession(
  payload: SessionPayload,
  tokenType: keyof TokenTypes,
) {
  const expires = new Date();
  if (tokenType == "accessToken") {
    expires.setTime(expires.getTime() + 5 * 60 * 1000);
  } else {
    expires.setTime(expires.getTime() + 60 * 60 * 1000 * 24 * 50);
  }

  const token = await encrypt(payload, tokenType);
  return {
    token,
    expiresAt: expires,
  };
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/Login");
}
