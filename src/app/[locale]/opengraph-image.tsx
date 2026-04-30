import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mateo Nuskovski — AI-driven engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const isEN = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.2), transparent 70%), radial-gradient(ellipse at top right, rgba(6,182,212,0.15), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              background: "linear-gradient(120deg, #8b5cf6, #06b6d4)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Mateo Nuskovski
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 600,
              textAlign: "center",
            }}
          >
            {isEN
              ? "Full-stack engineer building autonomous tools for SMBs."
              : "Ingénieur full-stack construisant des outils autonomes pour les PME."}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
            }}
          >
            mateonuskovski.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
