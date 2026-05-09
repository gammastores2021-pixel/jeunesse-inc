import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata = { title: "Privacy Policy" };

const LAST_UPDATED = "2026-05-09";

const COPY: Record<Locale, { sections: { h: string; p: string[] }[] }> = {
  en: {
    sections: [
      {
        h: "1. Who we are",
        p: [
          "Jeunesse Stores LLC (\"we\", \"us\", \"our\") operates jeunesse-inc.co with offices at 418 Broadway Ste R, Albany, NY 12207, USA and 425 Cowork Regus Arkan Plaza, Sheikh Zayed, Egypt. Reach us at info@jeunesse-inc.co."
        ]
      },
      {
        h: "2. Information we collect",
        p: [
          "Information you provide via forms (name, email, phone, company, message). Technical data such as IP address, device type, and browser, collected for analytics and security.",
          "We do not knowingly collect data from children under 16."
        ]
      },
      {
        h: "3. How we use information",
        p: [
          "To respond to your inquiry, deliver requested services, manage proposals and contracts, and send service-related communications. With your separate consent, to send marketing communications you can opt out of at any time."
        ]
      },
      {
        h: "4. Legal bases (GDPR / Egyptian Personal Data Protection Law)",
        p: [
          "Performance of a contract, your consent, our legitimate interests in operating the business, and compliance with legal obligations."
        ]
      },
      {
        h: "5. Sharing",
        p: [
          "Service providers under written agreements (hosting, email, CRM, analytics). We do not sell personal data."
        ]
      },
      {
        h: "6. International transfers",
        p: [
          "Personal data may be processed in the United States and Egypt. We use appropriate safeguards including contractual data-protection clauses."
        ]
      },
      {
        h: "7. Retention",
        p: [
          "We keep contact data for as long as needed to deliver services and meet legal obligations, then delete or anonymize it."
        ]
      },
      {
        h: "8. Your rights",
        p: [
          "Access, correction, deletion, restriction, portability, and objection. Email info@jeunesse-inc.co to exercise any right. You may also contact your local supervisory authority."
        ]
      },
      {
        h: "9. Security",
        p: [
          "Administrative, technical, and physical safeguards. No system is perfectly secure; report concerns to security@jeunesse-inc.co."
        ]
      },
      {
        h: "10. Updates",
        p: ["We will post any changes here and update the date above."]
      }
    ]
  },
  ar: {
    sections: [
      {
        h: "١. من نحن",
        p: [
          "تُشغّل جونيس ستورز LLC الموقع jeunesse-inc.co من مكتبيها في 418 Broadway Ste R, Albany, NY 12207, USA و425 Cowork Regus Arkan Plaza, Sheikh Zayed, Egypt. للتواصل: info@jeunesse-inc.co."
        ]
      },
      {
        h: "٢. البيانات التي نجمعها",
        p: [
          "ما تقدّمه عبر النماذج (الاسم، البريد، الهاتف، الشركة، الرسالة). وبيانات تقنية كعنوان IP ونوع الجهاز والمتصفّح لأغراض التحليل والأمان.",
          "لا نجمع عن قصد بيانات أطفال دون 16 سنة."
        ]
      },
      {
        h: "٣. كيف نستخدم البيانات",
        p: [
          "للردّ على استفساراتك وتقديم الخدمات وإدارة العروض والعقود وإرسال تواصل خاص بالخدمة. وبموافقة منفصلة، لإرسال رسائل تسويقية يمكنك إلغاء الاشتراك منها في أي وقت."
        ]
      },
      { h: "٤. الأساس القانوني", p: ["تنفيذ عقد، موافقتك، مصالحنا المشروعة، والالتزامات القانونية."] },
      {
        h: "٥. المشاركة",
        p: [
          "مع مزوّدي خدمة بموجب اتفاقيات مكتوبة (استضافة، بريد، CRM، تحليلات). لا نبيع البيانات الشخصية."
        ]
      },
      { h: "٦. التحويلات الدولية", p: ["قد تُعالَج البيانات في الولايات المتحدة ومصر، مع ضمانات مناسبة."] },
      { h: "٧. الاحتفاظ", p: ["نحتفظ بالبيانات للمدّة اللازمة للخدمة والالتزام القانوني، ثم نحذفها."] },
      {
        h: "٨. حقوقك",
        p: [
          "الوصول والتصحيح والحذف والتقييد والنقل والاعتراض. للممارسة راسلنا على info@jeunesse-inc.co."
        ]
      },
      { h: "٩. الأمان", p: ["ضوابط إدارية وتقنية ومادّية. أبلغ عن أي مخاوف إلى security@jeunesse-inc.co."] },
      { h: "١٠. التحديثات", p: ["تُنشَر التعديلات هنا مع تحديث التاريخ أعلاه."] }
    ]
  }
};

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const copy = COPY[locale];

  return (
    <article className="section pt-20 lg:pt-28">
      <div className="container-wide max-w-3xl">
        <h1 className="font-display text-display-lg text-primary">{t.legal.privacy.h1}</h1>
        <p className="mt-2 text-sm text-mute">
          {t.legal.privacy.updated}: {LAST_UPDATED}
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
