"use client";

import { Check, CircleAlert, Copy, Github, Mail, Send } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";

type CopyState = "idle" | "copied" | "error";

export function ContactActions({ email, telegram, github, locale }: {
  email: string;
  telegram: string;
  github: string;
  locale: Locale;
}) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const t = (ru: string, en: string) => translate(locale, ru, en);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <>
      <div className="contact-panel__actions">
        <a className="contact-action" href={`mailto:${email}`}>
          <Mail aria-hidden="true" />{t("Написать письмо", "Send an email")}<span>{email}</span><ArrowIcon />
        </a>
        <button className="contact-action" type="button" onClick={copyEmail}>
          {copyState === "copied" ? <Check aria-hidden="true" /> : copyState === "error" ? <CircleAlert aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copyState === "copied" ? t("Почта скопирована", "Email copied") : copyState === "error" ? t("Повторить копирование", "Retry copying") : t("Скопировать почту", "Copy email")}
        </button>
        <a className="contact-action" href={telegram} target="_blank" rel="noreferrer"><Send aria-hidden="true" />Telegram<ArrowIcon /></a>
        <a className="contact-action" href={github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />GitHub<ArrowIcon /></a>
      </div>
      <p className="contact-panel__feedback" aria-live="polite">
        {copyState === "copied" ? t("Адрес сохранён в буфере обмена.", "The address is in your clipboard.") : copyState === "error" ? t("Буфер обмена недоступен. Выделите и скопируйте адрес ниже.", "Clipboard unavailable. Select and copy the address below.") : ""}
      </p>
      {copyState === "error" ? <input className="contact-email-fallback" aria-label={t("Адрес почты для копирования", "Email address to copy")} readOnly value={email} onFocus={event => event.currentTarget.select()} /> : null}
    </>
  );
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4m0 0H5m7 0v7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
