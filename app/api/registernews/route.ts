import { CACHE_KEYS } from "@/lib/utils";
import { RegisterAllNewses } from "@/Services/News.service";
import { revalidateTag } from "next/cache";

import { NextResponse } from "next/server";

export async function GET() {
  await RegisterAllNewses();
  revalidateTag(CACHE_KEYS.CATEGORY_DETAIL, "default");
  revalidateTag(CACHE_KEYS.CATEGORY_LIST, "default");
  revalidateTag(CACHE_KEYS.MOST_READED, "default");
  revalidateTag(CACHE_KEYS.TAB_LIST, "default");

  return NextResponse.json({ message: "Test" }, { status: 200 });
}
