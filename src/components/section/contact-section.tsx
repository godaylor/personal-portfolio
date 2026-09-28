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
        <h2 id="contact-title">{t("Открыт к Frontend / Full-stack роли.", "Open to Frontend / Full-stack roles.")}</h2>
        <p>{t("Напишите о вакансии или задайте вопрос о проектах.", "Get in touch about a role or ask a question about the projects.")}</p>
      </div>
      <ContactActions email={data.contact.email} telegram={data.contact.telegram} github={data.githubUrl} locale={locale} />
    </div>
  );
}
