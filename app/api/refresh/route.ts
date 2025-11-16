import { createSession, decrypt } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { refreshToken: refresh } = await req.json();

  const verifiedRefresh = await decrypt(refresh, "refreshToken");

  if (!verifiedRefresh) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  const { token: accessTokenResult } = await createSession(
    verifiedRefresh,
    "accessToken",
  );

  const { token: refreshTokenResult } = await createSession(
    verifiedRefresh,
    "refreshToken",
  );
  return NextResponse.json(
    { accessTokenResult, refreshTokenResult },
    { status: 201 },
  );
}
