"server only";
import { SignJWT, jwtVerify } from "jose";

import bcrypt from "bcrypt";
import { envData } from "./utils";
import { SessionPayload, TokenTypes } from "@/Types";

const saltRounds = 12;
export async function hashPassword(plainPassword: string): Promise<string> {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

export async function verifyPassword(
  plainPassword: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}

const tokenTypes: TokenTypes = {
  accessToken: {
    expiresAt: "1000",
    tokenKey: new TextEncoder().encode(envData.ACCESS_TOKEN_SECRET_KEY),
  },
  refreshToken: {
    expiresAt: "2000",
    tokenKey: new TextEncoder().encode(envData.REFRESH_TOKEN_SECRET_KEY),
  },
};

export async function encrypt(
  payload: SessionPayload,
  keyValue: keyof TokenTypes,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${tokenTypes[keyValue].expiresAt}s`)
    .sign(tokenTypes[keyValue].tokenKey);
}

export async function decrypt(
  session: string | undefined = "",
  keyValue: keyof TokenTypes,
) {
  try {
    const { payload } = await jwtVerify(
      session,
      tokenTypes[keyValue].tokenKey,
      {
        algorithms: ["HS256"],
      },
    );
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(
  userName: string,
  tokenType: keyof TokenTypes,
) {
  const time = 60 * 60 * Number(tokenTypes[tokenType].expiresAt);
  const expiresAt = new Date(Date.now() + time);
  const token = await encrypt({ userName, expiresAt }, tokenType);

  return {
    token,
    expiresAt,
  };
}
