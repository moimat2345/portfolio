"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ── Chrome Torusknot (hero centerpiece) ── */
function ChromeTorusKnot({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Option A: slowed down by 3x for readability
    meshRef.current.rotation.y += delta * 0.05;
    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, mouseRef.current.y * 0.3, 0.05);
    meshRef.current.rotation.z = lerp(meshRef.current.rotation.z, mouseRef.current.x * 0.15, 0.05);
  });

  return (
    <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh ref={meshRef} scale={1.8} position={[0, 0, 0]}>
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

/* ── Floating chrome shapes scattered in space ── */
const SHAPES = [
  // Behind hero — large, subtle
  { pos: [-5, 2, -6] as [number, number, number], scale: 0.4, speed: 0.3, geo: "octahedron" },
  { pos: [5.5, -1.5, -5] as [number, number, number], scale: 0.3, speed: 0.4, geo: "icosahedron" },
  { pos: [-3, -3, -8] as [number, number, number], scale: 0.5, speed: 0.2, geo: "dodecahedron" },
  { pos: [4, 3, -7] as [number, number, number], scale: 0.25, speed: 0.5, geo: "octahedron" },
  // Mid-depth
  { pos: [-6, 0, -4] as [number, number, number], scale: 0.2, speed: 0.6, geo: "tetrahedron" },
  { pos: [6, -2, -4] as [number, number, number], scale: 0.15, speed: 0.7, geo: "icosahedron" },
  { pos: [0, 4, -5] as [number, number, number], scale: 0.2, speed: 0.35, geo: "dodecahedron" },
  { pos: [0, -4.5, -6] as [number, number, number], scale: 0.35, speed: 0.25, geo: "octahedron" },
  // Far field — smaller, more scattered
  { pos: [-8, 3, -10] as [number, number, number], scale: 0.6, speed: 0.15, geo: "icosahedron" },
  { pos: [8, -3, -10] as [number, number, number], scale: 0.5, speed: 0.2, geo: "dodecahedron" },
  { pos: [-4, -5, -12] as [number, number, number], scale: 0.7, speed: 0.1, geo: "octahedron" },
  { pos: [3, 5, -11] as [number, number, number], scale: 0.4, speed: 0.18, geo: "tetrahedron" },
];

function ChromeShape({ pos, scale, speed, geo }: typeof SHAPES[0]) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = pos[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slowed down by 3x for readability
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
    // Gentle float
    meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed + pos[0]) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={pos} scale={scale}>
      {geo === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {geo === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geo === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
      {geo === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
      <meshPhysicalMaterial
        metalness={1}
        roughness={0.1}
        iridescence={0.8}
        iridescenceIOR={1.3}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.2}
        color="#8b5cf6"
      />
    </mesh>
  );
}

/* ── Perspective grid floor ── */
function Grid() {
  const gridRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const SIZE = 40;
    const DIVISIONS = 40;
    const step = SIZE / DIVISIONS;
    const half = SIZE / 2;

    for (let i = 0; i <= DIVISIONS; i++) {
      const pos = -half + i * step;
      // X lines
      vertices.push(-half, 0, pos, half, 0, pos);
      // Z lines
      vertices.push(pos, 0, -half, pos, 0, half);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!gridRef.current) return;
    // Slow drift forward
    gridRef.current.position.z = (state.clock.elapsedTime * 0.1) % 1;
  });

  return (
    <lineSegments
      ref={gridRef}
      geometry={geometry}
      position={[0, -4, -5]}
      rotation={[0, 0, 0]}
    >
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.06} />
    </lineSegments>
  );
}

/* ── Floating line wireframes ── */
function WireframeRing({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.1;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.07;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.01, 16, 64]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
    </mesh>
  );
}

/* ── Main scene ── */
function Scene() {
  const mouseRef = useMousePosition();
  const mouseState = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    mouseState.current.x = mouseRef.current.normalizedX;
    mouseState.current.y = mouseRef.current.normalizedY;

    // Subtle scene parallax on mouse
    if (groupRef.current) {
      groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, mouseState.current.x * 0.02, 0.02);
      groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, mouseState.current.y * 0.015, 0.02);
    }
  });

  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 5, 18]} />

      <group ref={groupRef}>
        {/* Hero torusknot */}
        <ChromeTorusKnot mouseRef={mouseState} />

        {/* Chrome shapes scattered in the depth */}
        {SHAPES.map((shape, i) => (
          <ChromeShape key={i} {...shape} />
        ))}

        {/* Perspective grid */}
        <Grid />

        {/* Thin wireframe rings */}
        <WireframeRing position={[-3, 1, -3]} scale={1.2} speed={0.4} />
        <WireframeRing position={[4, -1, -4]} scale={0.8} speed={0.3} />
        <WireframeRing position={[0, 3, -7]} scale={1.5} speed={0.2} />

        {/* Lighting */}
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <pointLight position={[-5, 2, -3]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[5, -2, -3]} intensity={0.2} color="#06b6d4" />
      </group>
    </>
  );
}

export function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
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
