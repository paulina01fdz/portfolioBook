"use client";

import { useState } from "react";
import HandNote from "@/components/shared/HandNote";
import PageBase from "@/components/shared/PageBase";
import TypewriterText from "@/components/TypewriterText";
import { studyCategories, studies, type StudyCategory } from "@/lib/profile";

export default function StudiesPage({
  active,
  runId,
}: {
  active: boolean;
  runId: number;
}) {
  const [category, setCategory] = useState<StudyCategory>("estudios");
  const visibleStudies = studies.filter((study) => study.category === category);

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

        <nav
          className="study-tabs"
          role="tablist"
          aria-label="Categorías de formación"
        >
          {studyCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`study-tab-${item.id}`}
              aria-controls="study-panel"
              aria-selected={category === item.id}
              className={`study-tab ${category === item.id ? "is-active" : ""}`}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
              <span className="study-tab-count" aria-hidden="true">
                {studies.filter((study) => study.category === item.id).length}
              </span>
            </button>
          ))}
        </nav>

        <div
          className="study-list"
          role="tabpanel"
          id="study-panel"
          aria-labelledby={`study-tab-${category}`}
          key={category}
        >
          {visibleStudies.map((study, index) => (
            <article className="study-card" key={study.id}>
              <span className="study-marker" aria-hidden="true">✦</span>
              <div className="study-copy">
                <span className="study-kind">{study.kind}</span>
                <h3>{study.title}</h3>
                {study.institution && <p className="study-institution">{study.institution}</p>}
                {study.period && <span className="study-period">{study.period}</span>}
                {study.description && <p className="study-description">{study.description}</p>}
              </div>
              <span className="study-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        <div className="studies-footer">
          <HandNote className="note-white">el aprendizaje nunca termina ✦</HandNote>
          <span className="studies-count">
            {visibleStudies.length}{" "}
            {visibleStudies.length === 1 ? "etapa" : "etapas"}
          </span>
        </div>
      </div>
    </PageBase>
  );
}
