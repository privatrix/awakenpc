import { ImageResponse } from "next/og"
import { getPost } from "../posts"

export const runtime = "edge"
export const alt = "Awake NPC Paper"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) {
    return new ImageResponse(<div>Not found</div>, size)
  }

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
            width: "800px",
            height: "800px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top bar — brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 10,
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#10b981",
            }}
          />
          <div
            style={{
              fontSize: "26px",
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
              fontSize: "18px",
              letterSpacing: "0.25em",
              color: "#475569",
            }}
          >
            TRANSMISSION // {post.date}
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            zIndex: 10,
            marginBottom: "30px",
          }}
        >
          {post.tags.map(tag => (
            <div
              key={tag}
              style={{
                fontSize: "16px",
                letterSpacing: "0.2em",
                color: "#475569",
                border: "1px solid rgba(99,102,241,0.3)",
                padding: "6px 14px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "84px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            zIndex: 10,
            marginBottom: "24px",
            display: "flex",
          }}
        >
          {post.title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "30px",
            color: "#6366f1",
            lineHeight: 1.3,
            zIndex: 10,
            opacity: 0.85,
            marginBottom: "auto",
            display: "flex",
          }}
        >
          {post.subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
            marginTop: "60px",
            paddingTop: "30px",
            borderTop: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.2em",
              color: "#94a3b8",
            }}
          >
            AWAKENPC.COM/PAPERS/{post.slug.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.25em",
              color: "#475569",
            }}
          >
            {post.readTime.toUpperCase()} READ
          </div>
        </div>
      </div>
    ),
    size
  )
}
