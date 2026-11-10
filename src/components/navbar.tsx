import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitch } from "@/components/language-switch";
import { getData } from "@/data/resume";
import { localizedPath, translate, type Locale } from "@/lib/i18n";
import Link from "next/link";
import { MotionToggle } from "@/components/experience-motion";

export default function Navbar({ locale }: { locale: Locale }) {
  const data = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          className="site-brand"
          href={localizedPath(locale)}
          aria-label={data.name + t(", главная", ", home")}
        >
          <span className="site-brand__word">
            <strong>
              maxeem<span aria-hidden="true">.</span>
            </strong>
            <small>{t("Портфолио разработчика", "Developer portfolio")}</small>
          </span>
        </Link>
        <nav
          className="site-nav"
          aria-label={t("Основная навигация", "Primary navigation")}
        >
          {data.navbar.map((item) => (
            <Link href={localizedPath(locale, "/" + item.href)} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav
          className="site-nav site-nav--mobile"
          aria-label={t("Мобильная навигация", "Mobile navigation")}
        >
          {data.navbar.map((item) => (
            <Link href={localizedPath(locale, "/" + item.href)} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-controls">
          <MotionToggle locale={locale} />
          <LanguageSwitch locale={locale} />
          <ModeToggle label={t("Сменить тему", "Toggle color theme")} />
        </div>
      </div>
    </header>
  );
}
