import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechShowcase } from "@/components/three/TechShowcase";

export function TechSection() {
  return (
    <section
      id="tecnologias"
      className="relative scroll-mt-20 border-t border-edge/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Stack tecnológico"
          title={<>Herramientas que uso para construir</>}
          description="Cada tecnología cumple un rol concreto: del modelo de datos a la última interacción de la interfaz. Explora el stack con el que trabajo a diario."
        />
        <TechShowcase />
      </div>
    </section>
  );
}
