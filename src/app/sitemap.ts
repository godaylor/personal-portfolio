import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { locales, localizedPath } from "@/lib/i18n";
import { canIndex } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndex()) return [];
  return ["/", ...DATA.projects.map(project => "/work/" + project.slug)].flatMap(path =>
    locales.map(locale => ({ url: DATA.url + localizedPath(locale, path), alternates: {
      languages: { ru: DATA.url + localizedPath("ru", path), en: DATA.url + localizedPath("en", path) },
    } }))
  );
}
