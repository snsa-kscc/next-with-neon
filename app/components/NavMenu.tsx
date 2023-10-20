"use client";

import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.email} <br />
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign out
        </button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
