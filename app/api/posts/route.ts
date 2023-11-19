import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users, receipes } from "@/db/schema";
import { NextResponse } from "next/server";
import { Locale } from "@/i18n.config";

interface Post {
  description: string;
  lang: Locale;
}

export async function POST(request: Request) {
  try {
    const data: Post = await request.json();
    const session: { user: { email: string } } | null = await getServerSession(authOptions);
    const userId: { id: string }[] = await db.selectDistinct({ id: users.id }).from(users).where(eq(users.email, session?.user.email!));

    await db.insert(receipes).values({
      userId: userId[0].id,
      description: data.description,
      createdAt: new Date(),
      lang: data.lang,
    });

    return NextResponse.json(data);
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const queryParam = new URL(request.url).searchParams.get("query");
  const data = parseInt(queryParam!);

  const deletedUser = await db.delete(receipes).where(eq(receipes.id, data)).returning();

  return Response.json(deletedUser);
}

export async function PATCH(request: Request) {
  const queryParamString = new URL(request.url).searchParams.get("query");
  const data: { active: boolean } = await request.json();
  const queryParam = parseInt(queryParamString!);

  const result = await db.update(receipes).set({ active: data.active }).where(eq(receipes.id, queryParam)).returning();

  return Response.json(result);
}
