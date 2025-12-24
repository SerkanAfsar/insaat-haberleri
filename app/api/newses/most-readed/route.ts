import { mostReadede3NewsList } from "@/ClientServices/news.clientservice";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await mostReadede3NewsList();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message || "Error", { status: 400 });
  }
}
