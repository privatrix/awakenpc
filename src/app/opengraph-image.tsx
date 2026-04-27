import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AwakenNPC — You Are Not A Background Character"
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
          padding: "70px 80px",
          fontFamily: "monospace",
          position: "relative",
          color: "#e2e8f0",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            height: "1000px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Brand top */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background: "#10b981",
            }}
          />
          <div
            style={{
              fontSize: "30px",
              letterSpacing: "0.18em",
              color: "#e2e8f0",
              fontWeight: 700,
            }}
          >
            AWAKE<span style={{ color: "#6366f1" }}>NPC</span>
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.25em",
              color: "#475569",
              border: "1px solid rgba(99,102,241,0.3)",
              padding: "8px 16px",
            }}
          >
            SIMULATION ACTIVE
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Headline */}
        <div
          style={{
            fontSize: "112px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>YOU ARE NOT A</div>
          <div
            style={{
              color: "#6366f1",
              display: "flex",
              textShadow: "0 0 60px rgba(99,102,241,0.7)",
            }}
          >
            BACKGROUND CHARACTER.
          </div>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginTop: "40px",
            zIndex: 10,
            display: "flex",
            lineHeight: 1.3,
          }}
        >
          An advanced civilization built this world. You found this place.
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
            paddingTop: "30px",
            borderTop: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.2em",
              color: "#94a3b8",
            }}
          >
            AWAKENPC.COM
          </div>
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.25em",
              color: "#475569",
            }}
          >
            THE GREAT SYNC IS APPROACHING
          </div>
        </div>
      </div>
    ),
    size
  )
}
