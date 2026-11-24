"use client";

import { useState, type FormEvent } from "react";
import CurvedArrow from "@/components/shared/CurvedArrow";
import HandNote from "@/components/shared/HandNote";
import PageBase from "@/components/shared/PageBase";
import TypewriterText from "@/components/TypewriterText";
import { profile } from "@/lib/profile";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 19c-4 1.3-4-2.2-5.6-2.7M15 21v-3.3a2.9 2.9 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.7 4.7 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6 1.1 4.9 1.4 4.9 1.4a4.4 4.4 0 0 0-.1 3.3 4.7 4.7 0 0 0-1.3 3.3c0 4.6 2.9 5.7 5.6 6a2.9 2.9 0 0 0-.8 2.3V21" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <path d="M7 10v7M7 7v.1M11 17v-4a2.5 2.5 0 0 1 5 0v4M11 10v7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.6 7.3L3.5 20l1.2-4.3a8.4 8.4 0 1 1 15.8-4.1Z" />
      <path d="M9 9.2c.2-.4.4-.4.7-.4h.5c.2 0 .5 0 .7.5l.9 2c.1.3.1.5 0 .7l-.4.6c-.1.2-.3.3-.1.6.3.5 1 1.2 1.8 1.7.5.3.9.5 1.2.6.3.1.5.1.7-.2l.6-.8c.2-.2.4-.3.7-.2l1.8.9c.3.2.5.3.5.4.1.3.1 1-.3 1.6-.4.6-1.4 1.2-2.3 1.1-1.2-.1-2.6-.6-4-1.9a9.6 9.6 0 0 1-3-3.6c-.4-1-.5-1.9-.3-2.6.1-.6.5-1.2 1.1-1.7Z" />
    </svg>
  );
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function ContactPage({
  active,
  runId,
}: {
  active: boolean;
  runId: number;
}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "No fue posible enviar el mensaje.");
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorText(
        error instanceof Error ? error.message : "No fue posible enviar el mensaje.",
      );
      setStatus("error");
    }
  }

  const statusMessage =
    status === "sent"
      ? "¡Gracias! Tu mensaje fue enviado. Te responderé pronto."
      : status === "error"
        ? errorText
        : status === "sending"
          ? "Enviando mensaje…"
          : "";

  return (
    <PageBase number={6} side="left" className="page-contact">
      <div className="contact-inner">
        <header className="page-head">
          <TypewriterText
            text="05 — CONTACTO"
            className="eyebrow"
            active={active}
            runId={runId}
            speed={28}
          />
          <TypewriterText
            as="h2"
            text="Hablemos"
            className="page-title gradient-text"
            active={active}
            runId={runId}
            speed={55}
            delay={150}
          />
          <TypewriterText
            text="¿Tienes una idea en mente? Escríbeme."
            className="page-subtitle"
            active={active}
            runId={runId}
            speed={24}
            delay={380}
          />
          <p className="contact-location">
            <span className="status-dot" aria-hidden="true" />
            Abierta a conversar · {profile.location}
          </p>
        </header>

        <div className="contact-layout">
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${profile.email}`} data-no-flip>
              <span className="contact-icon"><MailIcon /></span>
              <span className="contact-link-copy">
                <small>EMAIL</small>
                <strong>{profile.email}</strong>
              </span>
            </a>
            <a
              className="contact-link"
              href={profile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-no-flip
            >
              <span className="contact-icon"><WhatsAppIcon /></span>
              <span className="contact-link-copy">
                <small>WHATSAPP</small>
                <strong>{profile.whatsapp}</strong>
              </span>
            </a>
            <a
              className="contact-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-no-flip
            >
              <span className="contact-icon"><GithubIcon /></span>
              <span className="contact-link-copy">
                <small>GITHUB</small>
                <strong>@paulina01fdz</strong>
              </span>
            </a>
            <a
              className="contact-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-no-flip
            >
              <span className="contact-icon"><LinkedinIcon /></span>
              <span className="contact-link-copy">
                <small>LINKEDIN</small>
                <strong>Paulina Fernández</strong>
              </span>
            </a>

            <div className="contact-note">
              <HandNote className="note-white">Tus ideas empiezan aquí </HandNote>
              <CurvedArrow className="contact-arrow" />
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-no-flip>
            <input
              className="form-honey"
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="form-row">
              <label className="field">
                <span>NOMBRE</span>
                <input name="name" type="text" placeholder="Tu nombre" required />
              </label>
              <label className="field">
                <span>EMAIL</span>
                <input name="email" type="email" placeholder="tu@email.com" required />
              </label>
            </div>
            <label className="field">
              <span>MENSAJE</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Cuéntame de tu proyecto..."
                required
              />
            </label>
            <button
              type="submit"
              className="submit-btn"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending"
                  ? "Enviando…"
                  : status === "sent"
                    ? "¡Mensaje enviado!"
                    : "Enviar mensaje"}
              </span>
              <span className="submit-arrow">
                {status === "sent" ? "✓" : "↗"}
              </span>
            </button>
            <p
              className={`form-status ${statusMessage ? "is-visible" : ""} ${
                status === "error" ? "is-error" : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
            <a
              className="form-direct"
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Hola Paulina")}`}
              data-no-flip
            >
              ¿Prefieres escribirme directo? {profile.email} ↗
            </a>
          </form>
        </div>
      </div>
    </PageBase>
  );
}
