"use client";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const path = pathname.replace(/^\/(en|ru)(?=\/|$)/, "") || "/";
  const target = locale === "ru" ? "en" : "ru";
  return (
    <a className="language-switch" href={localizedPath(target, path)} hrefLang={target} lang={target}
      aria-label={target === "en" ? "Switch to English" : "Переключить на русский"}
      onClick={event => {
        // Preserve an in-page destination, including when switching from a case study.
        event.currentTarget.href = localizedPath(target, path) + window.location.search + window.location.hash;
      }}>
      <span aria-hidden="true">{locale.toUpperCase()} / </span>{target.toUpperCase()}
    </a>
  );
}
