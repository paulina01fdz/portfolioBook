import { profile } from "@/lib/profile";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  _honey?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Endpoint real de contacto.
 *
 * - Si FORMSPREE_ENDPOINT está definido, envía por Formspree (endpoint privado).
 * - Si no lo está, usa FormSubmit con el email de Paulina: funciona sin claves
 *   ni configuración. La primera vez, FormSubmit envía un correo de activación
 *   a fpaulina545@gmail.com; basta con hacer clic en ese enlace.
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

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();
    const isFormspree = Boolean(formspreeEndpoint);
    const endpoint =
      formspreeEndpoint ??
      `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`;

    const subject = `Nuevo mensaje de ${name} · Portafolio de ${profile.firstName}`;
    const payload = isFormspree
      ? { name, email, message, _replyto: email, _subject: subject }
      : {
          name,
          email,
          message,
          _replyto: email,
          _subject: subject,
          _template: "table",
          _captcha: "false",
        };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return Response.json(
        {
          error:
            "No fue posible enviar el mensaje. Puedes escribirme directamente a " +
            profile.email +
            ".",
        },
        { status: 502 },
      );
    }

    return Response.json({
      ok: true,
      provider: isFormspree ? "formspree" : "formsubmit",
    });
  } catch {
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
