"use client";

import { motion } from "framer-motion";
import { GraduationCap, BriefcaseBusiness, Database, Scale } from "lucide-react";
import { complementaryCourses, education } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [GraduationCap, GraduationCap, BriefcaseBusiness];
const COURSE_ICONS = [Database, Scale];

const FOCUS_TAGS = [
  ["Pensamiento Lógico", "Autonomía"],
  ["Ingeniería de Software", "Full-Stack", "Calidad"],
  ["Entorno Real", "Desarrollo", "Implementación"],
];

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

const ICON_BOX =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-950/40 text-red-300 shadow-[0_0_15px_rgba(220,38,38,0.18)] transition-transform duration-300 group-hover:scale-110";

const GLOW =
  "pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.20),transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-100";

export function EducationSection() {
  return (
    <section
      id="formacion"
      className="relative scroll-mt-20 border-t border-edge/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Formación y experiencia"
          title={<>Base técnica aplicada a proyectos reales</>}
          description="Mi formación combina fundamentos de ingeniería de software con experiencia práctica en entornos de desarrollo colaborativo."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-x-0 top-10 hidden lg:block"
              aria-hidden="true"
            >
              <div className="absolute left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-red-900/40 via-red-500/70 to-red-500" />
              <span className="absolute left-[33%] top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)]" />
              <span className="absolute left-[67%] top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {education.map((entry, index) => {
                const Icon = ICONS[index % ICONS.length];
                const isCurrent = index === education.length - 1;
                return (
                  <motion.div key={entry.role} variants={item} className="h-full">
                    <article
                      className={`group relative z-10 flex h-full flex-col overflow-hidden rounded-xl border-b border-l border-r border-edge/80 bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${
                        isCurrent
                          ? "border-t-2 border-t-red-500 hover:border-ruby/60"
                          : "border-t border-t-red-500/25 hover:border-red-500/60"
                      }`}
                    >
                      <div className={GLOW} aria-hidden="true" />

                      <span
                        className="absolute right-5 top-5 font-mono text-xs tracking-[0.2em] text-red-500/60 transition-colors duration-300 group-hover:text-red-300"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {isCurrent ? (
                        <span className="relative mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/40 bg-red-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-red-300">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                          ACTUAL · ETAPA PRODUCTIVA
                        </span>
                      ) : null}

                      <div className="relative flex items-start gap-4">
                        <span className={ICON_BOX}>
                          <Icon size={19} strokeWidth={1.6} />
                        </span>
                        <div className="pr-6">
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

                      <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                        {FOCUS_TAGS[index].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-red-500/20 bg-red-950/30 px-2.5 py-0.5 font-mono text-[11px] text-red-300/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div variants={item} className="mt-14 flex flex-wrap items-center gap-3">
            <span className="min-w-0 max-w-full break-words font-mono text-xs uppercase tracking-[0.14em] text-ruby/80 sm:text-sm">
              {"// CERTIFICACIONES Y CURSOS COMPLEMENTARIOS"}
            </span>
            <span
              className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-red-500/40 to-transparent"
              aria-hidden="true"
            />
          </motion.div>

          <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            {complementaryCourses.map((course, index) => {
              const Icon = COURSE_ICONS[index % COURSE_ICONS.length];
              return (
                <motion.div key={course.title} variants={item} className="h-full min-w-0 w-full">
                  <article className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border-y border-r border-l-2 border-edge/80 border-l-red-500/70 bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/60 sm:p-7">
                    <div className={GLOW} aria-hidden="true" />

                    <div className="relative flex flex-wrap items-start justify-between gap-2">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        <span className={ICON_BOX}>
                          <Icon size={19} strokeWidth={1.6} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ruby/80">
                            CURSO COMPLEMENTARIO
                          </p>
                          <h3 className="break-words text-lg font-semibold leading-snug text-smoke">
                            {course.title}
                          </h3>
                          <p className="mt-1 break-words text-sm font-medium text-red-200/80">
                            {course.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border border-red-500/30 bg-red-950/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-red-300/90">
                        CERTIFICADO
                      </span>
                    </div>

                    <p className="relative mt-5 min-w-0 break-words border-t border-edge/70 pt-5 text-sm leading-relaxed text-steel">
                      {course.description}
                    </p>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
