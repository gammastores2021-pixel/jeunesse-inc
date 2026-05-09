"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const stripped = pathname.replace(/^\/(en|ar)/, "") || "";

  return (
    <div className="flex items-center text-xs text-mute" role="group" aria-label="Language">
      {locales.map((l, i) => {
        const href = `/${l}${stripped}`;
        const active = l === locale;
        return (
          <span key={l} className="flex items-center">
            <Link
              href={href}
              hrefLang={l === "en" ? "en-US" : "ar"}
              aria-current={active ? "true" : undefined}
              className={
                active ? "text-primary font-medium" : "hover:text-primary transition-colors"
              }
            >
              {l === "en" ? "EN" : "AR"}
            </Link>
            {i === 0 && <span className="px-2 text-border">|</span>}
          </span>
        );
      })}
    </div>
  );
}
