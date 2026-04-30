"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface CursorContextType {
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  isHovering: false,
  setIsHovering: () => {},
});

export function useCursorContext() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHoveringState] = useState(false);

  const setIsHovering = useCallback((v: boolean) => {
    setIsHoveringState(v);
  }, []);

  return (
    <CursorContext.Provider value={{ isHovering, setIsHovering }}>
      {children}
    </CursorContext.Provider>
  );
}
