import type { Metadata } from "next";
import { getData } from "@/data/resume";
import { localizedPath, type Locale } from "./i18n";

export function canIndex() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin || (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production")) return false;
  const url = new URL(origin);
  return url.protocol === "https:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
}

export function pageMetadata(locale: Locale, path = "/", title?: string, description?: string): Metadata {
  const data = getData(locale);
  const pageTitle = title || data.name + " — " + data.role;
  const summary = description || data.description;
  return {
    metadataBase: new URL(data.url),
    title: { absolute: pageTitle },
    description: summary,
    authors: [{ name: data.name }], creator: data.name,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: { ru: localizedPath("ru", path), en: localizedPath("en", path), "x-default": localizedPath("ru", path) },
    },
    openGraph: { title: pageTitle, description: summary, url: localizedPath(locale, path),
      siteName: data.name, locale: locale === "ru" ? "ru_RU" : "en_US", type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: data.name }] },
    twitter: { card: "summary_large_image", title: pageTitle, description: summary, images: ["/opengraph-image"] },
    robots: { index: canIndex(), follow: canIndex() },
  };
}
