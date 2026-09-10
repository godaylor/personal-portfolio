export type Locale = "ru" | "en";
export const locales: Locale[] = ["ru", "en"];
export function isLocale(value: string): value is Locale {
  return value === "ru" || value === "en";
}
export function localizedPath(locale: Locale, path = "/") {
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}
export function translate(locale: Locale, ru: string, en: string) {
  return locale === "ru" ? ru : en;
}
