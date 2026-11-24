"use client";

export type Chapter = {
  label: string;
  index: number;
};

export default function BookControls({
  chapters,
  index,
  total,
  currentLabel,
  onPrev,
  onNext,
  onGoTo,
}: {
  chapters: Chapter[];
  index: number;
  total: number;
  currentLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}) {
  return (
    <div className="controls-wrap">
      <nav className="book-controls" aria-label="Navegación del portafolio">
        <button
          type="button"
          className="nav-arrow"
          onClick={onPrev}
          disabled={index === 0}
          aria-label="Página anterior"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>

        <div className="chapters" role="tablist" aria-label="Índice rápido">
          {chapters.map((chapter) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === chapter.index}
              aria-label={`Ir a ${chapter.label}`}
              key={chapter.label}
              className={`chapter-btn ${index === chapter.index ? "is-active" : ""}`}
              onClick={() => onGoTo(chapter.index)}
            >
              <span className="chapter-dot" />
              <span className="chapter-label">{chapter.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="nav-arrow"
          onClick={onNext}
          disabled={index === total - 1}
          aria-label="Página siguiente"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </nav>

      <div className="controls-meta">
        <span className="controls-label">{currentLabel}</span>
        <span className="controls-counter">
          {String(index + 1).padStart(2, "0")}
          <em> / </em>
          {String(total).padStart(2, "0")}
        </span>
        <span className="controls-hint">← → para navegar</span>
      </div>
    </div>
  );
}
