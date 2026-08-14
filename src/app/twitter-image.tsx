import { ImageResponse } from "next/og";

export const alt = "stopsuicide.in — You Are Not Alone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #2563EB 0%, #0f172a 50%, #10B981 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase" }}>
          stopsuicide.in
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16 }}>You Are Not Alone</div>
        <div style={{ fontSize: 32, marginTop: 16, opacity: 0.9 }}>
          Hope · Resilience · Recovery · Wellness
        </div>
      </div>
    ),
    size,
  );
}
