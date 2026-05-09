import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const BookSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  company: z.string().max(180).optional().or(z.literal("")),
  timezone: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  consent: z.union([z.literal("on"), z.boolean(), z.string()]).optional(),
  locale: z.enum(["en", "ar"]).optional(),
  website: z.string().max(0).optional()
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = BookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }
  console.info("[book]", { at: new Date().toISOString(), email: parsed.data.email, tz: parsed.data.timezone });
  return NextResponse.json({ ok: true });
}
