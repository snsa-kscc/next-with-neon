import { Locale } from "@/i18n.config";
import Link from "next/link";

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <div>
      <div>Welcome to messagelizer</div>
      go to <Link href="/dashboard">dashboard</Link>
      <pre>{JSON.stringify(lang, null, 2)}</pre>
    </div>
  );
}
