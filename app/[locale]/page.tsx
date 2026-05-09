import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import PillarCard from "@/components/PillarCard";
import ProcessStep from "@/components/ProcessStep";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} t={t} />

      <section className="section">
        <div className="container-wide">
          <SectionHeader eyebrow="01" title={t.home.pillarsTitle} lead={t.home.pillarsLead} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.pillars.map((p, i) => (
              <PillarCard
                key={p.title}
                index={i}
                title={p.title}
                body={p.body}
                href={`/${locale}/services/${t.services.items[i]?.slug}`}
                cta={t.cta.learn}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white border-y border-border">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <SectionHeader eyebrow="02" title={t.home.proofTitle} lead={t.home.proofLead} />
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {t.home.process.map((s) => (
              <ProcessStep key={s.step} step={s.step} title={s.title} body={s.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <SectionHeader eyebrow="03" title={t.home.industriesTitle} lead={t.home.industriesLead} />
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.home.industries.map((i) => (
              <li
                key={i}
                className="rounded-md border border-border bg-white px-5 py-4 text-sm text-primary"
              >
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href={`/${locale}/industries`} className="btn btn-ghost">
              {t.cta.learn}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid lg:grid-cols-3 gap-10">
          <div>
            <SectionHeader eyebrow="FAQ" title={t.faq.h1} />
          </div>
          <div className="lg:col-span-2 divide-y divide-border">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-primary font-medium">
                  <span>{f.q}</span>
                  <span className="text-mute group-open:rotate-45 transition-transform" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-mute leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA locale={locale} t={t} />
    </>
  );
}
