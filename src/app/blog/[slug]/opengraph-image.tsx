import { allPosts } from "content-collections";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find(
    (item) => item._meta.path.replace(/\.mdx$/, "") === slug
  );

  return new ImageResponse(
    (
      <div style={{
        alignItems: "flex-start",
        background: "#fafafa",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-end",
        padding: "80px",
        width: "100%",
      }}>
        <div style={{ display: "flex", fontSize: 60, fontWeight: 700 }}>
          {post?.title ?? "Post not found"}
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 20 }}>
          {post?.summary ?? "Article details are not available."}
        </div>
      </div>
    ),
    size
  );
}
