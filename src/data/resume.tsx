import { getProjects } from "./projects";
import { translate, type Locale } from "@/lib/i18n";

export type ProjectStatus = string;
export type ProjectLink = { label: "Live" | "GitHub"; href: string };
export type PortfolioProject = {
  slug: string; title: string; featured: boolean; status: ProjectStatus;
  summary: string; description: string; contribution: string; stack: string[];
  results: string[]; architectureHighlights: string[]; boundaries: string;
  links: ProjectLink[]; cover: { src: string; alt: string };
  visual: "cobalt" | "violet" | "cyan" | "coral" | "lime";
};

// Public contacts confirmed by the owner on 2026-09-08.
export function getData(locale: Locale) {
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return {
    name: t("Максим Жупаров", "Maksim Zhuparov"), initials: t("МЖ", "MZ"),
    url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:32800").replace(/\/$/, ""),
    role: t("Frontend / Full-stack разработчик", "Frontend / Full-stack Developer"),
    stackLine: "React / TypeScript / Node.js / PostgreSQL",
    description: t("Портфолио Максима Жупарова — Frontend / Full-stack разработчика React и TypeScript с production-проектами.", "Maksim Zhuparov’s portfolio — a Frontend / Full-stack React and TypeScript developer with production projects."),
    positioning: t("Ищу Frontend / Full-stack роль. Проектирую понятные интерфейсы, связываю их с API и данными и довожу пользовательский путь до проверенного production.", "I’m looking for a Frontend / Full-stack role. I design clear interfaces, connect them to APIs and data, and carry the user journey through verified production."),
    proofPoints: [
      t("6 публичных приложений", "6 public applications"),
      t("7 проверенных кейсов", "7 verified case studies"),
      t("RU / EN · desktop / mobile", "RU / EN · desktop / mobile"),
    ],
    location: "", avatarUrl: "", resumeUrl: "",
    githubUrl: "https://github.com/godaylor",
    contact: { email: "maxeemzhuparov@mail.ru", tel: "", telegram: "https://t.me/maximsberbank" },
    navbar: [
      { href: "#about", label: t("Обо мне", "About") },
      { href: "#selected-work", label: t("Проекты", "Work") },
      { href: "#stack", label: t("Стек", "Stack") },
      { href: "#contact", label: t("Контакты", "Contact") },
    ],
    about: [
      { title: t("Frontend как продукт", "Product-minded frontend"), description: t("Проектирую путь пользователя, состояния, ошибки и восстановление — не только отдельные экраны.", "I design the user journey, states, failures and recovery—not isolated screens.") },
      { title: t("API и данные", "APIs and data"), description: t("Работаю с Node.js API, PostgreSQL, Supabase, auth, realtime и local-first архитектурой.", "I work with Node.js APIs, PostgreSQL, Supabase, auth, realtime and local-first architecture.") },
      { title: t("Production-подход", "Production mindset"), description: t("Проверяю критические сценарии браузером, документирую границы и публикую только подтверждённые возможности.", "I verify critical journeys in the browser, document boundaries and publish only confirmed capabilities.") },
      { title: t("Честное происхождение", "Clear provenance"), description: t("Отделяю собственный вклад от open-source основы, сохраняю лицензии и не выдаю upstream за свою работу.", "I separate my contribution from open-source foundations, retain licenses and never present upstream work as my own.") },
    ],
    skillGroups: [
      { title: "Frontend", skills: ["React", "TypeScript", "JavaScript", "Next.js"], note: "" },
      { title: t("Backend и данные", "Backend and data"), skills: ["Node.js", "Hono", "PostgreSQL", "Supabase"], note: "" },
      { title: t("Состояние и realtime", "State and realtime"), skills: ["Redux Toolkit", "TanStack Query", "Zustand", "WebSocket", "Yjs"], note: "" },
      { title: t("Качество и delivery", "Quality and delivery"), skills: ["Playwright", "Vitest", "GitHub Actions", "Vercel", "Docker"], note: "" },
    ],
    work: [] as Array<{ company: string; title: string; period: string; description: string }>,
    education: [] as Array<{ school: string; degree: string; period: string }>,
    projects: getProjects(locale),
  };
}

export const DATA = getData("ru");
export const OWNER_CONTENT_TODO = {
  optionalProfile: ["location", "avatarUrl", "resumeUrl", "work and education"],
  projects: ["VariantLab approval and verified publication data"],
  publishing: ["authenticated GitHub and Vercel sessions", "production domain"],
} as const;
