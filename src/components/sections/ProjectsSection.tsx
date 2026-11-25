"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Github, ShoppingBag } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProjectVisual({
  kind,
  index,
}: {
  kind: "dashboard" | "commerce";
  index: number;
}) {
  const isDashboard = kind === "dashboard";

  return (
    <div
      className={`relative flex h-56 w-full items-center justify-center overflow-hidden border-b border-edge/70 p-6 sm:h-64 ${
        isDashboard ? "bg-[#1D2436]" : "bg-black"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          isDashboard
            ? "bg-[radial-gradient(circle_at_50%_45%,rgba(148,163,184,0.18),transparent_65%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.12),transparent_65%)] opacity-60 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      />

      <Image
        src={isDashboard ? "/images/logo123.png" : "/images/logo-VB.jpg"}
        alt={isDashboard ? "Logo ERS-SIGIF" : "Logo Velvet Beauty"}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
          isDashboard ? "p-5" : "p-4"
        }`}
      />

      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] text-zinc-200 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
        EN PRODUCCIÓN
      </span>

      <span className="absolute right-4 top-4 z-10 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300/80">
        {String(index + 1).padStart(2, "0")} / {isDashboard ? "FULL-STACK" : "E-COMMERCE"}
      </span>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-60"
        aria-hidden="true"
      />
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
          index="03"
          eyebrow="Proyectos destacados"
          title={<>Soluciones construidas de principio a fin</>}
          description="Dos proyectos que reflejan mi enfoque: arquitectura sólida en el backend y experiencias cuidadas en el frontend."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project, index) => {
            const Icon = project.kind === "dashboard" ? Boxes : ShoppingBag;
            return (
              <motion.div key={project.name} variants={item} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border-b border-l border-r border-zinc-800/90 border-t-2 border-t-red-500/70 bg-surface transition-all duration-300 hover:-translate-y-2 hover:border-red-500/60 hover:shadow-[0_12px_35px_rgba(220,38,38,0.16)] focus-within:ring-2 focus-within:ring-red-500/70">
                  <ProjectVisual kind={project.kind} index={index} />

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Icon size={16} className="text-ruby" />
                        <h3 className="text-xl font-semibold text-smoke">{project.name}</h3>
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-red-200/70">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-steel">{project.description}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-text="DEMO"
                        aria-label={`Ver demo de ${project.name} en una pestaña nueva`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/30 px-3.5 py-2 font-mono text-xs text-red-300 transition-all duration-200 hover:border-red-500/70 hover:bg-red-900/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
                      >
                        Ver demo
                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-text="CÓDIGO"
                        aria-label={`Ver código de ${project.name} en GitHub en una pestaña nueva`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700/80 bg-[#09090B]/90 px-3.5 py-2 text-xs font-mono text-zinc-300 transition-all duration-200 hover:border-red-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70"
                      >
                        <Github size={14} />
                        Ver código
                      </a>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-edge/70 pt-5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-red-500/20 bg-red-950/25 px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-colors group-hover:border-red-500/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
