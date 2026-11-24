"use client";

import CurvedArrow from "@/components/shared/CurvedArrow";
import HandNote from "@/components/shared/HandNote";
import TypewriterText from "@/components/TypewriterText";
import type { Project } from "@/lib/profile";

function MockUI({ kind }: { kind: Project["mock"] }) {
  if (kind === "dashboard") {
    return (
      <div className="mock mock-dashboard">
        <div className="mock-sidebar">
          <i /> <i /> <i /> <i />
        </div>
        <div className="mock-body">
          <div className="mock-topbar"><b /><span /></div>
          <div className="mock-stats"><i /><i /><i /></div>
          <div className="mock-chart">
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 52 L25 38 L48 44 L72 20 L96 32 L122 12 L148 26 L176 8 L200 18" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "shop") {
    return (
      <div className="mock mock-shop">
        <div className="mock-topbar"><b /><span /></div>
        <div className="mock-products"><i /><i /><i /></div>
        <div className="mock-line"><b /></div>
      </div>
    );
  }

  if (kind === "tasks") {
    return (
      <div className="mock mock-tasks">
        <div className="mock-columns"><i /><i /><i /></div>
        <div className="mock-cards"><b /><b /><b /></div>
      </div>
    );
  }

  return (
    <div className="mock mock-weather">
      <div className="mock-sun" />
      <div className="mock-temp">24°</div>
      <div className="mock-days"><i /><i /><i /><i /><i /></div>
    </div>
  );
}

export default function ProjectCard({
  project,
  active,
  runId,
  delay = 0,
}: {
  project: Project;
  active: boolean;
  runId: number;
  delay?: number;
}) {
  return (
    <article className="project-card">
      <div className="project-visual">
        <MockUI kind={project.mock} />
        <span className="project-visual-glow" />
      </div>

      <div className="project-info">
        <div className="project-meta-top">
          <span className="project-year">{project.year}</span>
          <span className="project-dot" />
          <span className="project-tag-label">PROYECTO</span>
        </div>
        <TypewriterText
          as="h3"
          text={project.title}
          className="project-title"
          active={active}
          runId={runId}
          speed={36}
          delay={delay}
        />
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        {project.url && (
          <a
            className="project-visit"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            data-no-flip
          >
            Ver proyecto <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {project.note && (
        <div className="project-annotation" aria-hidden="true">
          <HandNote className="note-white">{project.note}</HandNote>
          <CurvedArrow className="project-arrow" />
        </div>
      )}
    </article>
  );
}
