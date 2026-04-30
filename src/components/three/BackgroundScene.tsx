"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GradientMesh } from "./GradientMesh";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useAudioContext } from "@/components/providers/AudioProvider";

function Scene() {
  const mouseRef = useMousePosition();
  const { audioLevel } = useAudioContext();
  const mouseState = useRef({ x: 0, y: 0 });

  useFrame(() => {
    mouseState.current.x = mouseRef.current.normalizedX;
    mouseState.current.y = mouseRef.current.normalizedY;
  });

  return <GradientMesh mouseRef={mouseState} audioLevel={audioLevel} />;
}

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.5 }}
        style={{ background: "#0a0a0f" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
