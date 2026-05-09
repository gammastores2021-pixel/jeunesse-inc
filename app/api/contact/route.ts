import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  company: z.string().max(180).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  consent: z.union([z.literal("on"), z.boolean(), z.string()]).optional(),
  locale: z.enum(["en", "ar"]).optional(),
  website: z.string().max(0).optional() // honeypot — must be empty
});

const memory = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const e = memory.get(ip);
  if (!e || now > e.resetAt) {
    memory.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (e.count >= LIMIT) return false;
  e.count++;
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anon";

  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // TODO: pipe to email provider (Resend, SES) or CRM (HubSpot) when keys are wired.
  console.info(
    "[contact]",
    JSON.stringify({
      at: new Date().toISOString(),
      ip,
      locale: parsed.data.locale,
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      // Avoid logging the full message in production logs.
      messageLength: parsed.data.message.length
    })
  );

  return NextResponse.json({ ok: true });
}
