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
        <h2 id="contact-title">{t("Обсудим работу или проект.", "Let’s discuss a role or a project.")}</h2>
        <p>{t("Напишите о вакансии, проектной задаче или задайте вопрос о приложениях.", "Get in touch about a role, a project brief or a question about the applications.")}</p>
      </div>
      <ContactActions email={data.contact.email} telegram={data.contact.telegram} github={data.githubUrl} locale={locale} />
    </div>
  );
}
