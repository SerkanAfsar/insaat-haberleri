import { CACHE_KEYS } from "@/lib/utils";
import {
  AddCategoryService,
  GetAllCategoriesService,
} from "@/Services/Category.service";
import { AddCategoryType } from "@/Types";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const count = Number(searchParams.get("count")) || 10;
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const filters = JSON.parse(searchParams.get("filters") || "[]");

    const result = await GetAllCategoriesService({
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

export async function POST(req: NextRequest) {
  try {
    const data: AddCategoryType = await req.json();

    const result = await AddCategoryService(data);
    revalidateTag(CACHE_KEYS.CATEGORY_DETAIL, "default");
    revalidateTag(CACHE_KEYS.CATEGORY_LIST, "default");
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || (error as string) },
      { status: 400 },
    );
  }
}
