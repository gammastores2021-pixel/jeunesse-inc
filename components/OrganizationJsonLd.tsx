import type { Locale } from "@/lib/i18n";

export default function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeunesse-inc.co";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jeunesse LLC",
    url: base,
    logo: `${base}/icons/logo.svg`,
    inLanguage: locale === "ar" ? "ar" : "en-US",
    email: "info@jeunesse-inc.co",
    sameAs: [],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "418 Broadway Ste R",
        addressLocality: "Albany",
        addressRegion: "NY",
        postalCode: "12207",
        addressCountry: "US"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "425 Cowork Regus Arkan Plaza",
        addressLocality: "Sheikh Zayed",
        addressCountry: "EG"
      }
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-405-544-4440",
        contactType: "sales",
        areaServed: ["US", "CA"],
        availableLanguage: ["English"]
      },
      {
        "@type": "ContactPoint",
        telephone: "+20-111-751-1172",
        contactType: "sales",
        areaServed: ["EG", "AE", "SA", "KW", "QA", "BH", "OM", "JO"],
        availableLanguage: ["Arabic", "English"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
