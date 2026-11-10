import { getData } from "@/data/resume";
import { translate, type Locale } from "@/lib/i18n";
import { ContactActions } from "@/components/contact-actions";
export default function ContactSection({ locale }: { locale: Locale }) {
  const data = getData(locale);
  const t = (ru: string, en: string) => translate(locale, ru, en);
  return (
    <div className="contact-panel">
      <div className="contact-panel__copy">
        <h2 id="contact-title">{t("Связаться со мной", "Get in touch")}</h2>
        <p>
          {t(
            "Напишите мне по почте или в Telegram.",
            "Send me an email or a message on Telegram.",
          )}
        </p>
      </div>
      <ContactActions
        email={data.contact.email}
        telegram={data.contact.telegram}
        github={data.githubUrl}
        locale={locale}
      />
    </div>
  );
}
