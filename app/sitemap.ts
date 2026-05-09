import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeunesse-inc.co";

const STATIC = [
  "",
  "/services",
  "/services/ai-transformation",
  "/services/integrated-marketing",
  "/services/branding-documentation",
  "/services/affiliate-commission",
  "/industries",
  "/industries/retail-ecommerce",
  "/industries/financial-services",
  "/industries/healthcare",
  "/industries/saas-technology",
  "/case-studies",
  "/insights",
  "/about",
  "/contact",
  "/book-a-call",
  "/privacy-policy",
  "/cookie-policy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    STATIC.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.6
    }))
  );
}
