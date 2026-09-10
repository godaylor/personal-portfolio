import { getProjects } from "./projects";
import { translate, type Locale } from "@/lib/i18n";

export type ProjectStatus = string;
export type ProjectLink = { label: "Live demo" | "GitHub" | "Case study"; href: string };
export type PortfolioProject = {
  slug: string; title: string; featured: boolean; status: ProjectStatus;
  summary: string; description: string; stack: string[];
  engineeringChallenges: string[]; architectureHighlights: string[];
  currentScope: string[]; nextStep: string;
  links: ProjectLink[]; cover: { src: string; alt: string };
  visual: "cobalt" | "violet" | "cyan" | "coral" | "lime";
};

// Public contacts confirmed by the owner on 2026-09-08.
export function getData(locale: Locale) {
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return {
    name: t("Максим Жупаров", "Maksim Zhuparov"), initials: t("МЖ", "MZ"),
    url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:32800").replace(/\/$/, ""),
    role: t("Фронтенд-разработчик", "Frontend Developer"),
    stackLine: "React / TypeScript / Next.js",
    description: t("Портфолио Максима Жупарова: веб-интерфейсы, пользовательские сценарии и проекты на React и TypeScript.", "Maksim Zhuparov’s portfolio: web interfaces, user journeys and projects built with React and TypeScript."),
    positioning: t("Проектирую пользовательский путь, связываю интерфейс с данными и проверяю сценарий до результата — на примере восьми продуктовых проектов.", "I design the user journey, connect the interface to data and verify the path to an outcome across eight product projects."),
    proofPoints: [
      t("8 продуктовых кейсов", "8 product case studies"),
      t("Русский и English", "English and русский"),
      t("Адаптивность и доступность", "Responsive and accessible"),
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
      { title: t("Пользовательские сценарии", "User journeys"), description: t("В проектах рассматриваю весь путь пользователя: выбор, ввод данных, подтверждение и восстановление после ошибки.", "My projects explore the whole user journey: selection, data entry, confirmation and recovery from errors.") },
      { title: t("Интерфейс и данные", "Interface and data"), description: t("Работаю с URL-состоянием, клиентским хранением и серверными данными. Конкретные решения описаны на страницах проектов.", "I work with URL state, client persistence and server data. Project pages describe the implementation choices.") },
      { title: t("Разные форматы продуктов", "Different product formats"), description: t("В портфолио есть commerce-сценарии, аналитические панели, редакторы и инструменты операционного реагирования.", "The portfolio includes commerce journeys, analytics dashboards, editors and operational response tools.") },
      { title: t("Открытые источники", "Open-source foundations"), description: t("Часть проектов развивает открытые и учебные основы. Их происхождение указано в описаниях, а лицензии сохранены.", "Some projects build on open-source and educational foundations. Their origins are credited and licenses are preserved.") },
    ],
    skillGroups: [
      { title: "Frontend", skills: ["React", "TypeScript", "JavaScript", "Next.js"], note: "" },
      { title: t("Состояние и данные", "State and data"), skills: ["Redux Toolkit", "TanStack Query", "Zustand", "React Context"], note: "" },
      { title: t("Интерфейсы", "Interfaces"), skills: ["React Router", "Tailwind CSS", "Ant Design", "Chart.js"], note: "" },
      { title: t("Инструменты проектов", "Project tooling"), skills: ["Vite", "Git", "ESLint", "Playwright"], note: "" },
    ],
    work: [] as Array<{ company: string; title: string; period: string; description: string }>,
    education: [] as Array<{ school: string; degree: string; period: string }>,
    projects: getProjects(locale),
  };
}

export const DATA = getData("ru");
export const OWNER_CONTENT_TODO = {
  optionalProfile: ["location", "avatarUrl", "resumeUrl", "work and education"],
  projects: ["public repository URLs", "live demo URLs", "approved screenshots or video", "individual contribution details"],
  publishing: ["authenticated GitHub and Vercel sessions", "production domain"],
} as const;
