import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getData } from "@/data/resume";
import { translate, type Locale } from "@/lib/i18n";

export default function ProjectsSection({ locale }: { locale: Locale }) {
  const DATA = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const projects = [...DATA.projects].sort(
    (a, b) => Number(b.slug === "napoli") - Number(a.slug === "napoli")
  );

  return (
    <div className="projects-section">
      <SectionHeading
        eyebrow={t("Проекты", "Selected work")}
        title={t("Веб-продукты и их устройство.", "Web products, inside and out.")}
        titleId="selected-work-title"
        description={t("Восемь проектов с описанием задач, стека и ограничений. Публичные демо появятся после публикации.", "Eight projects with context, technology choices and limitations. Public demos will be linked after publication.")}
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
