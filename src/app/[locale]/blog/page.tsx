import { localizedPath, translate, type Locale } from "@/lib/i18n";
import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles are being prepared.",
  robots: { index: false, follow: false },
};

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = (ru: string, en: string) => translate(locale, ru, en);
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main id="main-content" className="case-study">
      <BlurFade delay={0.04}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          {t("Заметки", "Notes")}
          <span className="ml-2 rounded-md border bg-card px-2 py-1 text-sm text-muted-foreground">
            {posts.length} {t("публикаций", "posts")}
          </span>
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {t("Здесь появятся заметки о разработке.", "Development notes will appear here.")}
        </p>
      </BlurFade>
      {posts.length ? (
        <div className="flex flex-col gap-5">
          {posts.map((post) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            return (
              <Link key={slug} href={localizedPath(locale, "/blog/" + slug)}
                className="flex flex-col gap-1 border-b border-border pb-4">
                <span className="font-medium">{post.title}</span>
                <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border px-4 py-12">
          <p className="text-center text-muted-foreground">
            {t("Публикаций пока нет.", "No articles have been published yet.")}
          </p>
        </div>
      )}
    </main>
  );
}
