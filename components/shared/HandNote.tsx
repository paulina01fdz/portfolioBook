import type { ReactNode } from "react";

export default function HandNote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`hand-note ${className}`}>{children}</span>;
}
