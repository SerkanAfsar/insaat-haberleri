import { createSession, decrypt } from "@/lib/auth";
import prisma from "@/lib/db";
import { SessionPayload } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { refreshToken: refresh } = await req.json();

  const verifiedRefresh = await decrypt(refresh, "refreshToken");

  if (!verifiedRefresh) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  const user = await prisma.users.findFirst({
    where: {
      id: Number(verifiedRefresh.userId),
    },
    select: {
      email: true,
      id: true,
      name: true,
      surname: true,
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
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  const session: SessionPayload = {
    userEmail: user.email,
    userId: user.id.toString(),
    userName: user.name,
    userSurname: user.surname,
    claims: [
      ...new Set(user.UserRoles.flatMap((a) => JSON.parse(a.role.claims))),
    ],
  };

  const acccessToken = await createSession(session, "accessToken");

  const refreshToken = await createSession(verifiedRefresh, "refreshToken");

  return NextResponse.json(
    {
      result: {
        acccessToken,
        refreshToken,
      },
    },
    { status: 201 },
  );
}
