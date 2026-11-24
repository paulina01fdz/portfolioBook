"use client";

import PageBase from "@/components/shared/PageBase";
import ProjectCard from "@/components/shared/ProjectCard";
import TypewriterText from "@/components/TypewriterText";
import { projects, type Project } from "@/lib/profile";

type ProjectsPageProps = {
  active: boolean;
  runId: number;
};

function ProjectsHeader({
  active,
  runId,
  part,
}: ProjectsPageProps & { part: string }) {
  return (
    <header className="page-head projects-head">
      <TypewriterText
        text={`04 — PROYECTOS ${part}`}
        className="eyebrow"
        active={active}
        runId={runId}
        speed={28}
      />
      <TypewriterText
        as="h2"
        text="Lo que he creado"
        className="page-title gradient-text"
        active={active}
        runId={runId}
        speed={42}
        delay={150}
      />
    </header>
  );
}

function ComingSoonCard({ active, runId }: ProjectsPageProps) {
  return (
    <article className="project-card coming-soon-card">
      <div className="coming-soon-mark" aria-hidden="true">✦</div>
      <div className="coming-soon-copy">
        <TypewriterText
          text="PRÓXIMAMENTE"
          className="eyebrow"
          active={active}
          runId={runId}
          speed={28}
        />
        <h3 className="project-title">Más proyectos en camino</h3>
        <p className="project-description">
          Estoy construyendo nuevas ideas. Pronto las podrás ver aquí.
        </p>
      </div>
    </article>
  );
}

function ProjectList({
  items,
  active,
  runId,
}: ProjectsPageProps & { items: Project[] }) {
  return (
    <div className="projects-list">
      {items.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          active={active}
          runId={runId}
          delay={420 + index * 260}
        />
      ))}
      {items.length < 2 && <ComingSoonCard active={active} runId={runId} />}
    </div>
  );
}

export function ProjectsLeftPage({ active, runId }: ProjectsPageProps) {
  return (
    <PageBase number={4} side="left" className="page-projects">
      <div className="projects-inner">
        <ProjectsHeader active={active} runId={runId} part="· I" />
        <ProjectList
          items={projects.slice(0, 2)}
          active={active}
          runId={runId}
        />
      </div>
    </PageBase>
  );
}

export function ProjectsRightPage({ active, runId }: ProjectsPageProps) {
  return (
    <PageBase number={5} side="right" className="page-projects">
      <div className="projects-inner">
        <ProjectsHeader active={active} runId={runId} part="· II" />
        <ProjectList
          items={projects.slice(2, 4)}
          active={active}
          runId={runId}
        />
      </div>
    </PageBase>
  );
}
