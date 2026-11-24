import TypewriterText from "@/components/TypewriterText";

type DrippingTitleProps = {
  text: string;
  className?: string;
  active?: boolean;
  runId?: number;
  baseDelay?: number;
};

/**
 * Título gigante con estética "dripping": letras con degradido celeste-lila
 * y gotas de pintura que caen. Una letra puede sustituirse por un avatar.
 */
export default function DrippingTitle({
  text,
  className = "",
  active = true,
  runId = 0,
  baseDelay = 120,
}: DrippingTitleProps) {
  const letters = text.split("");

  return (
    <h1 className={`drip-title ${className}`} aria-label={text}>
      {letters.map((letter, index) => {
        const delay = baseDelay + index * 62;

        return (
          <span className="drip-letter" key={`${letter}-${index}`} aria-hidden="true">
            <TypewriterText
              text={letter}
              active={active}
              runId={runId}
              delay={delay}
              speed={25}
              showCursor={false}
            />
            <i
              className="drip drip-a"
              style={{ animationDelay: `${delay + 90}ms` }}
            />
            {index % 3 === 1 && (
              <i
                className="drip drip-b"
                style={{ animationDelay: `${delay + 180}ms` }}
              />
            )}
          </span>
        );
      })}
    </h1>
  );
}
