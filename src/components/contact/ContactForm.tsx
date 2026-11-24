"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Copy, Loader2, Send, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
  contactSchema,
  getFieldErrors,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { CONTACT_EMAIL } from "@/lib/data";

type FormValues = {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  website: string;
};

const EMPTY_VALUES: FormValues = {
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
  website: "",
};

type FieldName = "nombre" | "email" | "asunto" | "mensaje";
type Status = "idle" | "loading" | "success" | "error";

const FIELDS: { name: FieldName; label: string; placeholder: string; type: string }[] = [
  { name: "nombre", label: "Nombre completo", placeholder: "Tu nombre y apellido", type: "text" },
  { name: "email", label: "Correo electrónico", placeholder: "tu@correo.com", type: "email" },
  { name: "asunto", label: "Asunto", placeholder: "¿De qué quieres hablar?", type: "text" },
];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const validate = (nextValues: FormValues) => {
    setErrors(getFieldErrors(contactSchema.safeParse(nextValues)));
  };

  const updateField = (field: FieldName, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    validate(nextValues);
    if (status !== "loading") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const result = contactSchema.safeParse(values);
    setErrors(getFieldErrors(result));

    if (!result.success) {
      setStatus("error");
      setFeedback("Revisa los campos marcados antes de enviar el mensaje.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data: { ok?: boolean; message?: string } = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.message ?? "No fue posible enviar el mensaje. Intenta de nuevo.");
        return;
      }

      setStatus("success");
      setFeedback(data.message ?? "¡Mensaje enviado correctamente!");
      setValues(EMPTY_VALUES);
      setTouched({});
      setSubmitted(false);
      setErrors({});
    } catch {
      setStatus("error");
      setFeedback(
        "No se pudo conectar con el servidor de correo. Revisa tu conexión e inténtalo de nuevo.",
      );
    }
  };

  const fieldClass = (field: FieldName) =>
    `min-h-[44px] w-full rounded-md border bg-obsidian/70 px-4 py-3 text-base text-smoke outline-none transition-all placeholder:text-steel/35 focus:border-ruby/70 focus:ring-2 focus:ring-ruby/15 ${
      (touched[field] || submitted) && errors[field]
        ? "border-ruby/80"
        : "border-edge"
    }`;

  const showError = (field: FieldName) =>
    (touched[field] || submitted) && errors[field] ? (
      <p className="mt-1.5 font-mono text-[11px] text-red-400">{errors[field]}</p>
    ) : null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      setFeedback("No se pudo copiar el correo. Cópialo manualmente.");
      setStatus("error");
    }
  };

  return (
    <div className="glass relative rounded-2xl p-6 sm:p-8">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-smoke">Envíame un mensaje</h3>
          <p className="mt-1 text-xs text-steel">Respuesta usualmente en menos de 48 h.</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-ruby/30 bg-ruby/10 text-ruby">
          <Send size={17} />
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.slice(0, 2).map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.name === "nombre" ? "name" : "email"}
                value={values[field.name]}
                onChange={(event) => updateField(field.name, event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, [field.name]: true }))}
                placeholder={field.placeholder}
                className={fieldClass(field.name)}
                aria-invalid={Boolean((touched[field.name] || submitted) && errors[field.name])}
              />
              {showError(field.name)}
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="asunto" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
            Asunto
          </label>
          <input
            id="asunto"
            name="asunto"
            type="text"
            value={values.asunto}
            onChange={(event) => updateField("asunto", event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, asunto: true }))}
            placeholder={FIELDS[2].placeholder}
            className={fieldClass("asunto")}
            aria-invalid={Boolean((touched.asunto || submitted) && errors.asunto)}
          />
          {showError("asunto")}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="mensaje" className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              Mensaje
            </label>
            <span className="font-mono text-[10px] text-steel/50">
              {values.mensaje.length}/2000
            </span>
          </div>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            maxLength={2000}
            value={values.mensaje}
            onChange={(event) => updateField("mensaje", event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, mensaje: true }))}
            placeholder="Cuéntame sobre tu proyecto, objetivos y plazos..."
            className={`${fieldClass("mensaje")} resize-y`}
            aria-invalid={Boolean((touched.mensaje || submitted) && errors.mensaje)}
          />
          {showError("mensaje")}
        </div>

        <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-md bg-gradient-to-r from-red-700 via-ruby to-red-700 px-5 py-3.5 text-base font-semibold text-white shadow-[0_12px_36px_-14px_rgba(220,38,38,0.95)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Enviando mensaje...
            </>
          ) : (
            <>
              <Send size={16} />
              Enviar mensaje
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {feedback ? (
            <motion.div
              key={feedback}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm ${
                status === "success"
                  ? "border-emerald-800/60 bg-emerald-950/30 text-emerald-200"
                  : "border-ruby/40 bg-ruby/10 text-red-200"
              }`}
              role="status"
              aria-live="polite"
            >
              {status === "success" ? (
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
              ) : (
                <TriangleAlert size={17} className="mt-0.5 shrink-0 text-ruby" />
              )}
              <span className="leading-relaxed">{feedback}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-edge/70 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel/60">
          Correo directo
        </span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs text-smoke transition-colors hover:text-ruby">
          {CONTACT_EMAIL}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded border border-edge px-3 py-2 font-mono text-[11px] text-steel transition-colors hover:border-ruby hover:text-smoke"
        >
          {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? "Copiado" : "Copiar correo"}
        </button>
      </div>
    </div>
  );
}
