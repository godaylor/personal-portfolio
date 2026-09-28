import { localizedPath, translate, type Locale } from "@/lib/i18n";
import BlurFade from "@/components/magicui/blur-fade";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import ContactSection from "@/components/section/contact-section";
import { SectionHeading } from "@/components/section-heading";
import { getData } from "@/data/resume";
import { ArrowDownRight, ArrowUpRight, FileText, Github } from "lucide-react";
import Link from "next/link";

const heroActionClassName =
  "hero-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const DATA = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: `${DATA.url}${localizedPath(locale)}`,
    sameAs: [DATA.githubUrl, DATA.contact.telegram],
    jobTitle: DATA.role,
    description: DATA.description,
    knowsAbout: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Frontend development", "Full-stack development"],
  }).replace(/</g, "\\u003c");

  return (
    <main id="main-content" className="portfolio-main">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <BlurFade delay={0.04}>
            <p className="hero__identity">{t("Портфолио разработчика", "Developer portfolio")}</p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 id="hero-title">
              <span translate="no">Maxeem</span> — {DATA.role}
            </h1>
          </BlurFade>

          <BlurFade delay={0.16}>
            <p className="hero__positioning">{DATA.positioning}</p>
          </BlurFade>

          <BlurFade delay={0.28}>
            <div className="hero__actions">
              <Link className={heroActionClassName} href="#selected-work">
                {t("Смотреть проекты", "Selected work")}
                <ArrowDownRight aria-hidden="true" />
              </Link>
              <Link
                className={`${heroActionClassName} hero-action--secondary`}
                href="#contact"
              >
                {t("Связаться", "Contact")}
                <ArrowUpRight aria-hidden="true" />
              </Link>
              {DATA.githubUrl ? (
                <a
                  className={`${heroActionClassName} hero-action--icon`}
                  href={DATA.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("Профиль GitHub", "Open GitHub profile")}
                >
                  <Github aria-hidden="true" />
                </a>
              ) : null}
              {DATA.resumeUrl ? (
                <a
                  className={`${heroActionClassName} hero-action--icon`}
                  href={DATA.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("Открыть резюме", "Open résumé")}
                >
                  <FileText aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </BlurFade>
        </div>

      </section>

      <section id="about" className="portfolio-section" aria-labelledby="about-title">
        <BlurFade inView>
          <SectionHeading
            title={t("Обо мне", "About me")}
            titleId="about-title"
            description={DATA.about}
          />
          <Link className="case-study__back" href={localizedPath(locale, "/#contact")}>{t("Обсудить задачу", "Discuss a project")}<ArrowUpRight aria-hidden="true" /></Link>
        </BlurFade>
      </section>

      <section
        id="selected-work"
        className="portfolio-section portfolio-section--work"
        aria-labelledby="selected-work-title"
      >
        <BlurFade inView>
          <ProjectsSection locale={locale} />
        </BlurFade>
      </section>

      <section id="stack" className="portfolio-section" aria-labelledby="stack-title">
        <BlurFade inView>
          <SkillsSection locale={locale} />
        </BlurFade>
      </section>

      <section id="contact" className="portfolio-section portfolio-section--contact" aria-labelledby="contact-title">
        <BlurFade inView>
          <ContactSection locale={locale} />
        </BlurFade>
      </section>

      <footer className="site-footer">
        <p>{DATA.name} · {t("Персональное портфолио", "Personal portfolio")}</p>
        <p translate="no">React · TypeScript · Next.js</p>
      </footer>
    </main>
  );
}
