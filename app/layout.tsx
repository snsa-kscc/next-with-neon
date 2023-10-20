import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main className="mx-auto max-w-5xl text-2xl flex gap-4">
            <NavMenu />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
