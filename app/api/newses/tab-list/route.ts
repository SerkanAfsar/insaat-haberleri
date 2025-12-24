import {
  LatestTabListNews,
  PopularTabListNews,
  RandomTabListNews,
} from "@/ClientServices/news.clientservice";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = Number(searchParams.get("id"));

    console.log(categoryId, "deneme");
    const id = isNaN(categoryId) ? undefined : categoryId;

    const [latestNews, popularNews, randomNews] = await Promise.all([
      LatestTabListNews(id),
      PopularTabListNews(id),
      RandomTabListNews(id),
    ]);
    return NextResponse.json(
      { latestNews, popularNews, randomNews },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(error.message || "Err", { status: 400 });
  }
}
