import { Locale } from "@/i18n.config";
import Link from "next/link";
import Image from "next/image";

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <div>
      <div>Welcome to messagelizer</div>
      go to <Link href="/dashboard">dashboard</Link>
      <pre>{JSON.stringify(lang, null, 2)}</pre>
      <img src="/next.svg" alt="" />
      <Image src="/vercel.svg" alt="next" width={200} height={200} />
    </div>
  );
}
