import { getData } from "@/data/resume";
import { translate, type Locale } from "@/lib/i18n";
import { ArrowUpRight, Github, Mail, Send } from "lucide-react";

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
      <div className="contact-panel__actions">
        <a className="contact-action" href={"mailto:" + data.contact.email}><Mail aria-hidden="true" />{data.contact.email}<ArrowUpRight aria-hidden="true" /></a>
        <a className="contact-action" href={data.contact.telegram} target="_blank" rel="noreferrer"><Send aria-hidden="true" />Telegram<ArrowUpRight aria-hidden="true" /></a>
        <a className="contact-action" href={data.githubUrl} target="_blank" rel="noreferrer"><Github aria-hidden="true" />GitHub<ArrowUpRight aria-hidden="true" /></a>
      </div>
    </div>
  );
}
