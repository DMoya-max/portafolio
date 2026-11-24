"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Copy, Github, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_EMAIL, CONTACT_PHONE, FULL_NAME, GITHUB_URL } from "@/lib/data";

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

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-b border-l border-r border-zinc-800/90 border-t-2 border-t-red-500/70 bg-[#121215]/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.16),transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-950/40 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.18)] transition-transform duration-300 group-hover:scale-110">
          <Icon size={19} strokeWidth={1.6} />
        </span>
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            {label}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // El usuario puede copiar el correo manualmente desde el enlace.
    }
  };

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 overflow-hidden border-t border-edge/60 py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-ruby/10 blur-[150px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Contáctame"
          title={<>¿Construimos algo juntos?</>}
          description="Cuéntame tu idea, problema o propuesta. Estoy abierto a colaboraciones, proyectos freelance y oportunidades de desarrollo."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
        >
          <motion.div variants={item} className="space-y-4">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ruby/80">
              {FULL_NAME}
            </p>

            <InfoCard icon={Mail} label="Email">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="break-all text-sm text-zinc-200 transition-colors hover:text-red-400"
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-3 inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/25 px-3 py-1.5 font-mono text-[11px] text-zinc-300 transition-all duration-300 hover:border-red-500/60 hover:text-white"
              >
                {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? "¡Copiado!" : "Copiar correo"}
              </button>
            </InfoCard>

            <InfoCard icon={Phone} label="Teléfono">
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="text-sm text-zinc-200 transition-colors hover:text-red-400"
              >
                {CONTACT_PHONE}
              </a>
            </InfoCard>

            <InfoCard icon={Github} label="GitHub">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-200 transition-colors hover:text-red-400"
              >
                github.com/DMoya-max
              </a>
            </InfoCard>

            <InfoCard icon={MapPin} label="Ubicación y disponibilidad">
              <p className="text-sm text-zinc-200">Colombia · Modalidad mixta</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                Disponible para colaboraciones y proyectos freelance.
              </p>
            </InfoCard>

            <div className="flex items-start gap-3 rounded-2xl border border-zinc-800/90 bg-[#121215]/95 p-5">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-red-400" />
              <p className="text-xs leading-relaxed text-zinc-400">
                Tu información se usa únicamente para responder a tu mensaje. El formulario
                incluye protección contra envíos automatizados.
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
