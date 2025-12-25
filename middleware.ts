import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

import { ApiCheckValue, ApiRoleType, MethodType } from "./lib/admin.data";
import { cookies } from "next/headers";

const allowedApiRoutes = [
  "/api/login",
  "/api/refresh",
  "/api/categorydetail",
  "/api/registernews",
  "/api/newses/most-readed",
  "/api/newses/tab-list",
  "/api/newses",
];

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = req.cookies.get("accessToken")?.value;

  const refreshToken = req.cookies.get("refreshToken")?.value;

  const pathName = req.nextUrl.pathname;

  const adminUrl = pathName.includes("/Admin");
  const apiUrl = pathName.includes("/api");

  const userSession = await decrypt(accessToken, "accessToken");

  const isAllowed = allowedApiRoutes.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );

  if (apiUrl && isAllowed) {
    return NextResponse.next();
  }

  if (accessToken && userSession && apiUrl) {
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

  if (!accessToken || !userSession) {
    const url = new URL(req.url);
    const response = await fetch(`${url.origin}/api/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (response.ok) {
      const {
        result: { acccessToken, refreshToken },
      } = await response.json();

      cookieStore.set("accessToken", acccessToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(acccessToken.expires),
      });

      cookieStore.set("refreshToken", refreshToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(refreshToken.expires),
      });

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
