"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BookControls, { type Chapter } from "@/components/BookControls";
import PageRenderer, { type PageId } from "@/components/PageRenderer";
import {
  FlippingSheet,
  StaticSheet,
  type SheetDefinition,
} from "@/components/PageSheet";
import { profile } from "@/lib/profile";

/**
 * Cada hoja une la página derecha de un spread con la izquierda del siguiente.
 */
const SHEETS: SheetDefinition[] = [
  { front: "about", back: "studies" },
  { front: "skills", back: "projects-left" },
  { front: "projects-right", back: "contact" },
];

/**
 * El último spread revela el reverso de la última hoja (contacto) junto a la
 * contraportada de cierre, para que el formulario sea alcanzable.
 */
const SPREAD_COUNT = SHEETS.length + 1;

const DESKTOP_CHAPTERS: Chapter[] = [
  { label: "Perfil", index: 0 },
  { label: "Formación y skills", index: 1 },
  { label: "Proyectos", index: 2 },
  { label: "Contacto", index: 3 },
];

const MOBILE_PAGES: PageId[] = [
  "flyleaf",
  "about",
  "studies",
  "skills",
  "projects-left",
  "projects-right",
  "contact",
  "thanks",
];

const MOBILE_CHAPTERS: Chapter[] = [
  { label: "Contraportada", index: 0 },
  { label: "Perfil", index: 1 },
  { label: "Estudios", index: 2 },
  { label: "Skills", index: 3 },
  { label: "Proy. I", index: 4 },
  { label: "Proy. II", index: 5 },
  { label: "Contacto", index: 6 },
  { label: "Gracias", index: 7 },
];

type FlipState = {
  sheetIndex: number;
  direction: "next" | "prev";
  runId: number;
};

const mobileVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 38 : -38,
    opacity: 0,
    x: direction > 0 ? 34 : -34,
  }),
  center: { rotateY: 0, opacity: 1, x: 0 },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -38 : 38,
    opacity: 0,
    x: direction > 0 ? -34 : 34,
  }),
};

function isInteractive(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest("a, button, input, textarea, label, [data-no-flip]"))
  );
}

