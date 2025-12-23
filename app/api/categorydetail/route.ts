import { getCategoryDetailWithPaginatitedNews } from "@/ClientServices/category.clientservice";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const page = searchParams.get("page");

    const result = await getCategoryDetailWithPaginatitedNews(
      Number(id),
      Number(page),
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message || "Err", { status: 400 });
  }
}
