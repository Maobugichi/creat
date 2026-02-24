
import { m } from "motion/react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface StaggerHeaderProps {
  lines: (string | { text: string; muted?: boolean })[][];
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  inline?: boolean;
}

/* ─────────────────────────────────────────────
   Variants
───────────────────────────────────────────── */
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};



const VIEWPORT = { once: false, amount: 0.3 } as const;

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export const StaggerHeader = ({
  lines,
  as: Tag = "h2",
  className = "",
  inline = false,
}: StaggerHeaderProps) => {
  const wordVariants: import("motion/react").Variants = {
    hidden: { y: inline ? 0 : 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <m.div
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={CONTAINER_VARIANTS}
    >
      <Tag className={className}>
        {lines.map((line, lineIndex) => {
          const text = line
            .map((w) => (typeof w === "string" ? w : w.text))
            .join(" ");
          const muted =
            line.every((w) => typeof w === "object" && w.muted);
          const mixed = !inline && line.some((w) => typeof w === "object" && w.muted);

          if (inline) {
            const lineText = line
              .map((w) => (typeof w === "string" ? w : w.text))
              .join(" ");
            const lineMuted = line.every((w) => typeof w === "object" && w.muted);
            return (
              <m.span
                key={lineIndex}
                variants={wordVariants}
                className={`inline mr-[0.4em] whitespace-nowrap ${lineMuted ? "text-[#1E1A1C]/40" : "text-[#1E1A1C]"}`}
              >
                {lineText}
              </m.span>
            );
          }

          if (mixed) {
            // mixed muted/normal — animate whole line, render words with individual colors
            return (
              <m.span key={lineIndex} variants={wordVariants} className="block">
                {line.map((word, wordIndex) => {
                  const wordText = typeof word === "string" ? word : word.text;
                  const wordMuted = typeof word === "object" && word.muted;
                  return (
                    <span
                      key={wordIndex}
                      className={`mr-[0.3em] ${wordMuted ? "text-[#1E1A1C]/40" : "text-[#1E1A1C]"}`}
                    >
                      {wordText}
                    </span>
                  );
                })}
              </m.span>
            );
          }

          // whole line animates as one block
          return (
            <m.span
              key={lineIndex}
              variants={wordVariants}
              className={`block ${muted ? "text-[#1E1A1C]/40" : "text-[#1E1A1C]"}`}
            >
              {text}
            </m.span>
          );
        })}
      </Tag>
    </m.div>
  );
};