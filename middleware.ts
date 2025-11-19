import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";
import { cookies } from "next/headers";
import { ApiCheckValue, ApiRoleType, MethodType } from "./lib/admin.data";

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const pathName = req.nextUrl.pathname;

  const adminUrl = pathName.includes("/Admin");
  const apiUrl = pathName.includes("/api");

  const userSession = await decrypt(accessToken, "accessToken");

  if (accessToken && userSession && apiUrl && pathName != "/api/registernews") {
    const claims = userSession.claims;

    const pathExist =
      ApiCheckValue[
        req.nextUrl.pathname.replace(/\/\d+$/, "") as keyof ApiRoleType
      ][req.method.toLowerCase() as keyof MethodType];

    if (claims?.indexOf(pathExist) == -1) {
      return NextResponse.json(
        { message: "Bu İşlemi Yapmak İçin İzniniz Bulunmamaktadır!" },
        { status: 403 },
      );
    }
  }

  if (
    (!accessToken || !userSession) &&
    pathName != "/api/login" &&
    pathName != "/api/refresh"
  ) {
    const url = new URL(req.url);
    const response = await fetch(`${url.origin}/api/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (response.ok) {
      const { accessTokenResult, refreshTokenResult } = await response.json();
      cookieStore.set("accessToken", accessTokenResult);
      cookieStore.set("refreshToken", refreshTokenResult);
      return NextResponse.next();
    }

    if (adminUrl) {
      return NextResponse.redirect(new URL("/Login?expired=true", req.url));
    } else if (apiUrl) {
      return NextResponse.json({ message: "Oturum İzni Yok" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
