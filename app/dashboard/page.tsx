import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import QuestionForm from "../components/QuestionForm";
import NameForm from "../components/NameForm";

import { db } from "@/db";
import { receipes, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

export default async function Dashboard() {
  const session: { user: { name: string; email: string } } | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const result = await db.select().from(receipes).innerJoin(users, eq(receipes.userId, users.id));

  const res = await db.query.users.findFirst({
    where: () => eq(users.email, session.user.email),
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {!session.user.name ? (
        <div>
          <p>What is your name?</p>
          <NameForm></NameForm>
        </div>
      ) : null}
      <NameForm></NameForm>
      <QuestionForm user={session.user.name} />
      <div className="p-8">
        {result.map((item) => (
          <div className="flex flex-col" key={item.recipe.createdAt.toString()}>
            <p>
              {item.recipe.description} by {item.user.name} -
            </p>
            <p title={`${item.recipe.createdAt}`}>{formatTimeAgo(item.recipe.createdAt)}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
