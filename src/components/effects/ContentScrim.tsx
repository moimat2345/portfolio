"use client";

/**
 * Semi-transparent overlay between the 3D background and content sections.
 * Applied after the hero to darken the 3D so text remains readable.
 */
export function ContentScrim() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[0]"
      style={{
        background: "linear-gradient(to bottom, transparent 0%, transparent 80vh, rgba(0,0,0,0.55) 100vh, rgba(0,0,0,0.55) 100%)",
      }}
      aria-hidden="true"
    />
  );
}
