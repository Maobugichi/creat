import { m, type Variants, type Transition } from "motion/react";
import { useMemo } from "react";

// ✅ All static variants and transitions hoisted to module level —
// none of these depend on props or state.
const letterTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

const containerVariants: Variants = {
  initial: {},
  hovered: {},
};

const letterVariants: Variants = {
  initial: { y: 0 },
  hovered: { y: "-100%" },
};

const wordWrapperVariant: Variants = {
  closed: {
    y: "-110%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, -0.05, 0.95],
      type: "spring",
      bounce: 0,
      stiffness: 150,
      damping: 25,
    },
  },
  exit: {
    y: "-110%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// ✅ Static style objects hoisted — both lineHeight:1 objects were new
// references every render, passed to two different m.* elements.
const LINE_HEIGHT_STYLE = { lineHeight: 1 } as const;

// ✅ Precompute per-letter transitions up to a reasonable word length.
// The original did { ...letterTransition, delay: i * 0.04 } inside .map(),
// which spread letterTransition into a brand new object for every letter
// on every render. For a 8-letter word that's 16 new transition objects
// per render (2 m.a per letter), and Motion re-evaluates each one.
// Precomputing up to 20 chars means zero allocations during render.
const LETTER_TRANSITIONS: Transition[] = Array.from({ length: 20 }, (_, i) => ({
  ...letterTransition,
  delay: i * 0.04,
}));

export const RollingText = ({ word }: { word: string }) => {
  // ✅ Split once per word change — word is a stable prop from a hoisted
  // array so this effectively never re-runs.
  const chars = useMemo(() => word.split(""), [word]);

  return (
    <m.div
      variants={wordWrapperVariant}
      className="relative block whitespace-nowrap cursor-pointer"
      style={LINE_HEIGHT_STYLE}
    >
      <m.span
        initial="initial"
        whileHover="hovered"
        variants={containerVariants}
        className="relative block overflow-hidden whitespace-nowrap cursor-pointer"
        style={LINE_HEIGHT_STYLE}
      >
        <div className="flex">
          {chars.map((char, i) => (
            // ✅ key={char + i} — char alone isn't unique (repeated letters),
            // index alone is fragile. Combining both is stable for a fixed word.
            <span key={char + i} className="relative inline-block overflow-hidden">
              <m.a
                variants={letterVariants}
                // ✅ Precomputed transition — no spread, no allocation
                transition={LETTER_TRANSITIONS[i] ?? LETTER_TRANSITIONS[LETTER_TRANSITIONS.length - 1]}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </m.a>

              <m.a
                variants={letterVariants}
                transition={LETTER_TRANSITIONS[i] ?? LETTER_TRANSITIONS[LETTER_TRANSITIONS.length - 1]}
                className="absolute left-0 top-full inline-block silver-gradient"
              >
                {char === " " ? "\u00A0" : char}
              </m.a>
            </span>
          ))}
        </div>
      </m.span>
    </m.div>
  );
};