export default function BookContainer({
  initialSpread = 0,
  isCovered = false,
}: {
  initialSpread?: number;
  isCovered?: boolean;
}) {
  const initialMobileIndex = Math.min(
    MOBILE_PAGES.length - 1,
    Math.max(0, initialSpread * 2),
  );
  const [spread, setSpread] = useState(initialSpread);
  const [mobileIndex, setMobileIndex] = useState(initialMobileIndex);
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);
  const [flip, setFlip] = useState<FlipState | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const spreadRef = useRef(initialSpread);
  const mobileIndexRef = useRef(initialMobileIndex);
  const lockedRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const wheelLockRef = useRef(false);

  /* ------------------------------------------------------------------ */
  /* Navegación                                                          */
  /* ------------------------------------------------------------------ */

  const triggerFlip = useCallback(
    (direction: "next" | "prev", forcedTarget?: number) => {
      if (lockedRef.current) return;

      const current = spreadRef.current;
      const target = forcedTarget ?? current + (direction === "next" ? 1 : -1);

      if (target < 0 || target >= SPREAD_COUNT || target === current) return;

      lockedRef.current = true;
      spreadRef.current = target;
      setSpread(target);
      setFlip({
        sheetIndex: direction === "next" ? current : current - 1,
        direction,
        runId: target,
      });
    },
    [],
  );

  const finishFlip = useCallback(() => {
    setFlip(null);
    lockedRef.current = false;

    const pending = pendingRef.current;
    if (pending !== null && pending !== spreadRef.current) {
      pendingRef.current = null;
      const nextDirection = pending > spreadRef.current ? "next" : "prev";
      requestAnimationFrame(() => triggerFlip(nextDirection, pending));
    } else {
      pendingRef.current = null;
    }
  }, [triggerFlip]);

  const go = useCallback(
    (direction: "next" | "prev") => {
      if (isMobile) {
        const target = mobileIndexRef.current + (direction === "next" ? 1 : -1);
        if (target < 0 || target >= MOBILE_PAGES.length) return;
        setMobileDirection(direction === "next" ? 1 : -1);
        mobileIndexRef.current = target;
        setMobileIndex(target);
        lockedRef.current = true;
        window.setTimeout(() => {
          lockedRef.current = false;
        }, 480);
        return;
      }

      triggerFlip(direction);
    },
    [isMobile, triggerFlip],
  );

  const goTo = useCallback(
    (target: number) => {
      if (isMobile) {
        if (target === mobileIndexRef.current) return;
        setMobileDirection(target > mobileIndexRef.current ? 1 : -1);
        mobileIndexRef.current = target;
        setMobileIndex(target);
        return;
      }

      if (target === spreadRef.current) return;
      pendingRef.current = target;
      triggerFlip(target > spreadRef.current ? "next" : "prev");
    },
    [isMobile, triggerFlip],
  );

  /* ------------------------------------------------------------------ */
  /* Entradas: teclado, clic, arrastre y rueda                           */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (isCovered) return;

    function handleKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, [contenteditable='true'], [data-no-flip]",
        )
      ) {
        return;
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        go("next");
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go("prev");
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(isMobile ? MOBILE_PAGES.length - 1 : SPREAD_COUNT - 1);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go, goTo, isMobile, isCovered]);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (isInteractive(event.target)) return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      suppressClickRef.current = true;
      go(dx < 0 ? "next" : "prev");
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 120);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (suppressClickRef.current || isInteractive(event.target)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    if (relativeX < rect.width * 0.24) {
      go("prev");
    } else {
      go("next");
    }
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (wheelLockRef.current || isInteractive(event.target)) return;
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    if (Math.abs(delta) < 14) return;

    wheelLockRef.current = true;
    go(delta > 0 ? "next" : "prev");
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 950);
  }

  /* ------------------------------------------------------------------ */
  /* Adaptación a móvil                                                 */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const query = window.matchMedia("(max-width: 820px)");

    const applyLayout = () => {
      if (query.matches) {
        setFlip(null);
        lockedRef.current = false;
        pendingRef.current = null;
        const nextMobile = Math.min(
          MOBILE_PAGES.length - 1,
          Math.max(0, spreadRef.current * 2),
        );
        mobileIndexRef.current = nextMobile;
        setMobileIndex(nextMobile);
        setIsMobile(true);
      } else {
        const nextSpread = Math.min(
          SPREAD_COUNT - 1,
          Math.ceil(mobileIndexRef.current / 2),
        );
        spreadRef.current = nextSpread;
        setSpread(nextSpread);
        setFlip(null);
        lockedRef.current = false;
        setIsMobile(false);
      }
    };

    applyLayout();
    query.addEventListener("change", applyLayout);
    return () => query.removeEventListener("change", applyLayout);
  }, []);

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */

  const leftPage: PageId = spread === 0 ? "flyleaf" : SHEETS[spread - 1].back;
  const rightPage: PageId =
    spread < SHEETS.length ? SHEETS[spread].front : "thanks";

  const chapters = isMobile ? MOBILE_CHAPTERS : DESKTOP_CHAPTERS;
  const activeIndex = isMobile ? mobileIndex : spread;
  const total = isMobile ? MOBILE_PAGES.length : SPREAD_COUNT;
  const currentLabel =
    chapters.find((chapter) => chapter.index === activeIndex)?.label ??
    chapters[0].label;

  const navProps = {
    chapters,
    index: activeIndex,
    total,
    currentLabel,
    onPrev: () => go("prev"),
    onNext: () => go("next"),
    onGoTo: goTo,
  };

  return (
    <main className="stage" inert={isCovered} aria-hidden={isCovered}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          PFH<span className="brand-slash">/</span>
          <span className="brand-year">2026</span>
        </div>
        <div className="topbar-center">
          <span className="topbar-line" />
          <span>PORTFOLIO INTERACTIVO</span>
          <span className="topbar-line" />
        </div>
        <div className="topbar-name">Paulina Fernández Hernández</div>
      </header>

      <div className="book-area">
        <div
          className={`book ${isMobile ? "book-mobile" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onClick={handleClick}
          onWheel={handleWheel}
        >
          <div className="book-under-shadow" aria-hidden="true" />

          {!isMobile ? (
            <>
              <div className="book-half half-left" aria-hidden="true" />
              <div className="book-half half-right" aria-hidden="true" />

              {SHEETS.map((sheet, index) => {
                if (flip && flip.sheetIndex === index) return null;
                const rotated = index < spread;
                return (
                  <StaticSheet
                    key={index}
                    index={index}
                    rotated={rotated}
                    zIndex={rotated ? 10 + index : 40 + (SHEETS.length - index)}
                  />
                );
              })}

              <div
                className="page-layer page-layer-left"
                key={`left-${spread}`}
                style={{ zIndex: 80 }}
              >
                <PageRenderer id={leftPage} active runId={spread} />
              </div>
              <div
                className="page-layer page-layer-right"
                key={`right-${spread}`}
                style={{ zIndex: 80 }}
              >
                <PageRenderer id={rightPage} active runId={spread} />
              </div>

              <div className="spine" aria-hidden="true" />

              {flip && (
                <FlippingSheet
                  sheet={SHEETS[flip.sheetIndex]}
                  direction={flip.direction}
                  runId={flip.runId}
                  onComplete={finishFlip}
                />
              )}

              <button
                type="button"
                className={`edge-nav edge-prev ${spread === 0 ? "is-disabled" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  go("prev");
                }}
                aria-label="Página anterior"
                tabIndex={spread === 0 ? -1 : 0}
              >
                ‹
              </button>
              <button
                type="button"
                className={`edge-nav edge-next ${spread === SPREAD_COUNT - 1 ? "is-disabled" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  go("next");
                }}
                aria-label="Página siguiente"
                tabIndex={spread === SPREAD_COUNT - 1 ? -1 : 0}
              >
                ›
              </button>
            </>
          ) : (
            <>
              <AnimatePresence mode="wait" custom={mobileDirection}>
                <motion.div
                  key={mobileIndex}
                  className="mobile-page-layer"
                  custom={mobileDirection}
                  variants={mobileVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: [0.22, 0.75, 0.3, 1] }}
                >
                  <PageRenderer
                    id={MOBILE_PAGES[mobileIndex]}
                    active
                    runId={mobileIndex}
                  />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      <BookControls {...navProps} />

      <footer className="site-footer">
        <span>© {profile.year} {profile.name}</span>
        <span className="footer-dot">✦</span>
      </footer>
    </main>
  );
}
