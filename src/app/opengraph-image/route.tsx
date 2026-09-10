import { getData } from "@/data/resume";
import { ImageResponse } from "next/og";

const DATA = getData("en");

export const runtime = "nodejs";
const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
          background: "#080c12",
          color: "#f2f5f8",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.2,
            backgroundImage:
              "linear-gradient(#273142 1px, transparent 1px), linear-gradient(90deg, #273142 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                background: "#f2f5f8",
                color: "#080c12",
                fontSize: 17,
              }}
            >
              {DATA.initials}
            </div>
            {DATA.name}
          </div>

          <div
            style={{
              display: "flex",
              border: "1px solid #2c3748",
              borderRadius: 999,
              color: "#9faabd",
              padding: "12px 18px",
              fontSize: 15,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            React · TypeScript · Next.js
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "72px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                color: "#8f9bad",
                fontSize: 17,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {DATA.role}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-0.055em",
                lineHeight: 0.94,
              }}
            >
              <div style={{ display: "flex" }}>Web interfaces.</div>
              <div style={{ display: "flex", color: "#6786ff" }}>
                Product journeys.
              </div>
            </div>
          </div>

          <div
            style={{
              width: 210,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: "1px solid #2c3748",
              borderRadius: 20,
              background: "#0d131d",
              padding: "22px",
            }}
          >
            {["Interface", "State + data", "Quality loop"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid #253044",
                  borderRadius: 10,
                  padding: "12px",
                  color: "#b7c0ce",
                  fontSize: 14,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
