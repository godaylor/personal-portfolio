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
      <div className="project-card__intro">
        <div className="project-card__meta">
          <span>{project.status}</span>
          <ArrowUpRight aria-hidden="true" />
        </div>

        <div className="project-card__copy">
          <h3 translate="no">
            <Link href={localizedPath(locale, `/work/${project.slug}`)}>{project.title}</Link>
          </h3>
          <p>{project.summary}</p>
        </div>
      </div>
      <Link
        href={localizedPath(locale, `/work/${project.slug}`)}
        className="project-card__media-link"
        aria-label={`${translate(locale, "О проекте", "Read about")} ${project.title}`}
      >
        <ProjectMedia locale={locale} project={project} priority={priority} />
      </Link>
      <div className="project-card__body">
        <div className="project-card__copy">
          <p className="project-card__try"><strong>{translate(locale, "Что попробовать", "What to try")}: </strong>{project.tryIt}</p>
          <p className="project-card__access">{project.access}</p>
        </div>

        <div className="project-card__footer">
          {project.links.length > 0 ? (
            <div className="project-card__links">
              {project.links.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title}: ${link.label === "Live" ? translate(locale, "Попробовать", "Try it") : translate(locale, "Код", "Code")}`}
                >
                  <LinkIcon label={link.label} />
                  <span>{link.label === "Live" ? translate(locale, "Попробовать", "Try it") : translate(locale, "Код", "Code")}</span>
                </a>
              ))}
            </div>
          ) : null}
          <Link className="project-card__details" href={localizedPath(locale, `/work/${project.slug}`)}>{translate(locale, "О проекте", "Project details")}<ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
