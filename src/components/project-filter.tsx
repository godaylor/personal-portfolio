"use client";

import { useState, type ReactNode } from "react";
import { translate, type Locale } from "@/lib/i18n";

export function ProjectFilter({ locale, items }: { locale: Locale; items: { slug: string; category: string; card: ReactNode }[] }) {
  const [filter, setFilter] = useState("all");
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const filters = [{ id: "all", label: t("Все проекты", "All work") }, { id: "tools", label: t("Инструменты", "Tools") }, { id: "commerce", label: t("Магазины", "Commerce") }, { id: "data", label: t("Аналитика", "Analytics") }];
  const visible = items.filter(item => filter === "all" || item.category === filter);
  return <>
    <div className="work-toolbar"><div className="work-filters" role="group" aria-label={t("Фильтр проектов", "Filter projects")}>
      {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}{item.id === "all" ? <span>{items.length}</span> : null}</button>)}
    </div><span className="micro-label work-count" aria-live="polite">{t("Показано", "Showing")} {visible.length} / {items.length}</span></div>
    <div className="featured-projects" aria-label={t("Все проекты", "All projects")} key={filter}>{visible.map(item => item.card)}</div>
  </>;
}
