"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface CursorContextType {
  x: number;
  y: number;
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  x: 0,
  y: 0,
  isHovering: false,
  setIsHovering: () => {},
});

export function useCursorContext() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHoveringState] = useState(false);

  const setIsHovering = useCallback((v: boolean) => {
    setIsHoveringState(v);
  }, []);

  return (
    <CursorContext.Provider value={{ x, y, isHovering, setIsHovering }}>
      {children}
    </CursorContext.Provider>
  );
}
