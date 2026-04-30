"use client";

import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

/**
 * Positioned absolute behind all content, stretches to full page height.
 * Uses CSS radial gradients only — no blur filters, no compositing cost.
 */
export function AmbientBackground() {
  const reducedMotion = useReducedMotionContext();

  return (
    <div
      className="absolute inset-0 -z-20 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Static ambient glows scattered through the page */}
      <div
        className="absolute top-[20vh] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
      />
      <div
        className="absolute top-[60vh] right-[-5%] w-[700px] h-[700px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />
      <div
        className="absolute top-[120vh] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }}
      />
      <div
        className="absolute top-[180vh] right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
      />
      <div
        className="absolute top-[250vh] left-[-5%] w-[700px] h-[700px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />
      <div
        className="absolute top-[320vh] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }}
      />
      <div
        className="absolute top-[400vh] left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
      />

      {/* Drifting animated glows — transform-only, GPU composited */}
      {!reducedMotion && (
        <>
          <div
            className="absolute top-[40vh] left-[40%] w-[800px] h-[800px] rounded-full opacity-[0.04] animate-drift-1"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent 65%)" }}
          />
          <div
            className="absolute top-[150vh] left-[20%] w-[700px] h-[700px] rounded-full opacity-[0.035] animate-drift-2"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 65%)" }}
          />
          <div
            className="absolute top-[280vh] right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.04] animate-drift-3"
            style={{ background: "radial-gradient(circle, #ec4899, transparent 65%)" }}
          />
        </>
      )}
    </div>
  );
}
