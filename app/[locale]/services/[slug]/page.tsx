import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import BannerMedia from "@/components/BannerMedia";

const SERVICE_SLUGS = [
  "ai-transformation",
  "integrated-marketing",
  "branding-documentation",
  "affiliate-commission"
] as const;

const SERVICE_MEDIA: Record<
  (typeof SERVICE_SLUGS)[number],
  { image: string; video?: string }
> = {
  "ai-transformation": {
    image: "/images/service-ai-banner.webp",
    video: "/videos/service-ai-reel.mp4"
  },
  "integrated-marketing": {
    image: "/images/service-mkt-banner.webp",
    video: "/videos/service-mkt-reel.mp4"
  },
  "branding-documentation": {
    image: "/images/service-brand-banner.webp"
  },
  "affiliate-commission": {
    image: "/images/service-affiliate-banner.webp",
    video: "/videos/service-affiliate-reel.mp4"
  }
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  const item = t.services.items.find((s) => s.slug === params.slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default function ServiceDetail({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const idx = t.services.items.findIndex((s) => s.slug === params.slug);
  if (idx < 0) notFound();
  const item = t.services.items[idx];
  const next = t.services.items[(idx + 1) % t.services.items.length];

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-4xl">
          <p className="eyebrow mb-3">
            <Link href={`/${locale}/services`} className="hover:text-primary">{t.nav.services}</Link>
            <span className="mx-2 text-border">/</span>
            <span>{item.title}</span>
          </p>
          <h1 className="font-display text-display-lg text-primary">{item.title}</h1>
          <p className="mt-5 text-lg text-mute leading-relaxed max-w-2xl">{item.summary}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <BannerMedia
            image={SERVICE_MEDIA[item.slug as (typeof SERVICE_SLUGS)[number]].image}
            video={SERVICE_MEDIA[item.slug as (typeof SERVICE_SLUGS)[number]].video}
            alt={item.title}
            ratio="16:9"
            priority
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <SectionHeader
              eyebrow={locale === "ar" ? "ما نُسلّمه" : "What we deliver"}
              title={locale === "ar" ? "نطاق العمل" : "Scope of work"}
            />
          </div>
          <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
            {item.bullets.map((b) => (
              <li key={b} className="card text-sm text-primary leading-relaxed">
                <span className="text-accent me-2" aria-hidden>—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white border-y border-border">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <SectionHeader
            eyebrow={t.home.proofTitle}
            title={locale === "ar" ? "كيف ننفّذ" : "How we deliver"}
            lead={locale === "ar" ? "مسار قصير وشفّاف." : "A short, transparent path."}
          />
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {t.home.process.map((s) => (
              <div key={s.step} className="border-t border-border pt-6">
                <p className="font-display text-accent text-sm tracking-wide">{s.step}</p>
                <h3 className="mt-2 font-display text-lg text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-mute leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-mute">
            {locale === "ar" ? "التالي" : "Next"} —{" "}
            <Link
              className="text-primary hover:text-accent"
              href={`/${locale}/services/${next.slug}`}
            >
              {next.title}
            </Link>
          </p>
          <Link href={`/${locale}/book-a-call`} className="btn btn-primary">
            {t.cta.book}
          </Link>
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
