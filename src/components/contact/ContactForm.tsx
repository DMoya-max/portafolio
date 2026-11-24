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

const FIELD_LABEL = "mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-400";

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
    `min-h-[44px] w-full rounded-lg border border-zinc-800 bg-[#09090B] px-4 py-3 text-base text-zinc-100 outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 ${
      (touched[field] || submitted) && errors[field] ? "border-red-500/70" : ""
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
    <div className="relative overflow-hidden rounded-2xl border-b border-l border-r border-zinc-800/90 border-t-2 border-t-red-500/70 bg-[#121215]/95 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.16),transparent_70%)] opacity-60"
        aria-hidden="true"
      />

      <div className="relative mb-7 flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ruby/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
            {"// ENVIAR MENSAJE DIRECTO"}
          </span>
          <h3 className="mt-3 text-xl font-semibold text-smoke">Envíame un mensaje</h3>
          <p className="mt-1 text-xs text-zinc-400">Respuesta usualmente en menos de 48 h.</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-950/40 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.18)]">
          <Send size={18} />
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.slice(0, 2).map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className={FIELD_LABEL}>
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
          <label htmlFor="asunto" className={FIELD_LABEL}>
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
            <label htmlFor="mensaje" className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Mensaje
            </label>
            <span className="font-mono text-[10px] text-zinc-500">
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
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 font-medium text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all duration-300 hover:from-red-600 hover:to-red-500 hover:shadow-[0_0_28px_rgba(220,38,38,0.45)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:from-red-700 disabled:hover:to-red-600"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Enviando...
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
              className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
                status === "success"
                  ? "border-emerald-700/50 bg-emerald-950/40 text-emerald-200"
                  : "border-red-600/50 bg-red-950/40 text-red-200"
              }`}
              role="status"
              aria-live="polite"
            >
              {status === "success" ? (
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
              ) : (
                <TriangleAlert size={17} className="mt-0.5 shrink-0 text-red-400" />
              )}
              <span className="leading-relaxed">{feedback}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>

      <div className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-zinc-800/80 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Correo directo
        </span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs text-zinc-200 transition-colors hover:text-red-400">
          {CONTACT_EMAIL}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/25 px-3 py-1.5 font-mono text-[11px] text-zinc-300 transition-all duration-300 hover:border-red-500/60 hover:text-white"
        >
          {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? "¡Copiado!" : "Copiar correo"}
        </button>
      </div>
    </div>
  );
}
