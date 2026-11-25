"use client";

import { BinarySpiderIntro } from "@/components/intro/BinarySpiderIntro";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TechSection } from "@/components/sections/TechSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <BinarySpiderIntro />
        <div id="intro" className="relative h-[180vh] w-full" aria-hidden="true" />
        <div className="relative z-20 bg-transparent">
          <section
            id="inicio"
            className="relative scroll-mt-20 border-t border-edge/60 bg-transparent"
          >
            <HeroSection />
          </section>
          <TechSection />
          <EducationSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
