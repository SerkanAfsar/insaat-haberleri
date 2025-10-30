import {
  DeleteRoleService,
  GetSingleRoleById,
  UpdateRoleService,
} from "@/Services/Role.service";
import { AddRoleType } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const result = await DeleteRoleService(Number(id));
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}
export async function GET(
  req: NextResponse,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const result = await GetSingleRoleById(Number(id));
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}

export async function PUT(
  req: NextResponse,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data: AddRoleType = await req.json();
    const result = await UpdateRoleService(Number(id), data);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}
