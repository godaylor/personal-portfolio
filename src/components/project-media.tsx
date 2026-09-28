"use client";
import { translate, type Locale } from "@/lib/i18n";


import type { PortfolioProject } from "@/data/resume";
import Image from "next/image";
import { useState } from "react";

type ProjectMediaProps = {
  locale: Locale;
  project: PortfolioProject;
  priority?: boolean;
};

function ProjectPlaceholder({ project, locale }: ProjectMediaProps) {
  return (
    <div
      className="project-placeholder"
      data-visual={project.visual}
      role="img"
      aria-label={`${project.title}: ${translate(locale, "скриншот не загрузился", "screenshot unavailable")}`}
    >
      <div className="project-placeholder__toolbar" aria-hidden="true">
        <span />
        <span />
        <span />
        <b>{translate(locale, "Скриншот не загрузился", "Screenshot unavailable")}</b>
      </div>
      <div className="project-placeholder__surface" aria-hidden="true">
        <div className="project-placeholder__content">
          <span className="project-placeholder__label">{translate(locale, "ПРОЕКТ", "PROJECT")}</span>
          <strong>{project.title}</strong>
          <p>{translate(locale, "Описание и ссылки остаются доступны ниже.", "The description and links are still available below.")}</p>
        </div>
      </div>
    </div>
  );
}

export function ProjectMedia({ project, locale, priority = false }: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);
  const { src, alt } = project.cover;

  if (!src || failed) {
    return <ProjectPlaceholder project={project} locale={locale} />;
  }

  return (
    <div className="project-media">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-top"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
