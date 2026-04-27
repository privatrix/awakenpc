import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The Papers — AwakenNPC"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#030712",
          display: "flex",
          flexDirection: "column",
          padding: "80px 90px",
          fontFamily: "monospace",
          position: "relative",
          color: "#e2e8f0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <div style={{ width: "12px", height: "12px", borderRadius: "9999px", background: "#10b981" }} />
          <div style={{ fontSize: "26px", letterSpacing: "0.18em", fontWeight: 700 }}>
            AWAKE<span style={{ color: "#6366f1" }}>NPC</span>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ fontSize: "28px", letterSpacing: "0.25em", color: "#6366f1", marginBottom: "16px", display: "flex" }}>
          TRANSMISSION LOG
        </div>
        <div style={{ fontSize: "144px", fontWeight: 700, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.04em", display: "flex" }}>
          The Papers
        </div>
        <div style={{ fontSize: "30px", color: "#94a3b8", marginTop: "30px", display: "flex", maxWidth: "900px", lineHeight: 1.3 }}>
          Essays from inside the simulation. On consciousness, awakening, the architecture of reality.
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ fontSize: "20px", letterSpacing: "0.2em", color: "#475569", borderTop: "1px solid rgba(99,102,241,0.2)", paddingTop: "20px" }}>
          AWAKENPC.COM/PAPERS
        </div>
      </div>
    ),
    size
  )
}
