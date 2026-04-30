"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ChromeForm } from "./ChromeForm";
import { useMousePosition } from "@/hooks/useMousePosition";

function Scene() {
  const mouseRef = useMousePosition();
  const mouseState = useRef({ x: 0, y: 0 });

  useFrame(() => {
    mouseState.current.x = mouseRef.current.normalizedX;
    mouseState.current.y = mouseRef.current.normalizedY;
  });

  return (
    <>
      <ChromeForm mouseRef={mouseState} />
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
