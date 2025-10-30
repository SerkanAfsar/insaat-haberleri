import { AddRoleService, GetAllRolesService } from "@/Services/Role.service";
import { AddRoleType } from "@/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: AddRoleType = await req.json();

    const result = await AddRoleService(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const count = Number(searchParams.get("count")) || 10;
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const filters = JSON.parse(searchParams.get("filters") || "[]");

    const result = await GetAllRolesService({
      count,
      filters,
      globalFilter,
      offset,
      sorting,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}
