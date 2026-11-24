"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BookContainer from "@/components/BookContainer";
import HeroLanding from "@/components/HeroLanding";

export default function PortfolioExperience() {
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  function startOpening() {
    if (!isOpening && !hasOpened) setIsOpening(true);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (deltaX < -56 && Math.abs(deltaX) > Math.abs(deltaY)) {
      startOpening();
    }
  }

  return (
    <>
      <BookContainer initialSpread={0} isCovered={!hasOpened} />
      {!hasOpened && (
        <motion.div
          className="landing-cover"
          style={{ transformOrigin: "0% 50%", transformPerspective: 2200 }}
          initial={false}
          animate={{ rotateY: isOpening ? -180 : 0 }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.95,
            ease: [0.2, 0.72, 0.24, 1],
          }}
          onAnimationComplete={() => {
            if (isOpening) setHasOpened(true);
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onClick={startOpening}
        >
          <HeroLanding onStart={startOpening} />
        </motion.div>
      )}
    </>
  );
}
