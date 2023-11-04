import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import QuestionForm from "../components/QuestionForm";

import { db } from "@/db";
import { receipes } from "@/db/schema";

export default async function Dashboard() {
  const session: { user: { name: string } } | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const result = await db.select().from(receipes);

  const res = await db.query.users.findFirst({
    with: {
      receipes: true,
    },
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {!session.user.name ? <p>What is your name?</p> : null}
      <QuestionForm user={session.user.name} />
      <div className="p-8">
        {result.map((receipe) => (
          <div key={receipe.createdAt.toString()}>
            <p>{receipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2DO - find many
