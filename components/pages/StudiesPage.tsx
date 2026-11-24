"use client";

import HandNote from "@/components/shared/HandNote";
import PageBase from "@/components/shared/PageBase";
import TypewriterText from "@/components/TypewriterText";
import { studies } from "@/lib/profile";

export default function StudiesPage({
  active,
  runId,
}: {
  active: boolean;
  runId: number;
}) {
  return (
    <PageBase number={2} side="right" className="page-studies">
      <div className="studies-inner">
        <header className="page-head">
          <TypewriterText
            text="02 — FORMACIÓN"
            className="eyebrow"
            active={active}
            runId={runId}
            speed={28}
          />
          <TypewriterText
            as="h2"
            text="Lo que he estudiado"
            className="page-title gradient-text"
            active={active}
            runId={runId}
            speed={42}
            delay={160}
          />
          <TypewriterText
            text="Un recorrido de aprendizaje, dentro y fuera del aula"
            className="page-subtitle"
            active={active}
            runId={runId}
            speed={22}
            delay={390}
          />
        </header>

        <div className="study-list">
          {studies.map((study, index) => (
            <article className="study-card" key={study.id}>
              <span className="study-marker" aria-hidden="true">✦</span>
              <div className="study-copy">
                <span className="study-kind">{study.kind}</span>
                <h3>{study.title}</h3>
                {study.institution && <p className="study-institution">{study.institution}</p>}
                {study.period && <span className="study-period">{study.period}</span>}
                {study.description && <p className="study-description">{study.description}</p>}
              </div>
              {index === 0 && (
                <span className="study-index" aria-hidden="true">01</span>
              )}
            </article>
          ))}
        </div>

        <div className="studies-footer">
          <HandNote className="note-white">el aprendizaje nunca termina ✦</HandNote>
          <span className="studies-count">
            {studies.length} {studies.length === 1 ? "etapa" : "etapas"}
          </span>
        </div>
      </div>
    </PageBase>
  );
}
