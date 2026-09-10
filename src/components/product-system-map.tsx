import { translate, type Locale } from "@/lib/i18n";


export function ProductSystemMap({ locale }: { locale: Locale }) {
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const layers = [
    { label: t("Интерфейс", "Interface"), detail: t("Понятные действия", "Clear actions") },
    { label: t("Состояние и данные", "State and data"), detail: t("Связанные сценарии", "Connected journeys") },
    { label: t("Проверка", "Verification"), detail: t("Тесты и доработка", "Test and refine") },
  ];
  return (
    <figure className="system-map" aria-labelledby="system-map-caption">
      <div className="system-map__topline">
        <span>{t("Устройство продукта", "Product system")}</span>
        <span className="system-map__status">
          <span aria-hidden="true" />
          {t("Полный путь", "End-to-end")}
        </span>
      </div>

      <div className="system-map__canvas">
        <div className="system-map__route" aria-hidden="true" />
        <div className="system-map__signal" aria-hidden="true" />
        {layers.map((layer, index) => (
          <div className="system-map__layer" key={layer.label}>
            <span className="system-map__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <strong>{layer.label}</strong>
              <span>{layer.detail}</span>
            </div>
          </div>
        ))}
        <div className="system-map__result">
          <span>{t("Веб-приложение", "Web application")}</span>
          <strong>{t("От действия к результату", "From action to outcome")}</strong>
        </div>
      </div>

      <figcaption id="system-map-caption">
        {t("Интерфейс, данные и проверка поведения — части одной задачи.", "Interface, data and behavior checks are parts of the same task.")}
      </figcaption>
    </figure>
  );
}
