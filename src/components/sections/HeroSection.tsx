"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { ABOUT_TEXT, GITHUB_URL } from "@/lib/data";

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
    <div className="relative flex min-h-screen h-auto w-full flex-col items-center justify-center overflow-x-clip px-5 pt-28 pb-20 sm:px-8">
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
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <div className="w-full">
          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-smoke sm:text-5xl lg:text-6xl"
          >
            Daniel Jose <span className="text-gradient-ruby">Moya Quiroz</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-steel sm:text-xs"
          >
            <span className="h-px w-8 bg-ruby" />
            Desarrollador de Software Full-Stack
          </motion.p>

          <motion.div variants={item} className="mt-5 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
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

          <motion.div variants={item} className="glass mt-6 w-full rounded-xl p-5 text-left sm:p-6">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ruby">
              <span className="h-px w-5 bg-ruby" />
              Acerca de mí
            </div>
            <p className="text-sm leading-relaxed text-steel sm:text-base">{ABOUT_TEXT}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
