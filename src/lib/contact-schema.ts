import { z } from "zod";

export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre no puede superar los 80 caracteres."),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido.")
    .max(120, "El correo no puede superar los 120 caracteres."),
  asunto: z
    .string()
    .trim()
    .min(4, "El asunto debe tener al menos 4 caracteres.")
    .max(120, "El asunto no puede superar los 120 caracteres."),
  mensaje: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(2000, "El mensaje no puede superar los 2000 caracteres."),
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<"nombre" | "email" | "asunto" | "mensaje", string>
>;

export function getFieldErrors(
  result: z.SafeParseReturnType<unknown, ContactInput>,
): ContactFieldErrors {
  if (result.success) return {};
  const flattened = result.error.flatten().fieldErrors as Record<
    string,
    string[] | undefined
  >;
  const errors: ContactFieldErrors = {};
  for (const key of ["nombre", "email", "asunto", "mensaje"] as const) {
    const message = flattened[key]?.[0];
    if (message) errors[key] = message;
  }
  return errors;
}
