"use client";

import CurvedArrow from "@/components/shared/CurvedArrow";
import HandNote from "@/components/shared/HandNote";
import PageBase from "@/components/shared/PageBase";
import TypewriterText from "@/components/TypewriterText";
import { profile } from "@/lib/profile";

type DecorativeProps = {
  active: boolean;
  runId: number;
};

/** Contraportada interior: primera página visible al abrir el catálogo. */
export function FlyleafPage({ active, runId }: DecorativeProps) {
  return (
    <PageBase number={0} side="left" className="page-flyleaf">
      <div className="flyleaf-inner">
        <div className="flyleaf-stack">
          <div className="flyleaf-mark">
            <span className="mark-line" />
            <TypewriterText
              text={profile.initials}
              className="mark-text"
              active={active}
              runId={runId}
              speed={60}
            />
            <span className="mark-line" />
          </div>
          <div className="flyleaf-center">
            <TypewriterText
              text={profile.name}
              className="flyleaf-name"
              active={active}
              runId={runId}
              speed={34}
              delay={180}
            />
            <TypewriterText
              text={profile.role}
              className="flyleaf-role"
              active={active}
              runId={runId}
              speed={28}
              delay={620}
            />
            <div className="flyleaf-quote">“{profile.quote}”</div>
          </div>
          <div className="flyleaf-bottom">
            <HandNote className="note-white">Abre la primera hoja → </HandNote>
            <CurvedArrow className="flyleaf-arrow" />
            <span className="flyleaf-year">{profile.year}</span>
          </div>
        </div>
      </div>
    </PageBase>
  );
}

/** Última página: cierre del recorrido. */
export function ThanksPage({ active, runId }: DecorativeProps) {
  return (
    <PageBase number={6} side="right" className="page-thanks">
      <div className="thanks-inner">
        <span className="thanks-eyebrow">FIN DEL RECORRIDO</span>
        <TypewriterText
          as="h1"
          text="GRACIAS"
          className="thanks-title gradient-text"
          active={active}
          runId={runId}
          speed={70}
          delay={100}
          showCursor={false}
        />
        <TypewriterText
          text="por hojear hasta aquí"
          className="thanks-sub"
          active={active}
          runId={runId}
          speed={34}
          delay={700}
        />
        <div className="thanks-signature">
          <TypewriterText
            text={profile.name}
            className="signature"
            active={active}
            runId={runId}
            speed={28}
            delay={1000}
          />
          <CurvedArrow className="thanks-arrow" />
        </div>
        <a className="thanks-back" href={`mailto:${profile.email}`} data-no-flip>
          ¿Seguimos en contacto? ↗
        </a>
      </div>
    </PageBase>
  );
}
