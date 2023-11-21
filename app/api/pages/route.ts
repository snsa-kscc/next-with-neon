import { db } from "@/db";
import { contents } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(contents);

  return NextResponse.json(data);
}
