import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles are being prepared.",
  robots: { index: false, follow: false },
};

export default function BlogPage() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <section id="blog">
      <BlurFade delay={0.04}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Blog
          <span className="ml-2 rounded-md border bg-card px-2 py-1 text-sm text-muted-foreground">
            {posts.length} posts
          </span>
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Articles are being prepared.
        </p>
      </BlurFade>
      {posts.length ? (
        <div className="flex flex-col gap-5">
          {posts.map((post) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            return (
              <Link key={slug} href={"/blog/" + slug}
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
            No articles have been published yet.
          </p>
        </div>
      )}
    </section>
  );
}
