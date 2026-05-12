import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata = { title: "Terms of Service" };
const LAST_UPDATED = "2026-05-09";

const COPY: Record<Locale, { sections: { h: string; p: string[] }[] }> = {
  en: {
    sections: [
      {
        h: "1. Agreement",
        p: [
          "These Terms govern your use of jeunesse-inc.co. By using the site you agree to these Terms. If you disagree, do not use the site."
        ]
      },
      {
        h: "2. Services",
        p: [
          "The site describes Jeunesse LLC's services. Specific engagements are governed by a separate written services agreement (SOW or MSA)."
        ]
      },
      {
        h: "3. No guaranteed results",
        p: [
          "Marketing and AI engagements depend on factors outside our control. We do not guarantee specific revenue, ranking, or audience outcomes. Past results do not guarantee future results."
        ]
      },
      {
        h: "4. Intellectual property",
        p: [
          "All site content is owned by Jeunesse LLC or its licensors. You may not copy, modify, or distribute it without permission."
        ]
      },
      {
        h: "5. Acceptable use",
        p: [
          "Do not attempt to disrupt the site, scrape it abusively, or submit unlawful content through forms."
        ]
      },
      {
        h: "6. Disclaimers and liability",
        p: [
          "The site is provided \"as is\" without warranties to the extent permitted by law. To the maximum extent permitted, Jeunesse LLC's aggregate liability arising from your use of the site is limited to USD 100."
        ]
      },
      {
        h: "7. Governing law",
        p: [
          "These Terms are governed by the laws of the State of New York, USA, without regard to conflict-of-laws principles."
        ]
      },
      { h: "8. Contact", p: ["legal@jeunesse-inc.co"] }
    ]
  },
  ar: {
    sections: [
      {
        h: "١. الاتفاقية",
        p: [
          "تحكم هذه الشروط استخدامك لموقع jeunesse-inc.co. باستخدام الموقع فإنك توافق على هذه الشروط. إن لم توافق، فلا تستخدم الموقع."
        ]
      },
      { h: "٢. الخدمات", p: ["يصف الموقع خدمات جينيس. تحكم المشاريعَ اتفاقياتٌ مكتوبة منفصلة."] },
      {
        h: "٣. لا ضمان للنتائج",
        p: ["تعتمد نتائج الذكاء الاصطناعي والتسويق على عوامل خارج سيطرتنا. لا نضمن نتائج محدّدة."]
      },
      { h: "٤. الملكية الفكرية", p: ["محتوى الموقع ملك لجينيس أو لمرخّصيها. ممنوع نسخه أو تعديله بدون إذن."] },
      { h: "٥. الاستخدام المقبول", p: ["ممنوع تعطيل الموقع أو سحبه آليًا أو إرسال محتوى غير قانوني."] },
      {
        h: "٦. إخلاء المسؤولية",
        p: ["يُقدَّم الموقع كما هو. تقتصر مسؤوليتنا الإجمالية على 100 دولار أمريكي بأقصى حدّ يسمح به القانون."]
      },
      { h: "٧. القانون الحاكم", p: ["تخضع لقوانين ولاية نيويورك، الولايات المتحدة."] },
      { h: "٨. التواصل", p: ["legal@jeunesse-inc.co"] }
    ]
  }
};

export default function TermsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const copy = COPY[locale];

  return (
    <article className="section pt-20 lg:pt-28">
      <div className="container-wide max-w-3xl">
        <h1 className="font-display text-display-lg text-primary">{t.legal.terms.h1}</h1>
        <p className="mt-2 text-sm text-mute">
          {t.legal.terms.updated}: {LAST_UPDATED}
        </p>
        <div className="mt-8 space-y-8 text-mute leading-relaxed">
          {copy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl text-primary">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="mt-2">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
