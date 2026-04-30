"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ChromeForm } from "./ChromeForm";
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

  return (
    <>
      <GradientMesh mouseRef={mouseState} audioLevel={audioLevel} />
      <ChromeForm mouseRef={mouseState} />
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
}

export function HeroScene() {
  return (
    <div
      className="absolute -z-10 left-0 right-0 top-0"
      style={{ height: "140vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Fade-out gradient at bottom — smooth transition into page */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "40vh",
          background: "linear-gradient(to bottom, transparent, #0a0a0f)",
        }}
      />
    </div>
  );
}
