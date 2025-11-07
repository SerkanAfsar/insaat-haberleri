import { AuthLogin } from "@/Services/Auth.service";
import { LoginType } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: LoginType = await req.json();
    const result = await AuthLogin(data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}
