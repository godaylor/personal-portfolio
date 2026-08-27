import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maxeem Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
          Maxeem Blog
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 20 }}>
          Articles are being prepared.
        </div>
      </div>
    ),
    size
  );
}
