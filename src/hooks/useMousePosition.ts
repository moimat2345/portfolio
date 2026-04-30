"use client";

import { useRef, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

// Refs-only mouse tracking — zero React re-renders
const mouseState: MousePosition = { x: 0, y: 0, normalizedX: 0, normalizedY: 0 };
let listenerAttached = false;

function attachGlobalListener() {
  if (listenerAttached || typeof window === "undefined") return;
  listenerAttached = true;
  window.addEventListener("mousemove", (e) => {
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
    mouseState.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseState.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

export function useMousePosition() {
  const ref = useRef(mouseState);

  useEffect(() => {
    attachGlobalListener();
    ref.current = mouseState;
  }, []);

  return ref;
}
