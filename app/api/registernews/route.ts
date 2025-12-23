import { RegisterAllNewses } from "@/Services/News.service";

import { NextResponse } from "next/server";

export async function GET() {
  await RegisterAllNewses();

  return NextResponse.json({ message: "Test" }, { status: 200 });
}
