type CurvedArrowProps = {
  className?: string;
  flip?: boolean;
  color?: string;
};

/** Flecha curva dibujada a mano, usada para señalar detalles del libro. */
export default function CurvedArrow({
  className = "",
  flip = false,
  color = "#ffffff",
}: CurvedArrowProps) {
  return (
    <svg
      className={`curved-arrow ${flip ? "is-flipped" : ""} ${className}`}
      viewBox="0 0 132 74"
      fill="none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M6 62C18 18 66 3 104 20c13 6 21 15 25 30"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
      <path
        d="M118 42c4 5 11 8 18 7-2-7-1-14 3-19"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
