// import { getServerSession } from "next-auth";
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  // const session = await getServerSession();
  const { data: session } = useSession();

  if (!session || !session.user) {
    // redirect("/api/auth/signin");
    return <div>You must be signed in</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
