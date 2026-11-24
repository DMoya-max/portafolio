import { Github, Mail, MapPin, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_EMAIL, FULL_NAME, GITHUB_URL } from "@/lib/data";

export function ContactSection() {
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
          index="05"
          eyebrow="Contáctame"
          title={<>¿Construimos algo juntos?</>}
          description="Cuéntame tu idea, problema o propuesta. Estoy abierto a colaboraciones, proyectos freelance y oportunidades de desarrollo."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-5">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-smoke">Datos de contacto</h3>
              <p className="mt-1 mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ruby/80">
                {FULL_NAME}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ruby/30 bg-ruby/10 text-ruby">
                    <Mail size={16} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel/60">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-sm text-smoke transition-colors hover:text-ruby">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ruby/30 bg-ruby/10 text-ruby">
                    <Github size={16} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel/60">GitHub</p>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-smoke transition-colors hover:text-ruby"
                    >
                      github.com/DMoya-max
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ruby/30 bg-ruby/10 text-ruby">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel/60">Ubicación</p>
                    <p className="text-sm text-smoke">Colombia · Trabajo remoto</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass flex items-start gap-3 rounded-xl p-5">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-ruby" />
              <p className="text-xs leading-relaxed text-steel">
                Tu información se usa únicamente para responder a tu mensaje. El formulario
                incluye protección contra envíos automatizados.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
