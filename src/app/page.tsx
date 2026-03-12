"use client";
import BackgroundLoader from "@/components/background-loader";
import SmoothScroll from "@/components/smooth-scroll";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import StatusSection from "@/components/sections/status";
function MainPage() {
  return (
    <SmoothScroll>
      <BackgroundLoader />
      <main className="relative z-[2] bg-transparent canvas-overlay-mode">
        <HeroSection />
        <StatusSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
export default MainPage;
