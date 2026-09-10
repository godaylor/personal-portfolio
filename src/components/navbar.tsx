import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitch } from "@/components/language-switch";
import { getData } from "@/data/resume";
import { localizedPath, translate, type Locale } from "@/lib/i18n";
import Link from "next/link";

export default function Navbar({ locale }: { locale: Locale }) {
  const data = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href={localizedPath(locale)} aria-label={data.name + t(", главная", ", home")}>
          <span aria-hidden="true">{data.initials}</span>
          <span><strong>{data.name}</strong><small>{data.role}</small></span>
        </Link>
        <nav className="site-nav" aria-label={t("Основная навигация", "Primary navigation")}>
          {data.navbar.map(item => <Link href={localizedPath(locale, "/" + item.href)} key={item.href}>{item.label}</Link>)}
        </nav>
        <nav className="site-nav site-nav--mobile" aria-label={t("Мобильная навигация", "Mobile navigation")}>
          {data.navbar.filter(item => item.href !== "#about").map(item => <Link href={localizedPath(locale, "/" + item.href)} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="site-controls">
          <LanguageSwitch locale={locale} />
          <ModeToggle label={t("Сменить тему", "Toggle color theme")} />
        </div>
      </div>
    </header>
  );
}
