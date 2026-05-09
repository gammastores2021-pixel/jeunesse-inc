import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";
import BannerMedia from "@/components/BannerMedia";

export const metadata = { title: "About" };

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-3xl">
          <SectionHeader eyebrow={t.nav.about} title={t.about.h1} lead={t.about.lead} />
          <div className="mt-8 space-y-5 text-mute leading-relaxed">
            {t.about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <BannerMedia
            image="/images/about-team.webp"
            video="/videos/about-team-loop.mp4"
            alt={t.about.h1}
            ratio="16:9"
            priority
          />
        </div>
      </section>

      <section className="section bg-white border-y border-border">
        <div className="container-wide grid lg:grid-cols-3 gap-10">
          <SectionHeader eyebrow="04" title={t.about.valuesTitle} />
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {t.about.values.map((v) => (
              <div key={v.title} className="border-t border-border pt-6">
                <h3 className="font-display text-lg text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-mute leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <BannerMedia image="/images/contact-offices.webp" alt={t.about.officesTitle} ratio="16:9" />
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader eyebrow={t.about.officesTitle} title={t.about.officeUS} />
            <address className="not-italic mt-5 text-mute leading-relaxed">
              418 Broadway Ste R<br />
              Albany, NY 12207, USA<br />
              <a className="text-primary hover:text-accent" href="tel:+14055444440">
                +1 (405) 544-4440
              </a>
            </address>
          </div>
          <div>
            <SectionHeader eyebrow={t.about.officesTitle} title={t.about.officeEG} />
            <address className="not-italic mt-5 text-mute leading-relaxed">
              425 Cowork Regus Arkan Plaza<br />
              {locale === "ar" ? "الشيخ زايد، مصر" : "Sheikh Zayed, Egypt"}<br />
              <a className="text-primary hover:text-accent" href="tel:+201117511172">
                +20 111 751 1172
              </a>
            </address>
          </div>
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
