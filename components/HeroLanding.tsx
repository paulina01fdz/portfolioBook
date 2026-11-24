"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroLanding({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="hero-landing" aria-label="Portada del portafolio">
      <span className="hero-aurora hero-aurora-one" aria-hidden="true" />
      <span className="hero-aurora hero-aurora-two" aria-hidden="true" />
      <span className="hero-grid" aria-hidden="true" />

      <div className="hero-sparks" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <motion.div
        className="hero-card-wrap"
        initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="hero-card"
          animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/portfolio-cover-hd.webp"
            alt="Portada del portafolio de Paulina Fernández Hernández, Software Developer 2026"
            fill
            sizes="(max-width: 820px) 92vw, min(980px, 88vw)"
            className="hero-reference-image"
            unoptimized
            priority
          />
          <span className="hero-shine" aria-hidden="true" />
          <span className="hero-card-glow" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-layout"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <span className="hero-eyebrow">UN PORTFOLIO PARA HOJEAR</span>
        <button type="button" className="hero-start" onClick={onStart}>
          <span>ABRIR PORTAFOLIO</span>
          <span className="hero-start-arrow" aria-hidden="true">
            ↗
          </span>
        </button>
        <span className="hero-hint">
          <i aria-hidden="true" /> Haz clic para pasar la primera hoja
        </span>
      </motion.div>
    </main>
  );
}
