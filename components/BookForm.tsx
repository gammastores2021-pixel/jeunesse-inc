"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { t: Dictionary; locale: Locale };

export default function BookForm({ t, locale }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    if (form.get("website")) {
      setStatus("ok");
      e.currentTarget.reset();
      return;
    }
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, locale })
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="b-name">{t.contact.fields.name}</label>
          <input id="b-name" name="name" required className="input" autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="b-email">{t.contact.fields.email}</label>
          <input id="b-email" name="email" type="email" required className="input" autoComplete="email" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="b-company">{t.contact.fields.company}</label>
          <input id="b-company" name="company" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="b-tz">{locale === "ar" ? "المنطقة الزمنية" : "Timezone"}</label>
          <input
            id="b-tz"
            name="timezone"
            placeholder={locale === "ar" ? "مثال: GMT+3" : "e.g. GMT+3"}
            className="input"
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="b-msg">{t.contact.fields.message}</label>
        <textarea id="b-msg" name="message" rows={5} className="textarea" />
      </div>
      <label className="flex items-start gap-3 text-sm text-mute">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{t.contact.fields.consent}</span>
      </label>
      <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "ok" && <span className="text-success">{t.book.success}</span>}
        {status === "err" && <span className="text-danger">{t.contact.error}</span>}
      </div>
      <button type="submit" disabled={status === "loading"} className="btn btn-primary">
        {status === "loading" ? "…" : t.cta.submit}
      </button>
    </form>
  );
}
