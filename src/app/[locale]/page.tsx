import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { StackSkills } from "@/components/sections/StackSkills";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { VibeModeToggle } from "@/components/effects/VibeModeToggle";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";

export default function Home() {
  return (
    <>
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
        <StackSkills />
        <GitHubStats />
        <SelectedWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
