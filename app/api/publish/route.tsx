import { db } from "@/db";
import { receipes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET() {
  const result = await db
    .update(receipes)
    .set({ active: true })
    .where(and(eq(receipes.userId, "47a1d3a6-10c8-4939-bb28-79c22a42d4f4"), eq(receipes.description, "prvi")))
    .returning({ status: receipes.active, id: receipes.userId });

  return Response.json(result);
}
