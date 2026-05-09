import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["en", "ar"];
const DEFAULT_LOCALE = "en";

function pickLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase();
    if (code.startsWith("ar")) return "ar";
    if (code.startsWith("en")) return "en";
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = SUPPORTED.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const exempt = ["/api", "/_next", "/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/favicon.ico", "/icons", "/images"];
  if (exempt.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|api).*)"]
};
