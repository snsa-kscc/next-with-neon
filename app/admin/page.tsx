import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "admin") {
    return <div>You have access</div>;
  }

  return <div>You don't have access</div>;
}
