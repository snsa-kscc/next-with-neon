import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import QuestionForm from "../../../components/QuestionForm";
import NameForm from "../../../components/NameForm";

import { db } from "@/db";
import { receipes, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { formatTimeAgo } from "@/lib/formatTimeAgo";
import { Locale } from "@/i18n.config";

export default async function Dashboard({ params: { lang } }: { params: { lang: Locale } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const result = await db
    .select()
    .from(receipes)
    .innerJoin(users, eq(receipes.userId, users.id))
    .where(eq(receipes.lang, lang))
    .orderBy(desc(receipes.createdAt));

  const res = await db.query.users.findFirst({
    where: () => eq(users.email, session.user.email),
  });

  return (
    <div className="flex-grow">
      <h1>Dashboard</h1>
      <code>{JSON.stringify(lang, null, 2)}</code>
      {!session.user.name ? (
        <div>
          <p>What is your name?</p>
          <NameForm></NameForm>
        </div>
      ) : null}
      <NameForm></NameForm>
      <QuestionForm user={session.user.name!} lang={lang} />
      <div className="p-8">
        {result
          .filter((item) => item.recipe.active === true || item.user.id === session.user.id)
          .map((item) => (
            <div className="flex p-2 justify-around" key={item.recipe.createdAt.toString()}>
              <p>{item.recipe.description}</p>
              {!item.recipe.active && <p>Under moderation</p>}
              <p>{item.user.name}</p>
              <p title={`${item.recipe.createdAt}`}>{formatTimeAgo(item.recipe.createdAt)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
