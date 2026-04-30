"use client";

import { motion } from "framer-motion";
import { useAudioContext } from "@/components/providers/AudioProvider";
import { Volume2, VolumeX } from "lucide-react";

export function VibeModeToggle() {
  const { isPlaying, toggle } = useAudioContext();

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 glass rounded-full p-3 text-text-mute hover:text-white transition-colors duration-200 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Disable vibe mode" : "Enable vibe mode"}
      title={isPlaying ? "Vibe mode: ON" : "Vibe mode: OFF"}
    >
      {isPlaying ? (
        <Volume2 size={18} className="text-violet" />
      ) : (
        <VolumeX size={18} />
      )}
      <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-[10px] font-mono glass rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Vibe mode
      </span>
    </motion.button>
  );
}
