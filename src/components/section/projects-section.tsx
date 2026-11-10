import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getData } from "@/data/resume";
import { translate, type Locale } from "@/lib/i18n";
import { ProjectFilter } from "@/components/project-filter";
export default function ProjectsSection({ locale }: { locale: Locale }) {
  const data = getData(locale),
    t = (ru: string, en: string) => translate(locale, ru, en);
  const order = [
    "signal-studio",
    "napoli",
    "relayops",
    "solecraft",
    "opsweave",
    "folio",
    "replaylab",
  ];
  const projects = order.map((slug) =>
    data.projects.find((p) => p.slug === slug)!,
  );
  return (
    <div className="projects-section">
      <SectionHeading
        eyebrow={t(
          "ПРИЛОЖЕНИЯ / КЕЙСЫ / ИСХОДНЫЙ КОД",
          "APPLICATIONS / CASE STUDIES / SOURCE CODE",
        )}
        title={t("Проекты", "Selected work")}
        titleId="selected-work-title"
        description={t(
          "В каждом кейсе: задача, рабочие экраны, мой вклад и технические решения. Демо можно открыть отдельно.",
          "Each case includes the problem, real screens, my contribution and technical decisions. Try each demo separately.",
        )}
      />
      <ProjectFilter
        locale={locale}
        items={projects.map((project) => ({
          slug: project.slug,
          category: ["napoli", "solecraft"].includes(project.slug)
            ? "commerce"
            : ["signal-studio", "folio"].includes(project.slug)
              ? "data"
              : "tools",
          card: (
            <ProjectCard locale={locale} project={project} key={project.slug} />
          ),
        }))}
      />
      <section className="project-notes" aria-labelledby="in-development-title">
        <h3 id="in-development-title">
          {t("Также в разработке", "Also in development")}
        </h3>
        {data.projects
          .filter((p) => p.slug === "variantlab")
          .map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        <div className="project-notes__aside">
          <p>
            <strong>LifeOS Social</strong> —{" "}
            {t(
              "проект личного планирования. Готовый кейс пока не представлен.",
              "a personal planning project. A completed case is not available yet.",
            )}
          </p>
          <p>
            <strong>Maxeem — {t("портфолио", "portfolio")}</strong> —{" "}
            {t("этот сайт.", "this website.")}{" "}
            <a
              href="https://github.com/godaylor/personal-portfolio"
              target="_blank"
              rel="noreferrer"
            >
              {t("Исходный код", "Source code")} ↗
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
