import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { VeloraFeatured } from "@/components/sections/VeloraFeatured";
import { StackSkills } from "@/components/sections/StackSkills";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { VibeModeToggle } from "@/components/effects/VibeModeToggle";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { ContentScrim } from "@/components/effects/ContentScrim";

const BackgroundScene = dynamic(
  () => import("@/components/three/BackgroundScene").then((mod) => ({ default: mod.BackgroundScene })),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <BackgroundScene />
      <ContentScrim />
      <SmoothScroll />
      <FloatingParticles />
      <NoiseOverlay />
      <CustomCursor />
      <VibeModeToggle />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Bio />
        <VeloraFeatured />
        <StackSkills />
        <GitHubStats />
        <SelectedWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
