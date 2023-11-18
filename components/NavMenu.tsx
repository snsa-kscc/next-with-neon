"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Locale } from "@/i18n.config";
import LocaleSwitcher from "./LocaleSwitcher";

function AuthButton({ lang }: { lang: Locale }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.email} <br />
        <pre>{JSON.stringify(lang, null, 2)}</pre>
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
        <LocaleSwitcher />
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <pre>{JSON.stringify(lang, null, 2)}</pre>
        <Button variant="outline" onClick={() => signIn()}>
          Sign in
        </Button>
        <LocaleSwitcher />
      </>
    );
  }
}

export default function NavMenu({ lang }: { lang: Locale }) {
  return (
    <div>
      <AuthButton lang={lang} />
    </div>
  );
}
