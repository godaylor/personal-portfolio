import { ProjectGallery } from "@/components/project-gallery";
import { getPresentation } from "@/data/presentations";
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
  const presentation = getPresentation(slug, locale);
  return (
    <main id="main-content" className="case-study">
      <Link className="case-study__back" href={localizedPath(locale, "/#selected-work")}><ArrowLeft aria-hidden="true" />{t("Ко всем проектам", "Back to selected work")}</Link>
      <section className="case-study__hero" aria-labelledby="project-title">
        <div>
          <p className="case-study__status">{project.status}</p>
          <h1 id="project-title" translate="no">{project.title}</h1>
          <p className="case-study__summary">{project.summary}</p>
          <p className="case-study__summary">{presentation.audience}</p>
          <p className="case-study__availability">{project.access}</p>
          {slug === "replaylab" ? <p className="case-study__availability"><a href="https://replaylab-godaylor.onrender.com" target="_blank" rel="noreferrer">{t("Адрес сервера — сейчас недоступен", "Server URL — currently unavailable")}</a></p> : null}
          <div className="case-study__actions">
            {project.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label === "Live" ? t("Открыть приложение", "Open application") : t("Исходный код", "Source code")}<ArrowUpRight aria-hidden="true" /></a>)}
            <Link href={localizedPath(locale, "/#selected-work")}>{t("Все проекты", "All projects")}<ArrowLeft aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <ProjectGallery locale={locale} images={presentation.images} note={presentation.note} />
      <section className="case-study__body" aria-labelledby="case-notes-title">
        <div className="case-study__details">
          <div className="case-study__section"><h2 id="case-notes-title">{t("Продукт", "Product")}</h2><p className="case-study__summary">{project.description}</p></div>
          <div className="case-study__section"><h2>{t("Возможности", "What it does")}</h2><ul>{presentation.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
          <div className="case-study__section"><h2>{t("Что сделать в приложении", "Things to try")}</h2><ol>{project.steps.map(step => <li key={step}>{step}</li>)}</ol></div>
          <div className="case-study__section"><h2>{t("Мой вклад", "My contribution")}</h2><p className="case-study__summary">{project.contribution}</p></div>
          <section aria-label={t("Технические подробности", "Technical details")} className="case-study__technical">
          <div className="case-study__section"><h2>{t("Как это сделано", "How it works")}</h2><ul>{project.results.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="case-study__section"><h2>{t("Стек", "Stack")}</h2><ul className="case-study__stack" translate="no">{project.stack.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul></div>
          <a className="case-study__back" href={project.documentationUrl} target="_blank" rel="noreferrer">{t("Техническая документация", "Technical documentation")}<ArrowUpRight aria-hidden="true" /></a>
          </section>
          <p className="case-study__availability">{project.boundaries}</p>
          <Link className="case-study__back" href={localizedPath(locale, "/#contact")}>{t("Обсудить проект", "Discuss this project")}<ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
