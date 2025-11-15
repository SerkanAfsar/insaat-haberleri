import {
  DeleteUserService,
  GetUserById,
  UpdateUserService,
} from "@/Services/Users.service";
import { AddUserType } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await DeleteUserService(Number(id));
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await GetUserById(Number(id));
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data: AddUserType = await req.json();
    const result = await UpdateUserService(Number(id), data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || (error as string) },
      { status: 400 },
    );
  }
}
