import { localizedPath, translate, type Locale } from "@/lib/i18n";
import BlurFade from "@/components/magicui/blur-fade";
import { ProductSystemMap } from "@/components/product-system-map";
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
            <p className="hero__identity">
              <span>{DATA.name}</span>
              <span aria-hidden="true">/</span>
              <span>{DATA.role}</span>
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 id="hero-title">
              {t("Создаю веб-продукты", "I build web products")}
              <span>{t(" от интерфейса до production.", " from interface to production.")}</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.16}>
            <p className="hero__positioning">{DATA.positioning}</p>
          </BlurFade>

          <BlurFade delay={0.22}>
            <ul className="hero__proof" aria-label={t("Коротко о портфолио", "Portfolio at a glance")}>
              {DATA.proofPoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className="hero__stack" aria-label={t("Основной стек", "Primary stack")}>
              <span translate="no">{DATA.stackLine}</span>
              <span>{t("От сценария до интерфейса", "From journey to interface")}</span>
            </div>
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

        <BlurFade className="hero__system" delay={0.18}>
          <ProductSystemMap locale={locale} />
        </BlurFade>
      </section>

      <section id="about" className="portfolio-section" aria-labelledby="about-title">
        <BlurFade inView>
          <SectionHeading
            eyebrow={t("Обо мне", "About")}
            title={t("Интерфейсы в контексте продукта.", "Interfaces in a product context.")}
            titleId="about-title"
            description={t("Меня зовут Максим Жупаров. Я Frontend / Full-stack разработчик: работаю с интерфейсами, API, данными и проверкой production-сценариев.", "I’m Maksim Zhuparov, a Frontend / Full-stack developer working across interfaces, APIs, data and production verification.")}
          />
          <div className="about-grid">
            {DATA.about.map((item) => (
              <article className="about-card" key={item.title}>
                <span aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
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
