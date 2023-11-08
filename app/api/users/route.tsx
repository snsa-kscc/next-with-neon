import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  const data: { name: string } = await request.json();

  const session = await getServerSession(authOptions);

  await db.update(users).set({ name: data.name }).where(eq(users.id, session?.user.id!));

  return Response.json(data);
}
