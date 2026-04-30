"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 100) setVisible(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mouse icon */}
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-white/40 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
