"use client";

import { useRef, useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const vertexShader = `
uniform float uTime;
uniform float uDistortionFreq;
uniform float uDistortionAmp;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

// Simplex noise (same as background)
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  // Displace sphere surface with noise
  float noise = snoise(position * uDistortionFreq + uTime * 0.2);
  float displacement = noise * uDistortionAmp;
  vDisplacement = displacement;

  vec3 newPosition = position + normal * displacement;

  // Recompute normal via finite differences
  float eps = 0.001;
  vec3 tangent1 = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
  vec3 tangent2 = normalize(cross(normal, tangent1));
  float n1 = snoise((position + tangent1 * eps) * uDistortionFreq + uTime * 0.2);
  float n2 = snoise((position + tangent2 * eps) * uDistortionFreq + uTime * 0.2);
  vec3 displaced1 = (position + tangent1 * eps) + normal * n1 * uDistortionAmp;
  vec3 displaced2 = (position + tangent2 * eps) + normal * n2 * uDistortionAmp;
  vec3 newNormal = normalize(cross(displaced1 - newPosition, displaced2 - newPosition));

  vNormal = normalize(normalMatrix * newNormal);
  vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // View direction
  vec3 viewDir = normalize(-vPosition);

  // Fresnel — edges glow, center transparent
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);

  // Map displacement to palette colors
  float colorMix1 = smoothstep(-0.3, 0.3, vDisplacement);
  float colorMix2 = smoothstep(0.0, 0.5, vDisplacement);
  vec3 baseColor = mix(uColorA, uColorB, colorMix1);
  baseColor = mix(baseColor, uColorC, colorMix2 * 0.5);

  // Specular highlight
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(vNormal, halfDir), 0.0), 64.0);

  // Combine: colored fresnel edge glow + specular
  vec3 color = baseColor * fresnel * 1.8;
  color += vec3(1.0) * spec * 0.4;

  // Alpha: transparent center, visible edges — glassy feel
  float alpha = fresnel * 0.85 + spec * 0.3;
  alpha = clamp(alpha, 0.0, 0.9);

  gl_FragColor = vec4(color, alpha);
}
`;

interface ChromeFormProps {
  mouseRef: MutableRefObject<{ x: number; y: number }>;
}

export function ChromeForm({ mouseRef }: ChromeFormProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortionFreq: { value: 1.8 },
      uDistortionAmp: { value: 0.3 },
      uColorA: { value: new THREE.Color("#8b5cf6") },
      uColorB: { value: new THREE.Color("#ec4899") },
      uColorC: { value: new THREE.Color("#06b6d4") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Slow auto-rotation
    meshRef.current.rotation.y += delta * 0.1;

    // Cursor follow
    meshRef.current.rotation.x = lerp(
      meshRef.current.rotation.x,
      mouseRef.current.y * 0.4,
      0.03
    );
    meshRef.current.rotation.z = lerp(
      meshRef.current.rotation.z,
      mouseRef.current.x * 0.2,
      0.03
    );
  });

  return (
    <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}
