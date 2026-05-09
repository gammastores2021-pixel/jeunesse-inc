"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  t: Dictionary["contact"];
  submitLabel: string;
  locale: Locale;
  endpoint?: string;
};

export default function ContactForm({ t, submitLabel, locale, endpoint = "/api/contact" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);

    if (form.get("website")) {
      // honeypot field — silently succeed
      setStatus("ok");
      e.currentTarget.reset();
      return;
    }

    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, locale })
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "unknown_error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={status === "loading"}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="label">
            {t.fields.name} <span className="text-danger" aria-hidden>*</span>
          </label>
          <input id="name" name="name" required minLength={2} className="input" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="label">
            {t.fields.email} <span className="text-danger" aria-hidden>*</span>
          </label>
          <input id="email" name="email" type="email" required className="input" autoComplete="email" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="label">{t.fields.company}</label>
          <input id="company" name="company" className="input" autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="phone" className="label">{t.fields.phone}</label>
          <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label">
          {t.fields.message} <span className="text-danger" aria-hidden>*</span>
        </label>
        <textarea id="message" name="message" required minLength={10} rows={6} className="textarea" />
      </div>
      <label className="flex items-start gap-3 text-sm text-mute">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{t.fields.consent}</span>
      </label>

      <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "ok" && <span className="text-success">{t.success}</span>}
        {status === "err" && (
          <span className="text-danger">
            {t.error} {error ? <span className="text-mute">({error})</span> : null}
          </span>
        )}
      </div>

      <button type="submit" disabled={status === "loading"} className="btn btn-primary">
        {status === "loading" ? "…" : submitLabel}
      </button>
    </form>
  );
}
