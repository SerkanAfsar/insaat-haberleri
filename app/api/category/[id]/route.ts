import { CACHE_KEYS } from "@/lib/utils";
import {
  DeleteCategoryService,
  GetCategoryByIdService,
  UpdateCategoryService,
} from "@/Services/Category.service";
import { AddCategoryType } from "@/Types";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await GetCategoryByIdService(Number(id));
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await DeleteCategoryService(Number(id));
    revalidateTag(CACHE_KEYS.CATEGORY_DETAIL, "default");
    revalidateTag(CACHE_KEYS.CATEGORY_LIST, "default");
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data: AddCategoryType = await req.json();
    const result = await UpdateCategoryService(Number(id), data);
    revalidateTag(CACHE_KEYS.CATEGORY_DETAIL, "default");
    revalidateTag(CACHE_KEYS.CATEGORY_LIST, "default");
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
