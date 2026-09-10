import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { canIndex } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", ...(canIndex() ? { allow: "/", disallow: ["/blog", "/en/blog"] } : { disallow: "/" }) }, ...(canIndex() ? { sitemap: DATA.url + "/sitemap.xml" } : {}) };
}
