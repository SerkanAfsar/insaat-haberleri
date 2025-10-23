import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const pathName = req.nextUrl.pathname;

  if (pathName.includes("/api") && !accessToken) {
    return NextResponse.json({ message: "Oturum İzni Yok" }, { status: 401 });
  }

  if (!accessToken && req.nextUrl.pathname !== "/Login") {
    // return NextResponse.redirect(new URL("/Login?expired=true", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
