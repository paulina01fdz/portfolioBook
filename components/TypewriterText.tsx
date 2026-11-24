"use client";

import { useEffect, useState, type ElementType } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterTextProps = {
  text: string;
  /** Si es false se muestra el texto completo (páginas inactivas). */
  active?: boolean;
  /** Cambia para volver a escribir el texto al abrir otra hoja. */
  runId?: number;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  className?: string;
  as?: ElementType;
};

export default function TypewriterText({
  text,
  active = true,
  runId = 0,
  speed = 30,
  delay = 0,
  showCursor = true,
  className = "",
  as: Tag = "span",
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(() => (active ? 0 : text.length));

  useEffect(() => {
    if (!active || reduceMotion) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let index = 0;
    let tickTimer: ReturnType<typeof setTimeout> | undefined;

    const startTimer = setTimeout(() => {
      const tick = () => {
        index += 1;
        setCount(index);
        if (index < text.length) {
          tickTimer = setTimeout(tick, speed + Math.random() * 16 - 8);
        }
      };
      tickTimer = setTimeout(tick, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (tickTimer) clearTimeout(tickTimer);
    };
  }, [text, active, runId, speed, delay, reduceMotion]);

  const typing = active && !reduceMotion && count < text.length;

  return (
    <Tag className={className}>
      {text.slice(0, count)}
      {showCursor && typing && <span className="type-caret" aria-hidden="true" />}
    </Tag>
  );
}
