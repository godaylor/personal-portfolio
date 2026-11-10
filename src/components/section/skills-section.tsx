import { localizedPath, translate, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { getData } from "@/data/resume";
import Link from "next/link";

export default function SkillsSection({ locale }: { locale: Locale }) {
  const DATA = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <div className="skills-section">
      <SectionHeading
        eyebrow={t("В ПРОЕКТАХ", "IN THESE PROJECTS")}
        title={t("Технологии", "Technologies")}
        titleId="stack-title"
        description={t(
          "Инструменты из представленных проектов. Полный стек — в каждом кейсе.",
          "Tools used in the projects here. Each case study includes its full stack.",
        )}
      />

      <div className="skill-groups">
        {DATA.skillGroups.map((group) => (
          <article className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <p
              className="skill-group__projects"
              aria-label={t("Примеры проектов", "Example projects")}
            >
              {group.projects.map((slug) => {
                const project = DATA.projects.find(
                  (project) => project.slug === slug,
                )!;
                return (
                  <Link
                    key={slug}
                    href={localizedPath(locale, `/work/${slug}`)}
                  >
                    {project.title} ↗
                  </Link>
                );
              })}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
