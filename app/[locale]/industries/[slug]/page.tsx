import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import BannerMedia from "@/components/BannerMedia";
import FinalCTA from "@/components/FinalCTA";

const SLUGS = ["retail-ecommerce", "financial-services", "healthcare", "saas-technology"] as const;

const BANNERS: Record<(typeof SLUGS)[number], string> = {
  "retail-ecommerce": "/images/industry-retail.webp",
  "financial-services": "/images/industry-finance.webp",
  healthcare: "/images/industry-healthcare.webp",
  "saas-technology": "/images/industry-saas.webp"
};

export async function generateStaticParams() {
  return locales.flatMap((locale) => SLUGS.map((slug) => ({ locale, slug })));
}

export default function IndustryDetail({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const item = t.industries.items.find((i) => i.slug === params.slug);
  if (!item) notFound();

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-4xl">
          <p className="eyebrow mb-3">
            <Link href={`/${locale}/industries`} className="hover:text-primary">{t.nav.industries}</Link>
            <span className="mx-2 text-border">/</span>
            <span>{item.title}</span>
          </p>
          <h1 className="font-display text-display-lg text-primary">{item.title}</h1>
          <p className="mt-5 text-lg text-mute leading-relaxed max-w-2xl">{item.body}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <BannerMedia
            image={BANNERS[item.slug as (typeof SLUGS)[number]]}
            alt={item.title}
            ratio="4:3"
            priority
          />
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/services/${s.slug}`}
              className="card group"
            >
              <h3 className="font-display text-lg text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-mute">{s.summary}</p>
              <span className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-2">
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
