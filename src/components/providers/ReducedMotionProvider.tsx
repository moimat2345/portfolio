"use client";

import { createContext, useContext } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ReducedMotionContext = createContext(false);

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
