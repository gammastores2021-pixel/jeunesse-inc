import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";
import BannerMedia from "@/components/BannerMedia";

export const metadata = { title: "Case Studies" };

export default function CaseStudiesIndex({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-3xl">
          <SectionHeader eyebrow={t.nav.caseStudies} title={t.caseStudies.h1} lead={t.caseStudies.lead} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <BannerMedia
            image="/images/case-banner.webp"
            video="/videos/process-reel.mp4"
            alt={t.caseStudies.h1}
            ratio="16:9"
            priority
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <div className="card max-w-2xl">
            <p className="text-mute leading-relaxed">{t.caseStudies.empty}</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary mt-6">
              {t.caseStudies.requestAccess}
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
