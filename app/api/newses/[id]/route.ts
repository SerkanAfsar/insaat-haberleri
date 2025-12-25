import { getNewsById } from "@/ClientServices/news.clientservice";
import { DeleteNewsService } from "@/Services/News.service";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await getNewsById(Number(id));
    if (!result) {
      return NextResponse.json("News Not Found", { status: 404 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json(message, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await DeleteNewsService(Number(id));
    revalidateTag("categories", "max");
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
