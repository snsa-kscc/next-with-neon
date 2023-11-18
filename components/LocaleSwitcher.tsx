import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "@/i18n.config";

function LocaleSwitcher() {
  const pathName = usePathname();

  function redirectedPathName(locale: string) {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  }

  return (
    <ul className="flex gap-x-3 my-10">
      {i18n.locales.map((locale) => (
        <li key={locale}>
          <Link className="rounded-md border bg-black px-3 py-2 text-white" href={redirectedPathName(locale)}>
            {locale}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocaleSwitcher;
