"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ChromeForm } from "./ChromeForm";
import { GradientMesh } from "./GradientMesh";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useAudioContext } from "@/components/providers/AudioProvider";

export function HeroScene() {
  const { normalizedX, normalizedY } = useMousePosition();
  const { audioLevel } = useAudioContext();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <GradientMesh
            mouseX={normalizedX}
            mouseY={normalizedY}
            audioLevel={audioLevel}
          />
          <ChromeForm mouseX={normalizedX} mouseY={normalizedY} />
          <Environment preset="city" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
