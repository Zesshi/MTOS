import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top left, rgba(110,231,200,0.26), transparent 32%), linear-gradient(135deg, #0b0f12, #121820 55%, #0f141a)",
          color: "#e7edf5",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <div style={{ letterSpacing: "0.3em", textTransform: "uppercase", color: "#6ee7c8" }}>
            Cybersecurity blog
          </div>
          <div style={{ color: "#94a3b8" }}>Blog first</div>
        </div>
        <div style={{ display: "flex", maxWidth: "960px", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.02 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#94a3b8", lineHeight: 1.35 }}>
            Notes, guides, writeups, technical experiments, and research-oriented posts.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#e7edf5" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    size,
  );
}
