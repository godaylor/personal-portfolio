import { isLocale, localizedPath, translate, type Locale } from "@/lib/i18n";
import BlurFade from "@/components/magicui/blur-fade";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import ContactSection from "@/components/section/contact-section";
import { ProjectReel } from "@/components/project-reel";
import { SignatureMark } from "@/components/signature-mark";
import { getData } from "@/data/resume";
import { ArrowDownRight, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    url: `${data.url}${localizedPath(locale)}`,
    sameAs: [data.githubUrl, data.contact.telegram],
    jobTitle: data.role,
    description: data.description,
    knowsAbout: [...new Set(data.skillGroups.flatMap(group => group.skills))],
  }).replace(/</g, "\\u003c");
  return (
    <main id="main-content" className="portfolio-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <section className="intro" aria-labelledby="hero-title">
        <div className="intro__top">
          <p className="micro-label">
            {t("MAXEEM · ЛИЧНЫЕ ПРОЕКТЫ", "MAXEEM · PERSONAL PROJECTS")}
          </p>
          <a href="#contact" className="availability">
            <span />
            {t("Связаться со мной", "Get in touch")}
          </a>
        </div>
        <div className="intro__heading">
          <BlurFade>
            <h1 id="hero-title">
              Frontend /<br />
              <span>{t("Full-stack разработчик", "Full-stack developer")}</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.12}>
            <div className="intro__summary">
              <p>
                {t(
                  "Разрабатываю веб-приложения на React и TypeScript: аналитику, магазины и инструменты для команд.",
                  "I build web applications with React and TypeScript: analytics, storefronts and team tools.",
                )}
              </p>
              <div className="hero__actions">
                <a className="text-link" href="#selected-work">
                  {t("Смотреть проекты", "Explore my work")}
                  <ArrowDownRight size={18} />
                </a>
                <a
                  className="intro__github"
                  href={data.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
        <ProjectReel locale={locale} />
      </section>
      <section
        id="selected-work"
        className="portfolio-section portfolio-section--work"
        aria-labelledby="selected-work-title"
      >
        <ProjectsSection locale={locale} />
      </section>
      <section
        id="about"
        className="portfolio-section about-section"
        aria-labelledby="about-title"
      >
        <div className="about-layout">
          <BlurFade inView>
            <div className="about-identity">
              <SignatureMark />
              <p>Maxeem</p>
              <span>
                {t(
                  "Frontend / Full-stack разработчик",
                  "Frontend / Full-stack developer",
                )}
              </span>
              <a
                className="text-link"
                href={data.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <ArrowUpRight size={18} />
              </a>
            </div>
          </BlurFade>
          <BlurFade inView>
            <div className="about-copy">
              <h2 id="about-title">{t("Обо мне", "About")}</h2>
              <p>{data.about}</p>
            </div>
          </BlurFade>
        </div>
        <div className="engineering-notes">
          <p className="section-eyebrow">
            {t("ТЕХНИЧЕСКИЕ РЕШЕНИЯ", "TECHNICAL DECISIONS")}
          </p>
          <div className="engineering-notes__items">
            {[
              {
                slug: "relayops",
                name: t("Маяк", "Mayak"),
                title: t(
                  "Сохранение инцидентов",
                  "Incident persistence",
                ),
                body: t(
                  "Изменение инцидента и событие outbox сохраняются в одной транзакции. Повторная команда не создаёт второй инцидент.",
                  "Incident changes and their outbox event commit in one transaction. Retried commands do not create a second incident.",
                ),
              },
              {
                slug: "signal-studio",
                name: t("Ракурс", "Rakurs"),
                title: t(
                  "Аналитические запросы",
                  "Analytics queries",
                ),
                body: t(
                  "Фильтры, сравнение периодов, разбивка и ссылка на анализ используют общий контракт запроса.",
                  "Filters, period comparisons, breakdowns and shareable analysis URLs use the same query contract.",
                ),
              },
              {
                slug: "replaylab",
                name: t("Пятый темп", "Fifth Tempo"),
                title: t(
                  "Совместное редактирование",
                  "Collaborative editing",
                ),
                body: t(
                  "Локальная отмена в совместном редакторе не затрагивает изменения других участников.",
                  "Local undo in the shared editor leaves other participants’ changes intact.",
                ),
              },
            ].map((item) => (
              <Link
                className="engineering-note"
                key={item.slug}
                href={localizedPath(locale, `/work/${item.slug}`)}
              >
                <span>
                  {item.name}
                  <ArrowUpRight size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="stack"
        className="portfolio-section"
        aria-labelledby="stack-title"
      >
        <BlurFade inView>
          <SkillsSection locale={locale} />
        </BlurFade>
      </section>
      <section
        id="contact"
        className="portfolio-section portfolio-section--contact"
        aria-labelledby="contact-title"
      >
        <ContactSection locale={locale} />
      </section>
      <footer className="site-footer">
        <Link href={localizedPath(locale)} className="footer-wordmark">
          maxeem<span>.</span>
        </Link>
        <p>
          {t(
            "Портфолио разработчика · React / TypeScript",
            "Developer portfolio · React / TypeScript",
          )}
        </p>
        <a href="#main-content" className="text-link">
          {t("Наверх", "Back to top")}
          <ArrowUpRight size={16} />
        </a>
      </footer>
    </main>
  );
}
