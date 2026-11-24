"use client";

import Avatar from "@/components/shared/Avatar";
import HandNote from "@/components/shared/HandNote";
import PageBase from "@/components/shared/PageBase";
import TypewriterText from "@/components/TypewriterText";
import { profile, studies } from "@/lib/profile";

const facts = [
  { label: "ROL", value: profile.role },
  { label: "UBICACIÓN", value: profile.location },
  { label: "ENFOQUE", value: profile.focus },
  { label: "EXPERIENCIA", value: profile.experience },
];

export default function AboutPage({
  active,
  runId,
}: {
  active: boolean;
  runId: number;
}) {
  return (
    <PageBase number={1} side="left" className="page-about">
      <div className="about-inner">
        <header className="page-head">
          <TypewriterText
            text="01 — PERFIL"
            className="eyebrow"
            active={active}
            runId={runId}
            speed={28}
          />
          <TypewriterText
            as="h2"
            text="Hola, soy Paulina"
            className="page-title gradient-text"
            active={active}
            runId={runId}
            speed={44}
            delay={180}
          />
          <TypewriterText
            text={profile.role}
            className="page-subtitle"
            active={active}
            runId={runId}
            speed={30}
            delay={540}
          />
        </header>

        <div className="about-grid">
          <div className="about-portrait">
            <div className="avatar-frame">
              <Avatar
                className="about-avatar"
                src="/avatar-profile.webp"
                title="Avatar ilustrado de Paulina"
                width={848}
                height={960}
              />
              <span className="frame-glint" />
            </div>
            <div className="portrait-note">
              <HandNote className="note-white">¡Aquí estoy yo!</HandNote>
            </div>
          </div>

          <div className="about-copy">
            <p className="lead">{profile.bio}</p>
            <p className="body-copy">{profile.bioTwo}</p>

            <div className="fact-grid">
              {facts.map((fact, index) => (
                <div className="fact" key={fact.label}>
                  <span className="fact-label">{fact.label}</span>
                  <TypewriterText
                    text={fact.value}
                    className="fact-value"
                    active={active}
                    runId={runId}
                    speed={20}
                    delay={700 + index * 130}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-footer">
          <div className="education-line">
            <span className="education-icon">✦</span>
            <span>{studies[0]?.title ?? "Formación académica"}</span>
          </div>
          <HandNote className="note-lilac"> Terriblemente Curiosa ↗</HandNote>
        </div>
      </div>
    </PageBase>
  );
}
