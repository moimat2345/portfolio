import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        violet: "#8b5cf6",
        magenta: "#ec4899",
        cyan: "#06b6d4",
        "text-primary": "#ffffff",
        "text-mute": "rgba(255,255,255,0.6)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(120deg, #8b5cf6, #06b6d4)",
        "gradient-accent": "linear-gradient(120deg, #8b5cf6, #ec4899, #06b6d4)",
      },
      backdropBlur: {
        glass: "24px",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "drift-1": "drift-1 25s ease-in-out infinite",
        "drift-2": "drift-2 30s ease-in-out infinite",
        "drift-3": "drift-3 20s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "drift-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(60px, -40px)" },
          "66%": { transform: "translate(-30px, 30px)" },
        },
        "drift-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-50px, 30px)" },
          "75%": { transform: "translate(40px, -20px)" },
        },
        "drift-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, 50px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
