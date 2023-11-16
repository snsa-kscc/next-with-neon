"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.email} <br />
        <Button
          variant="outline"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign out
        </Button>
        <Langs />
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <Button variant="outline" onClick={() => signIn()}>
          Sign in
        </Button>
        <Langs />
      </>
    );
  }
}

function Langs() {
  return (
    <div className="flex py-4">
      <Button className="mx-2" variant="outline">
        English
      </Button>
      <Button className="mx-2" variant="outline">
        French
      </Button>
      <Button className="mx-2" variant="outline">
        German
      </Button>
    </div>
  );
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
