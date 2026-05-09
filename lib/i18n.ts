import { en } from "./dictionaries/en";
import { ar } from "./dictionaries/ar";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const dictionaries = { en, ar } as const;
export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function alternateLinks(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeunesse-inc.co";
  return locales.map((l) => ({
    hrefLang: l === "en" ? "en-US" : "ar",
    href: `${base}/${l}${path}`
  }));
}
