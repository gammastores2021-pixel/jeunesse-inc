import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import BannerMedia from "@/components/BannerMedia";

export const metadata = { title: "Contact" };

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="section pt-20 lg:pt-28">
        <div className="container-wide max-w-3xl">
          <SectionHeader eyebrow={t.nav.contact} title={t.contact.h1} lead={t.contact.lead} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <BannerMedia image="/images/contact-offices.webp" alt={t.contact.officesTitle} ratio="16:9" priority />
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="card">
              <h2 className="font-display text-2xl text-primary mb-6">{t.contact.formTitle}</h2>
              <ContactForm t={t.contact} submitLabel={t.cta.submit} locale={locale} />
            </div>
          </div>
          <aside className="lg:col-span-2 space-y-8">
            <div>
              <p className="eyebrow mb-3">{t.contact.officesTitle}</p>
              <address className="not-italic text-primary leading-relaxed">
                <p className="font-medium">{t.about.officeUS}</p>
                <p className="text-mute">418 Broadway Ste R, Albany, NY 12207, USA</p>
                <a className="hover:text-accent" href="tel:+14055444440">+1 (405) 544-4440</a>
              </address>
            </div>
            <div>
              <address className="not-italic text-primary leading-relaxed">
                <p className="font-medium">{t.about.officeEG}</p>
                <p className="text-mute">425 Cowork Regus Arkan Plaza, {locale === "ar" ? "الشيخ زايد" : "Sheikh Zayed"}</p>
                <a className="hover:text-accent" href="tel:+201117511172">+20 111 751 1172</a>
              </address>
            </div>
            <div>
              <p className="eyebrow mb-2">{t.contact.or}</p>
              <a className="text-primary hover:text-accent" href="mailto:info@jeunesse-inc.co">
                info@jeunesse-inc.co
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
