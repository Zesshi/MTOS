import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type BlogOgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogOgImage({ params }: BlogOgImageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top left, rgba(110,231,200,0.26), transparent 30%), linear-gradient(135deg, #0b0f12, #121820 55%, #0f141a)",
          color: "#e7edf5",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#6ee7c8",
          }}
        >
          {post.metadata.category}
        </div>
        <div style={{ display: "flex", maxWidth: "900px", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>{post.metadata.title}</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#94a3b8", lineHeight: 1.35 }}>
            {post.metadata.description}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#e7edf5" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    size,
  );
}
