import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";

export const metadata = {
  title: "Services",
  description: "AI Transformation, Integrated Marketing, Branding & Documentation, Affiliate & Commission."
};

export default function ServicesIndex({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide">
          <SectionHeader eyebrow={t.nav.services} title={t.services.h1} lead={t.services.lead} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide grid md:grid-cols-2 gap-6">
          {t.services.items.map((s, i) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="card group flex flex-col"
            >
              <span className="font-display text-sm text-accent mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl text-primary">{s.title}</h3>
              <p className="mt-3 text-sm text-mute leading-relaxed">{s.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-primary/90">
                {s.bullets.slice(0, 3).map((b) => (
                  <li key={b} className="flex gap-2 items-start">
                    <span aria-hidden className="text-accent mt-1">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 text-sm text-primary font-medium inline-flex items-center gap-2">
                {t.cta.learn} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
