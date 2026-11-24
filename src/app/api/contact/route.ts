import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "La solicitud no contiene un JSON válido." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revisa los campos del formulario.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { nombre, email, asunto, mensaje, website } = parsed.data;

  if (website) {
    return NextResponse.json({ ok: true, message: "Mensaje enviado correctamente." });
  }

  const user = process.env.GMAIL_USER;
  const password = process.env.GMAIL_APP_PASSWORD;

  if (!user || !password || password.startsWith("aquí") || password.startsWith("aqui")) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "El servidor de correo no está configurado. Define GMAIL_USER y GMAIL_APP_PASSWORD con una contraseña de aplicación válida de Gmail.",
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass: password },
    tls: { ciphers: "SSLv3" },
  });

  try {
    await transporter.sendMail({
      from: `"Portafolio · ${nombre}" <${user}>`,
      to: user,
      replyTo: email,
      subject: `[Portafolio] ${asunto}`,
      text: `Nombre: ${nombre}\nCorreo: ${email}\nAsunto: ${asunto}\n\n${mensaje}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#09090B;color:#F4F4F5;padding:28px;">
          <h2 style="color:#F87171;margin:0 0 18px;font-size:20px;">Nuevo mensaje desde tu portafolio</h2>
          <p style="color:#A1A1AA;font-size:14px;"><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
          <p style="color:#A1A1AA;font-size:14px;"><strong>Correo:</strong> ${escapeHtml(email)}</p>
          <p style="color:#A1A1AA;font-size:14px;"><strong>Asunto:</strong> ${escapeHtml(asunto)}</p>
          <div style="margin-top:20px;padding:18px;border:1px solid #27272A;background:#121215;border-radius:8px;color:#F4F4F5;font-size:14px;line-height:1.7;">${escapeHtml(mensaje).replace(/\n/g, "<br />")}</div>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "¡Mensaje enviado correctamente! Te responderé pronto.",
    });
  } catch (error) {
    console.error("Error SMTP al enviar el mensaje:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "No se pudo enviar el correo. Verifica la contraseña de aplicación de Gmail y vuelve a intentarlo.",
      },
      { status: 502 },
    );
  }
}
