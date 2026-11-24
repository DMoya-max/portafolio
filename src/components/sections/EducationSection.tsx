import { GraduationCap, BriefcaseBusiness } from "lucide-react";
import { education } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [GraduationCap, BriefcaseBusiness];

export function EducationSection() {
  return (
    <section
      id="formacion"
      className="relative scroll-mt-20 border-t border-edge/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Formación y experiencia"
          title={<>Base técnica aplicada a proyectos reales</>}
          description="Mi formación combina fundamentos de ingeniería de software con experiencia práctica en entornos de desarrollo colaborativo."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((entry, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal key={entry.role} delay={index * 0.12}>
                <article className="glass group relative h-full overflow-hidden rounded-xl p-6 sm:p-8">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-ruby/5 transition-all duration-500 group-hover:h-32 group-hover:w-32 group-hover:bg-ruby/10" />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ruby/30 bg-ruby/10 text-ruby">
                      <Icon size={19} strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ruby/80">
                        {entry.period}
                      </p>
                      <h3 className="text-lg font-semibold leading-snug text-smoke">
                        {entry.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-red-200/80">
                        {entry.organization}
                      </p>
                    </div>
                  </div>
                  <p className="relative mt-5 border-t border-edge/70 pt-5 text-sm leading-relaxed text-steel">
                    {entry.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
