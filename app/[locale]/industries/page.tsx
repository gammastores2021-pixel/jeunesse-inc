import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "Industries" };

const BANNERS: Record<string, string> = {
  "retail-ecommerce": "/images/industry-retail.webp",
  "financial-services": "/images/industry-finance.webp",
  healthcare: "/images/industry-healthcare.webp",
  "saas-technology": "/images/industry-saas.webp"
};

export default function IndustriesIndex({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide">
          <SectionHeader eyebrow={t.nav.industries} title={t.industries.h1} lead={t.industries.lead} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide grid sm:grid-cols-2 gap-6">
          {t.industries.items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/${locale}/industries/${item.slug}`}
              className="group block rounded-lg border border-border bg-white shadow-soft overflow-hidden
                         transition-shadow hover:shadow-[0_2px_4px_rgba(11,31,58,.08),0_16px_40px_rgba(11,31,58,.10)]"
            >
              <div className="relative aspect-[4/3] bg-primary overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={BANNERS[item.slug]}
                  alt={item.title}
                  width={1600}
                  height={1200}
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchPriority={i < 2 ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-editorial
                             group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-2xl text-primary">{item.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{item.body}</p>
                <span className="mt-6 text-sm text-primary font-medium inline-flex items-center gap-2">
                  {t.cta.learn} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
