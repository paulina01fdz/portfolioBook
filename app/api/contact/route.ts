import { profile } from "@/lib/profile";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  _honey?: string;
};

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escapa el contenido del visitante antes de inyectarlo en el HTML del correo. */
function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char] ?? char,
  );
}

/**
 * Endpoint del formulario de contacto usando la API SMTP de Brevo.
 *
 * Variables de entorno necesarias en `.env.local`:
 *   BREVO_API_KEY       Clave API de Brevo (obligatoria).
 *   BREVO_SENDER_EMAIL  Remitente verificado en Brevo (por defecto, profile.email).
 *   BREVO_SENDER_NAME   Nombre del remitente (por defecto, profile.name).
 *   BREVO_TO_EMAIL      Correo que recibe los mensajes (por defecto, profile.email).
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Honeypot: los bots rellenan este campo invisible. No enviamos nada.
    if (body._honey?.trim()) {
      return Response.json({ ok: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Por favor completa nombre, email y mensaje." },
        { status: 400 },
      );
    }

    if (name.length > 120 || message.length > 2000 || !EMAIL_PATTERN.test(email)) {
      return Response.json(
        { error: "Revisa el email y el largo del mensaje e inténtalo de nuevo." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY?.trim();
    if (!apiKey) {
      return Response.json(
        {
          error:
            "El formulario todavía no está configurado. Escríbeme directamente a " +
            profile.email +
            ".",
        },
        { status: 503 },
      );
    }

    const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim() || profile.email;
    const senderName = process.env.BREVO_SENDER_NAME?.trim() || profile.name;
    const toEmail = process.env.BREVO_TO_EMAIL?.trim() || profile.email;
    const subject = `Nuevo mensaje de ${name} · Portafolio de ${profile.firstName}`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

    const response = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: toEmail, name: profile.name }],
        replyTo: { email, name },
        subject,
        textContent: `${name} (${email}) escribió:\n\n${message}`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;color:#17133a;line-height:1.6">
            <h2 style="margin:0 0 12px">Nuevo mensaje desde el portafolio</h2>
            <p style="margin:4px 0"><strong>Nombre:</strong> ${safeName}</p>
            <p style="margin:4px 0"><strong>Email:</strong> ${safeEmail}</p>
            <div style="margin-top:18px;padding:14px 16px;border-radius:10px;background:#f2eefc">
              ${safeMessage}
            </div>
            <p style="margin-top:18px;font-size:12px;color:#6b6484">
              Respondiendo a este correo respondes a ${safeEmail}.
            </p>
          </div>
        `,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const detail = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      console.error(
        "Brevo rechazó el envío:",
        response.status,
        detail?.message ?? "sin detalle",
      );

      return Response.json(
        {
          error:
            "No fue posible enviar el mensaje. Puedes escribirme directamente a " +
            profile.email +
            ".",
          detail: detail?.message,
        },
        { status: 502 },
      );
    }

    const brevoResult = (await response.json().catch(() => null)) as
      | { messageId?: string }
      | null;
    console.log("Correo enviado por Brevo:", brevoResult?.messageId ?? "sin id");

    return Response.json({ ok: true, provider: "brevo" });
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return Response.json(
      {
        error:
          "Error inesperado al enviar el mensaje. Escríbeme a " +
          profile.email +
          " si persiste.",
      },
      { status: 500 },
    );
  }
}
