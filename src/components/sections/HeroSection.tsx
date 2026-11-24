"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, Terminal } from "lucide-react";
import { ABOUT_TEXT, CONTACT_EMAIL, FULL_NAME, GITHUB_URL } from "@/lib/data";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  return (
    <div className="relative flex min-h-screen h-auto w-full flex-col items-center justify-center px-5 pt-28 pb-20 sm:px-8">
      <div className="grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-ruby/10 blur-[140px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 -top-24 h-[380px] w-[380px] rounded-full bg-red-900/10 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-7">
          <motion.div
            variants={item}
            className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-edge bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-steel backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ruby opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ruby" />
            </span>
            Disponible para nuevos proyectos
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-smoke sm:text-5xl lg:text-6xl"
          >
            Daniel Jose
            <br />
            <span className="text-gradient-ruby">Moya Quiroz</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-steel sm:text-xs"
          >
            <span className="h-px w-8 bg-ruby" />
            Desarrollador de Software Full-Stack
          </motion.p>

          <motion.div variants={item} className="mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <a
              href="#contacto"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-700 via-ruby to-red-700 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_35px_-12px_rgba(220,38,38,0.9)] transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              <Mail size={16} />
              Contactar
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-edge bg-surface/60 px-5 py-3 text-sm font-medium text-smoke backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-ruby/60 hover:text-white sm:w-auto"
            >
              <Github size={16} />
              GitHub
            </a>
          </motion.div>

          <motion.div variants={item} className="glass mt-6 rounded-xl p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ruby">
              <span className="h-px w-5 bg-ruby" />
              Acerca de mí
            </div>
            <p className="text-sm leading-relaxed text-steel sm:text-base">{ABOUT_TEXT}</p>
          </motion.div>
        </div>

        <motion.div variants={item} className="hidden lg:col-span-5 lg:block">
          <div className="glass relative overflow-hidden rounded-2xl p-1">
            <div className="flex items-center justify-between border-b border-edge/70 px-4 py-3">
              <div className="flex items-center gap-2 text-steel">
                <Terminal size={14} className="text-ruby" />
                <span className="font-mono text-[11px] tracking-wider">perfil.ts</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-900" />
                <span className="h-2 w-2 rounded-full bg-red-700" />
                <span className="h-2 w-2 rounded-full bg-ruby" />
              </div>
            </div>
            <div className="min-w-0 space-y-1.5 overflow-x-auto whitespace-nowrap p-4 font-mono text-[10px] leading-relaxed sm:p-5 sm:text-[11px]">
              <p className="text-steel/50">{"// perfil del desarrollador"}</p>
              <p>
                <span className="text-ruby">const</span> <span className="text-smoke">daniel</span> = {"{"}
              </p>
              <p className="pl-4">
                <span className="text-steel">nombre:</span>{" "}
                <span className="text-red-200">&quot;{FULL_NAME}&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-steel">rol:</span>{" "}
                <span className="text-red-200">&quot;Full-Stack Developer&quot;</span>,
              </p>
              <p className="pl-4">
                <span className="text-steel">backend:</span>{" "}
                <span className="text-red-200">
                  [&quot;Python&quot;, &quot;Django&quot;, &quot;Node.js&quot;, &quot;Nest.js&quot;]
                </span>,
              </p>
              <p className="pl-4">
                <span className="text-steel">frontend:</span>{" "}
                <span className="text-red-200">[&quot;React&quot;, &quot;Next.js&quot;]</span>,
              </p>
              <p className="pl-4">
                <span className="text-steel">enfoque:</span>{" "}
                <span className="text-red-200">&quot;arquitectura + resultados&quot;</span>,
              </p>
              <p>{"};"}</p>
              <p className="pt-1 text-steel/50">{"// construyendo con intención ✓"}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="glass flex items-center gap-3 rounded-lg px-4 py-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ruby/15 text-ruby">
                <Mail size={15} />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-steel/60">Email</p>
                <p className="text-xs text-smoke">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
