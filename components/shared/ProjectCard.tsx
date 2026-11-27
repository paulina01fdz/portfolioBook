"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CurvedArrow from "@/components/shared/CurvedArrow";
import HandNote from "@/components/shared/HandNote";
import TypewriterText from "@/components/TypewriterText";
import type { Project } from "@/lib/profile";

/**
 * Alto lógico de la app incrustada. El ancho se calcula según el cuadro para
 * que la vista previa lo llene entero, sin franjas vacías ni recortes.
 */
const PREVIEW_HEIGHT = 460;

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

  if (kind === "weather") {
    return (
      <div className="mock mock-weather">
        <div className="mock-sun" />
        <div className="mock-temp">24°</div>
        <div className="mock-days"><i /><i /><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="mock mock-space">
      <div className="mock-orbit">
        <div className="mock-planet" />
      </div>
      <div className="mock-route"><i /><i /><i /></div>
      <div className="mock-badge" aria-hidden="true">✦</div>
    </div>
  );
}

/** Vista previa real de la app desplegada, escalada dentro del cuadro. */
function LiveDemo({
  demoUrl,
  title,
  onExpand,
}: {
  demoUrl: string;
  title: string;
  onExpand: () => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState({
    width: 480,
    height: PREVIEW_HEIGHT,
    scale: 0.45,
  });

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const measure = () => {
      const { width, height } = node.getBoundingClientRect();
      if (width > 0 && height > 0) {
        const scale = height / PREVIEW_HEIGHT;
        setPreview({ width: width / scale, height: PREVIEW_HEIGHT, scale });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="live-demo" data-no-flip>
      <div className="live-demo-viewport" ref={viewportRef}>
        <iframe
          className="live-demo-frame"
          src={demoUrl}
          title={`Vista en vivo de ${title}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            width: preview.width,
            height: preview.height,
            transform: `scale(${preview.scale})`,
          }}
        />
      </div>
      <button
        type="button"
        className="live-demo-open"
        onClick={onExpand}
        aria-label={`Abrir demo interactiva de ${title}`}
      >
        <span className="live-demo-badge"><i aria-hidden="true" /> EN VIVO</span>
        <span className="live-demo-hint">
          Toca para interactuar <span aria-hidden="true">⤢</span>
        </span>
      </button>
    </div>
  );
}

/** Demo interactiva a tamaño completo, fuera del libro y de sus giros 3D. */
function DemoModal({
  demoUrl,
  title,
  onClose,
}: {
  demoUrl: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="demo-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="demo-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`Demo en vivo de ${title}`}
      >
        <header className="demo-modal-head">
          <span className="demo-modal-title">
            {title} <span>· DEMO EN VIVO</span>
          </span>
          <div className="demo-modal-actions">
            <a href={demoUrl} target="_blank" rel="noreferrer">
              Abrir en pestaña <span aria-hidden="true">↗</span>
            </a>
            <button type="button" onClick={onClose} aria-label="Cerrar demo">
              ✕
            </button>
          </div>
        </header>
        <iframe
          className="demo-modal-frame"
          src={demoUrl}
          title={`Demo interactiva de ${title}`}
          allow="autoplay; fullscreen; geolocation"
        />
      </div>
    </div>,
    document.body,
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
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <article className="project-card">
      <div className="project-visual">
        {project.demoUrl ? (
          <LiveDemo
            demoUrl={project.demoUrl}
            title={project.title}
            onExpand={() => setDemoOpen(true)}
          />
        ) : (
          <MockUI kind={project.mock} />
        )}
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

      {project.demoUrl && demoOpen && (
        <DemoModal
          demoUrl={project.demoUrl}
          title={project.title}
          onClose={() => setDemoOpen(false)}
        />
      )}
    </article>
  );
}
