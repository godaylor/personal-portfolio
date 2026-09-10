import { getData } from "@/data/resume";
import { translate, type Locale } from "@/lib/i18n";
import { ContactActions } from "@/components/contact-actions";

export default function ContactSection({ locale }: { locale: Locale }) {
  const data = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <div className="contact-panel">
      <div className="contact-panel__signal" aria-hidden="true"><span /><span /><span /></div>
      <div className="contact-panel__copy">
        <p className="section-eyebrow">{t("Контакты", "Contact")}</p>
        <h2 id="contact-title">{t("Давайте обсудим вашу задачу.", "Let’s talk about your project.")}</h2>
        <p>{t("Напишите мне о проекте, вакансии или вопросе по работе из портфолио.", "Get in touch about a project, an opportunity or a question about my work.")}</p>
      </div>
      <ContactActions email={data.contact.email} telegram={data.contact.telegram} github={data.githubUrl} locale={locale} />
    </div>
  );
}
