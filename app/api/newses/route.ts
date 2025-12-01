import { GetAllNewsesService } from "@/Services/Newses.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const count = Number(searchParams.get("count")) || 10;
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const filters = JSON.parse(searchParams.get("filters") || "[]");

    const result = await GetAllNewsesService({
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
