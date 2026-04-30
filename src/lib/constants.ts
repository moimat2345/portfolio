export const SITE = {
  name: "Mateo Nuskovski",
  title: "Mateo Nuskovski — AI-driven engineer",
  description:
    "French full-stack engineer building autonomous tools for SMBs. Currently based in Bangkok.",
  url: "https://mateonuskovski.com",
  github: "moimat2345",
  email: "hello@mateonuskovski.com",
  twitter: "mateonusko",
  linkedin: "mateonuskovski",
  telegram: "mateonusko",
  calcom: "mateonuskovski",
} as const;

export const PALETTE = {
  bg: "#0a0a0f",
  violet: "#8b5cf6",
  magenta: "#ec4899",
  cyan: "#06b6d4",
  text: "#ffffff",
  textMute: "rgba(255,255,255,0.6)",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "GitHub", href: "#github" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const STACK_ITEMS = {
  frontend: [
    { name: "Next.js", icon: "nextjs" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "TailwindCSS", icon: "tailwindcss" },
    { name: "Framer Motion", icon: "framer" },
  ],
  backend: [
    { name: "Python", icon: "python" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Node.js", icon: "nodejs" },
  ],
  infra: [
    { name: "AWS", icon: "aws" },
    { name: "Vercel", icon: "vercel" },
    { name: "Supabase", icon: "supabase" },
    { name: "Postgres", icon: "postgresql" },
  ],
  auth: [
    { name: "Clerk", icon: "clerk" },
    { name: "Stripe", icon: "stripe" },
  ],
  ai: [
    { name: "Claude API", icon: "anthropic" },
    { name: "OpenAI", icon: "openai" },
    { name: "Gemini", icon: "google" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "Docker", icon: "docker" },
  ],
} as const;

export const GITHUB_STATS_BASE =
  "https://github-readme-stats.vercel.app/api";

export const GITHUB_STATS_THEME = {
  bg_color: "0a0a0f",
  title_color: "ec4899",
  text_color: "ffffff",
  icon_color: "06b6d4",
  hide_border: "true",
  border_radius: "12",
} as const;

export const CODING_START_YEAR = 2024;
