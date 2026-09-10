import { ProjectMedia } from "@/components/project-media";
import { getData } from "@/data/resume";
import { localizedPath, translate, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: Locale; slug: string }> };
export function generateStaticParams() { return getData("ru").projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getData(locale).projects.find(project => project.slug === slug);
  if (!project) return {};
  return pageMetadata(locale, "/work/" + slug, project.title + " — " + getData(locale).name, project.summary);
}
export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getData(locale).projects.find(project => project.slug === slug);
  if (!project) notFound();
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <main id="main-content" className="case-study">
      <Link className="case-study__back" href={localizedPath(locale, "/#selected-work")}><ArrowLeft aria-hidden="true" />{t("Ко всем проектам", "Back to selected work")}</Link>
      <section className="case-study__hero" aria-labelledby="project-title">
        <div>
          <p className="case-study__status">{project.status}</p>
          <h1 id="project-title" translate="no">{project.title}</h1>
          <p className="case-study__summary">{project.summary}</p>
          <div className="case-study__actions">
            {project.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label === "Live demo" ? t("Открыть демо", "Live demo") : link.label}<ArrowUpRight aria-hidden="true" /></a>)}
            {project.links.length === 0 ? <p className="case-study__availability">{t("Публичная ссылка появится после release-проверки.", "A public link will follow the release verification.")}</p> : null}
          </div>
        </div>
        <ProjectMedia locale={locale} project={project} priority />
      </section>
      <section className="case-study__body" aria-labelledby="case-notes-title">
        <p className="case-study__body-label">{t("О проекте", "Project notes")}</p>
        <div className="case-study__details">
          <div className="case-study__section"><h2 id="case-notes-title">{t("Сценарий и границы", "Context and boundaries")}</h2><p className="case-study__summary">{project.description}</p></div>
          <div className="case-study__section"><h2>{t("Текущий объём", "Current scope")}</h2><ul>{project.currentScope.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="case-study__section"><h2>{t("Технологии", "Stack")}</h2><ul translate="no">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="case-study__section"><h2>{t("Инженерные задачи", "Engineering challenges")}</h2><ul>{project.engineeringChallenges.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="case-study__section"><h2>{t("Архитектура и происхождение", "Architecture and origins")}</h2><ul>{project.architectureHighlights.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="case-study__next"><p>{t("Следующий шаг", "Next release step")}</p><strong>{project.nextStep}</strong></div>
          <Link className="case-study__back" href={localizedPath(locale, "/#contact")}>{t("Обсудить проект", "Discuss this project")}<ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
