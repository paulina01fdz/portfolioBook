import type { ReactNode } from "react";

type PageBaseProps = {
  number: number;
  side: "left" | "right";
  className?: string;
  children: ReactNode;
};

const TOTAL_PAGES = 6;

export default function PageBase({
  number,
  side,
  className = "",
  children,
}: PageBaseProps) {
  return (
    <section className={`page ${className}`}>
      <div className="page-inner">{children}</div>
      <span className={`page-number page-number-${side}`} aria-hidden="true">
        {String(number).padStart(2, "0")} <em>/</em> {String(TOTAL_PAGES).padStart(2, "0")}
      </span>
      <span className={`page-watermark page-watermark-${side}`} aria-hidden="true">
        PFH · 2026
      </span>
    </section>
  );
}
