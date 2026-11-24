"use client";

import { motion, useReducedMotion } from "framer-motion";
import PageRenderer, { type PageId } from "@/components/PageRenderer";

export type SheetDefinition = {
  front: PageId;
  back: PageId;
};

/** Hoja apilada (sin contenido): aporta grosor, sombras y profundidad reales. */
export function StaticSheet({
  rotated,
  zIndex,
  index,
}: {
  rotated: boolean;
  zIndex: number;
  index: number;
}) {
  return (
    <div
      className={`sheet static-sheet ${rotated ? "is-rotated" : ""}`}
      style={{
        zIndex,
        transform: rotated ? "rotateY(-180deg)" : "rotateY(0deg)",
      }}
      aria-hidden="true"
    >
      <div className="sheet-face sheet-front sheet-paper" data-sheet={index} />
      <div className="sheet-face sheet-back sheet-paper" data-sheet={index} />
    </div>
  );
}

/** Hoja que gira en 3D durante el cambio de páginas. */
export function FlippingSheet({
  sheet,
  direction,
  runId,
  onComplete,
}: {
  sheet: SheetDefinition;
  direction: "next" | "prev";
  runId: number;
  onComplete: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.01 : 0.92;

  return (
    <motion.div
      className="sheet flipping-sheet"
      style={{ zIndex: 400 }}
      initial={{ rotateY: direction === "next" ? 0 : -180 }}
      animate={{ rotateY: direction === "next" ? -180 : 0 }}
      transition={{ duration, ease: [0.2, 0.72, 0.24, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="sheet-face sheet-front">
        <PageRenderer
          id={sheet.front}
          active={direction === "prev"}
          runId={runId}
        />
        <motion.div
          className="flip-shade"
          initial={{ opacity: direction === "next" ? 0.08 : 0.4 }}
          animate={{
            opacity:
              direction === "next" ? [0.08, 0.66, 0.34] : [0.34, 0.66, 0.08],
          }}
          transition={{ duration }}
        />
      </div>
      <div className="sheet-face sheet-back">
        <PageRenderer
          id={sheet.back}
          active={direction === "next"}
          runId={runId}
        />
        <motion.div
          className="flip-shade"
          initial={{ opacity: direction === "next" ? 0.34 : 0.08 }}
          animate={{
            opacity:
              direction === "next" ? [0.34, 0.6, 0.06] : [0.06, 0.6, 0.34],
          }}
          transition={{ duration }}
        />
      </div>
      <div className="sheet-fold-shadow" aria-hidden="true" />
    </motion.div>
  );
}
