import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata = { title: "Cookie Policy" };
const LAST_UPDATED = "2026-05-09";

const COPY: Record<Locale, { intro: string; categories: { h: string; p: string }[] }> = {
  en: {
    intro:
      "We use a small set of cookies and similar technologies to operate the site, remember preferences, and measure performance. You can accept or decline non-essential cookies via the banner.",
    categories: [
      {
        h: "Strictly necessary",
        p: "Required for the site to function. They cannot be turned off and do not store personal information."
      },
      {
        h: "Performance",
        p: "Aggregate analytics that help us improve the site (loading speed, errors, broad traffic patterns). Loaded only with consent."
      },
      {
        h: "Functional",
        p: "Remember your language preference and other display options."
      }
    ]
  },
  ar: {
    intro:
      "نستخدم مجموعة صغيرة من ملفات الارتباط لتشغيل الموقع وحفظ التفضيلات وقياس الأداء. يمكنك القبول أو الرفض من خلال الشريط.",
    categories: [
      { h: "ضرورية", p: "لازمة لعمل الموقع. لا يمكن تعطيلها ولا تحتفظ ببيانات شخصية." },
      {
        h: "أداء",
        p: "تحليلات إجمالية تساعدنا على التحسين (سرعة التحميل، الأخطاء، أنماط الزيارة). تُحمَّل بعد الموافقة."
      },
      { h: "وظيفية", p: "تتذكر تفضيلات اللغة والعرض." }
    ]
  }
};

export default function CookiesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const copy = COPY[locale];

  return (
    <article className="section pt-20 lg:pt-28">
      <div className="container-wide max-w-3xl">
        <h1 className="font-display text-display-lg text-primary">{t.legal.cookies.h1}</h1>
        <p className="mt-2 text-sm text-mute">
          {t.legal.cookies.updated}: {LAST_UPDATED}
        </p>
        <p className="mt-6 text-mute leading-relaxed">{copy.intro}</p>
        <div className="mt-8 space-y-8">
          {copy.categories.map((c) => (
            <section key={c.h}>
              <h2 className="font-display text-xl text-primary">{c.h}</h2>
              <p className="mt-2 text-mute leading-relaxed">{c.p}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
