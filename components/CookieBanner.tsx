"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  t: { text: string; accept: string; decline: string; learn: string };
  locale: Locale;
};

const KEY = "jeunesse:cookie-consent:v1";

export default function CookieBanner({ t, locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accept" | "decline") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-4 inset-x-4 lg:inset-x-auto lg:end-6 lg:max-w-md z-50
                 rounded-lg border border-border bg-white shadow-soft p-5"
    >
      <p className="text-sm text-primary leading-relaxed">{t.text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => decide("accept")} className="btn btn-primary">
          {t.accept}
        </button>
        <button onClick={() => decide("decline")} className="btn btn-ghost">
          {t.decline}
        </button>
        <Link
          href={`/${locale}/cookie-policy`}
          className="text-xs text-mute underline underline-offset-4 ms-auto hover:text-primary"
        >
          {t.learn}
        </Link>
      </div>
    </div>
  );
}
