"use client";

import { BinarySpiderIntro } from "@/components/intro/BinarySpiderIntro";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TechSection } from "@/components/sections/TechSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="inicio" className="relative h-[200vh] scroll-mt-0">
          <div className="sticky top-0 min-h-screen w-full">
            <HeroSection />
            <BinarySpiderIntro />
          </div>
        </section>
        <TechSection />
        <ProcessSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
