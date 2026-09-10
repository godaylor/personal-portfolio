"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { localizedPath, translate } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams();
  const locale = params.locale === "en" ? "en" : "ru";
  return <main id="main-content" className="case-study">
    <p className="section-eyebrow">404</p>
    <h1 className="text-4xl font-semibold">{translate(locale, "Страница не найдена", "Page not found")}</h1>
    <p className="case-study__summary">{translate(locale, "Возможно, адрес изменился. Все проекты доступны на главной.", "The address may have changed. Find all projects on the home page.")}</p>
    <Link className="case-study__back" href={localizedPath(locale)}>{translate(locale, "На главную", "Back home")}</Link>
  </main>;
}
