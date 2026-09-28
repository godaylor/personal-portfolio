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
        title={t("Выберите проект и попробуйте его.", "Choose a project to try.")}
        titleId="selected-work-title"
        description={t("У каждого приложения — пример действия, снимок экрана и код. Условия доступа указаны рядом со ссылкой.", "Each application has an action to try, a screenshot and source code. Access conditions are listed next to its link.")}
      />

      <div className="featured-projects" aria-label={t("Все проекты", "All projects")}>
        {projects.filter(project => project.slug !== "variantlab").map((project, index) => (
          <ProjectCard
            locale={locale}
            project={project}
            priority={index < 2}
            key={project.slug}
          />
        ))}
      </div>
      <section className="project-notes" aria-labelledby="in-development-title">
        <h3 id="in-development-title">{t("В разработке", "In development")}</h3>
        {projects.filter(project => project.slug === "variantlab").map(project => <ProjectCard key={project.slug} project={project} locale={locale} />)}
        <p><strong>LifeOS Social</strong> — {t("отдельный проект личного планирования в разработке. Готовый кейс пока не представлен.", "a separate personal planning project in development. A completed case study is not available yet.")}</p>
        <p><strong>Personal Portfolio</strong> — {t("сайт, который вы сейчас смотрите.", "the site you are viewing now.")} <a href="https://github.com/godaylor/personal-portfolio" target="_blank" rel="noreferrer">{t("Код сайта", "Website source")}</a></p>
      </section>
    </div>
  );
}
