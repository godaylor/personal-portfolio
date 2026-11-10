import { getProjects } from "./projects";
import { translate, type Locale } from "@/lib/i18n";
import { getTechnologyGroups } from "./technologies";

export type ProjectStatus = string;
export type ProjectLink = { label: "Live" | "GitHub"; href: string };
export type PortfolioProject = {
  slug: string;
  title: string;
  featured: boolean;
  status: ProjectStatus;
  summary: string;
  tryIt: string;
  access: string;
  description: string;
  contribution: string;
  stack: string[];
  results: string[];
  steps: string[];
  documentationUrl: string;
  boundaries: string;
  links: ProjectLink[];
  cover: { src: string; alt: string };
  film?: string;
  localPreview?: boolean;
  visual: "cobalt" | "violet" | "cyan" | "coral" | "lime";
};

// Public contacts confirmed by the owner on 2026-09-08.
export function getData(locale: Locale) {
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return {
    name: "Maxeem",
    initials: "Mx",
    url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:32800").replace(
      /\/$/,
      "",
    ),
    role: t(
      "Frontend / Full-stack разработчик",
      "Frontend / Full-stack Developer",
    ),
    stackLine: "React / TypeScript / Node.js / PostgreSQL",
    description: t(
      "Maxeem — Frontend / Full-stack разработчик. Веб-приложения на React и TypeScript. Проекты, примеры работы и исходный код.",
      "Maxeem — Frontend / Full-stack developer. Web applications built with React and TypeScript. Projects, work examples and source code.",
    ),
    positioning: t(
      "Веб-приложения на React и TypeScript. Проекты, примеры работы и исходный код.",
      "Web applications built with React and TypeScript. Projects, work examples and source code.",
    ),
    location: "",
    avatarUrl: "",
    resumeUrl: "",
    githubUrl: "https://github.com/godaylor",
    contact: {
      email: "maxeemit@mail.ru",
      tel: "",
      telegram: "https://t.me/maximsberbank",
    },
    navbar: [
      { href: "#about", label: t("Обо мне", "About") },
      { href: "#selected-work", label: t("Проекты", "Work") },
      { href: "#stack", label: t("Стек", "Stack") },
      { href: "#contact", label: t("Контакты", "Contact") },
    ],
    about: t(
      "Я — Maxeem. Мой опыт — Frontend и Full-stack разработка на React и TypeScript. Сейчас расширяю круг интересов, изучаю AI-инструменты и технологии, пробую новые подходы к созданию продуктов. Мне нравится доводить идеи до законченного, работающего результата. Это портфолио сохраняю как часть своего опыта в разработке. Дальнейшие доработки представленных проектов пока не планирую.",
      "I’m Maxeem. My experience is in Frontend and Full-stack development with React and TypeScript. I am broadening my interests, exploring AI tools and technologies and trying new approaches to building products. I enjoy taking ideas through to a finished, working product. I keep this portfolio as a record of my development experience. Further updates to the projects shown here are not currently planned.",
    ),
    skillGroups: getTechnologyGroups(locale),
    work: [] as Array<{
      company: string;
      title: string;
      period: string;
      description: string;
    }>,
    education: [] as Array<{ school: string; degree: string; period: string }>,
    projects: getProjects(locale),
  };
}

export const DATA = getData("ru");
export const OWNER_CONTENT_TODO = {
  optionalProfile: ["location", "avatarUrl", "resumeUrl", "work and education"],
  projects: ["VariantLab cloud processing verification"],
  publishing: [],
} as const;
