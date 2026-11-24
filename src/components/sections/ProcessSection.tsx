import { GitBranch, Layers3, Palette, ServerCog } from "lucide-react";
import { processSteps } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [Layers3, ServerCog, Palette, GitBranch];

export function ProcessSection() {
  return (
    <section
      id="proceso"
      className="relative scroll-mt-20 overflow-hidden border-t border-edge/60 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-ruby/5 blur-[120px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Mi proceso"
          title={<>Del requerimiento al despliegue</>}
          description="Un flujo de trabajo claro y repetible que reduce la incertidumbre y mantiene la calidad en cada entrega."
        />

        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-ruby/50 to-transparent lg:block"
            aria-hidden="true"
          />
          {processSteps.map((step, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="glass group relative h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ruby/40">
                  <div className="relative mb-7 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-ruby/30 bg-ruby/10 text-ruby transition-colors group-hover:bg-ruby group-hover:text-white">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-3xl font-bold text-edge transition-colors group-hover:text-ruby/60">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-3 text-base font-semibold leading-snug text-smoke">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-steel">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
