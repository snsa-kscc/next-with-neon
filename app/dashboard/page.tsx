import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import QuestionForm from "../components/QuestionForm";

export default async function Dashboard() {
  const session: { user: { name: string } } | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {!session.user.name ? <p>What is your name?</p> : null}
      <QuestionForm user={session.user.name} />
    </div>
  );
}
