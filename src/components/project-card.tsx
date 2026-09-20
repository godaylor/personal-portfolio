import { localizedPath, translate, type Locale } from "@/lib/i18n";
import { ProjectMedia } from "@/components/project-media";
import type { PortfolioProject } from "@/data/resume";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  locale: Locale;
  project: PortfolioProject;
  priority?: boolean;
};

function LinkIcon({ label }: { label: PortfolioProject["links"][number]["label"] }) {
  if (label === "GitHub") {
    return <Github aria-hidden="true" />;
  }

  return <ExternalLink aria-hidden="true" />;
}

export function ProjectCard({ project, locale, priority = false }: ProjectCardProps) {
  return (
    <article className="project-card group">
      <Link
        href={localizedPath(locale, `/work/${project.slug}`)}
        className="project-card__media-link"
        aria-label={`${translate(locale, "О проекте", "Read about")} ${project.title}`}
      >
        <ProjectMedia locale={locale} project={project} priority={priority} />
      </Link>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.status}</span>
          <ArrowUpRight aria-hidden="true" />
        </div>

        <div className="project-card__copy">
          <h3 translate="no">
            <Link href={localizedPath(locale, `/work/${project.slug}`)}>{project.title}</Link>
          </h3>
          <p>{project.summary}</p>
          <ul className="project-card__results">
            {project.results.slice(0, 2).map(result => <li key={result}>{result}</li>)}
          </ul>
        </div>

        <div className="project-card__footer">
          {project.stack.length > 0 ? (
            <ul translate="no" aria-label={`${project.title}: ${translate(locale, "технологии", "technologies")}`}>
              {project.stack.slice(0, 4).map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : (
            <span className="project-card__pending">{translate(locale, "Стек уточняется", "Stack pending")}</span>
          )}

          {project.links.length > 0 ? (
            <div className="project-card__links">
              {project.links.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title}: ${link.label}`}
                >
                  <LinkIcon label={link.label} />
                  <span>{link.label === "Live" ? translate(locale, "Live", "Live") : link.label}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
