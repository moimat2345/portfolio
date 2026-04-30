"use client";

import { ReducedMotionProvider } from "./ReducedMotionProvider";
import { CursorProvider } from "./CursorProvider";
import { AudioProvider } from "./AudioProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReducedMotionProvider>
      <AudioProvider>
        <CursorProvider>
          {children}
        </CursorProvider>
      </AudioProvider>
    </ReducedMotionProvider>
  );
}
