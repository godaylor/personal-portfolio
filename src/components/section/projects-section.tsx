import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getData } from "@/data/resume";
import { translate, type Locale } from "@/lib/i18n";

export default function ProjectsSection({ locale }: { locale: Locale }) {
  const DATA = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const projects = DATA.projects;

  return (
    <div className="projects-section">
      <SectionHeading
        eyebrow={t("Проекты", "Selected work")}
        title={t("Приложения, которые можно открыть и проверить.", "Applications you can open and inspect.")}
        titleId="selected-work-title"
        description={t("7 проверенных кейсов: 6 production-приложений и 1 локальный release. Внутри — мой вклад, стек, инженерные результаты и честные границы.", "7 verified case studies: 6 production applications and 1 local release. Each one shows my contribution, stack, engineering outcomes and honest boundaries.")}
      />

      <div className="featured-projects" aria-label={t("Все проекты", "All projects")}>
        {projects.map((project, index) => (
          <ProjectCard
            locale={locale}
            project={project}
            priority={index < 2}
            key={project.slug}
          />
        ))}
      </div>
    </div>
  );
}
