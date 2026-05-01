"use client";

/**
 * Fixed overlay that darkens the 3D background after the hero.
 * Transparent at the top (hero stays bright), fades to dark below.
 */
export function ContentScrim() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[0]"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, transparent 70vh, rgba(0,0,0,0.5) 100vh, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}
