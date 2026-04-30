"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface ChromeFormProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}

export function ChromeForm({ mouseRef }: ChromeFormProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x = lerp(
      meshRef.current.rotation.x,
      mouseRef.current.y * 0.3,
      0.05
    );
    meshRef.current.rotation.z = lerp(
      meshRef.current.rotation.z,
      mouseRef.current.x * 0.15,
      0.05
    );
  });

  return (
    <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 100, 24]} />
        <meshPhysicalMaterial
          metalness={1}
          roughness={0.05}
          iridescence={1}
          iridescenceIOR={1.3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          color="#8b5cf6"
        />
      </mesh>
    </Float>
  );
}
