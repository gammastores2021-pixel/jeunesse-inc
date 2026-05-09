import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "Insights" };

export default function InsightsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-3xl">
          <SectionHeader eyebrow={t.nav.insights} title={t.insights.h1} lead={t.insights.lead} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <div className="card max-w-xl">
            <p className="text-mute">{t.insights.empty}</p>
            <form className="mt-5 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                aria-label={locale === "ar" ? "البريد الإلكتروني" : "Email"}
                placeholder={locale === "ar" ? "بريدك الإلكتروني" : "you@company.com"}
                className="input flex-1"
              />
              <button type="submit" className="btn btn-primary">
                {locale === "ar" ? "اشترك" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
