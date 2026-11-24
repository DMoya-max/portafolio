import { ArrowUpRight, Boxes, ShoppingBag } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function DashboardMock() {
  return (
    <div className="relative h-52 overflow-hidden rounded-t-xl border-b border-edge/70 bg-[#0d0d10] p-4 sm:h-60">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="relative flex h-full gap-3">
        <div className="hidden w-24 shrink-0 flex-col gap-2 rounded-md border border-edge/60 bg-surface/80 p-2 sm:flex">
          <div className="mb-1 h-2 w-12 rounded-full bg-ruby/70" />
          {[70, 55, 85, 45].map((width) => (
            <div key={width} className="h-1.5 rounded-full bg-edge" style={{ width: `${width}%` }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-smoke/20" />
            <div className="h-5 w-14 rounded border border-ruby/40 bg-ruby/10" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["24%", "0%", "0%"].map((value, index) => (
              <div key={index} className="rounded-md border border-edge/60 bg-surface/80 p-2">
                <div className="h-1.5 w-8 rounded-full bg-edge" />
                <div className="mt-2 font-mono text-sm text-red-300">{value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-2 rounded-md border border-edge/60 bg-surface/60 p-3">
            {[38, 62, 45, 78, 55, 88, 68].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-red-900/60 to-ruby" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommerceMock() {
  return (
    <div className="relative h-52 overflow-hidden rounded-t-xl border-b border-edge/70 bg-[#0d0d10] p-4 sm:h-60">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between border-b border-edge/70 pb-3">
          <div className="font-serif text-sm italic tracking-wide text-red-200">Velvet Beauty</div>
          <div className="flex gap-2">
            <div className="h-1.5 w-8 rounded-full bg-edge" />
            <div className="h-1.5 w-8 rounded-full bg-edge" />
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-ruby/20 text-[9px] text-red-200">2</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            "from-red-950 to-[#3b1016]",
            "from-[#2a1014] to-[#5b1d24]",
            "from-[#1a0f12] to-[#7f1d2e]",
          ].map((gradient, index) => (
            <div key={index} className="overflow-hidden rounded-md border border-edge/70 bg-surface/70">
              <div className={`h-16 bg-gradient-to-br ${gradient} sm:h-20`} />
              <div className="space-y-1.5 p-2">
                <div className="h-1.5 w-3/4 rounded-full bg-smoke/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-ruby/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="proyectos"
      className="relative scroll-mt-20 border-t border-edge/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Proyectos destacados"
          title={<>Soluciones construidas de principio a fin</>}
          description="Dos proyectos que reflejan mi enfoque: arquitectura sólida en el backend y experiencias cuidadas en el frontend."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = project.kind === "dashboard" ? Boxes : ShoppingBag;
            return (
              <Reveal key={project.name} delay={index * 0.12}>
                <article className="glass group h-full overflow-hidden rounded-xl transition-all duration-300 hover:border-ruby/40 hover:shadow-[0_24px_70px_-30px_rgba(220,38,38,0.5)]">
                  {project.kind === "dashboard" ? <DashboardMock /> : <CommerceMock />}
                  <div className="p-6 sm:p-7">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Icon size={16} className="text-ruby" />
                          <h3 className="text-xl font-semibold text-smoke">{project.name}</h3>
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-red-200/70">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-edge text-steel transition-all group-hover:border-ruby group-hover:text-ruby">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-steel">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-edge/70 pt-5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-edge bg-surface/80 px-2.5 py-1 font-mono text-[10px] text-steel transition-colors hover:border-ruby/50 hover:text-red-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
